/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetGdTxPo', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'gdtxpo.CabangStore',
        'gdtxpo.PoPengStore'
    ],
    views: [
        'gdtxpo.GetGdTxPo',
        'gdtxpo.TxPoForm',
        'gdtxpo.TxPoGrid',
        'gdtxpo.TxPoListGrid',
        'gdtxpo.TxPoListGridDt'
    ],
    refs: [
        {ref: 'PoPanel', selector: '#popanelform'},
        {ref: 'PoForm', selector: '#txpoform'},
        {ref: 'PoPengGrid', selector: '#txpogrid'}
    ],
    init: function() {
        this.listen({
            controller: {
            },
            component: {
                '#popanelform button[action=searchPo]': {
                    click: this.showListPeng
                },
                '#popanelform button[action=refreshPo]': {
                    click: this.reloadListPeng
                },
                '#popanelform button[action=poNew]': {
                    click: this.resetPo
                },
                '#txpogrid': {
                    edit: this.editPoPengadaan
                },
                '#setPo': {
                    checkchange: this.setItemPo
                }
            },
            global: {
            },
            store: {
            }
        });
    },
    resetPo: function(btn) {
        var form = this.getPoForm();

        if (form.saved) {
            this.onSuccess(1, 2);
        } else {
            Ext.Msg.show({
                title: 'Konfirmasi',
                msg: 'Anda sedang melakukan transaksi. Lanjutakan transaksi ?',
                buttons: Ext.Msg.YESNO,
                scope: this,
                fn: function(btn) {
                    if (btn === 'no') {
                        this.ajaxReq('gd_po/reset', form.getForm().getValues(), 2);
                    }
                }
            });
            return false;
        }
    },
    showListPeng: function(btn) {
        var panel = this.getPoPanel(),
                tgl1 = panel.down('#poTgl1').getValue(),
                tgl2 = panel.down('#poTgl2').getValue(),
                cabang = panel.down('#poCabang').getValue(),
                grid1 = this.getPoPengGrid(),
                store = grid1.getStore(),
                filterCollection = [];

        if (cabang !== null) {
            var statusFilter = new Ext.util.Filter({
                property: 'trx_pengadaan.tgl_trx',
                value: Ext.Date.format(tgl1 === null ? new Date() : tgl1, 'Y-m-d 00:00:00') + 'GT'
            });
            filterCollection.push(statusFilter);

            var statusFilter = new Ext.util.Filter({
                property: 'trx_pengadaan.tgl_trx',
                value: Ext.Date.format(tgl2 === null ? new Date() : tgl2, 'Y-m-d 23:59:59') + 'LT'
            });
            filterCollection.push(statusFilter);

            var statusFilter = new Ext.util.Filter({
                property: 'trx_pengadaan.cabang_id',
                value: cabang
            });
            filterCollection.push(statusFilter);

            grid1.getSelectionModel().clearSelections();

            store.clearFilter(true);
            store.filter(filterCollection);
            store.group('no_pengadaan');
        } else {
            Ext.Msg.alert('Warning', 'Pilih Cabang terlebih dahulu');
        }
    },
    reloadListPeng: function(btn) {
        var panel = this.getPoPanel(),
                cabang = panel.down('#poCabang').getValue(),
                grid1 = this.getPoPengGrid(),
                store = grid1.getStore();

        if (cabang !== null) {
            store.load();
        }
    },
    editPoPengadaan: function(editor, e, eOpt) {
        var form = this.getPoForm();

        if (form.down('#id').getValue() !== 0) {
            if (e.record.dirty) {
                Ext.Ajax.request({
                    url: BASE_PATH + 'gd_po/edit_peng_po',
                    method: 'POST',
                    params: e.record.data,
                    scope: this,
                    callback: function(options, success, response) {
                        var resp = Ext.decode(response.responseText);

                        if (resp.success === 'true') {
                            e.grid.getStore().load();
                            e.record.commit();

                        }
                    }
                });
            }
        }
    },
    setItemPo: function(column, recordIndex, checked) {
        var form = this.getPoForm(),
                grid = this.getPoPengGrid(),
                poPanel = this.getPoPanel(),
                store = grid.getStore(),
                idPo = form.down('#id').getValue(),
                poCabang = poPanel.down('#poCabang').getValue(),
                idPeng = store.getAt(recordIndex).get('id'),
                url, params;

        params = {
            id: idPo,
            id_peng: idPeng,
            cabang: poCabang
        };

        if (checked) {
            url = 'gd_po/set_status/1';
        } else {
            url = 'gd_po/set_status/0';
        }

        this.ajaxReq(url, params,  1);
    },
    onSuccess: function(resp, idForm) {
        var form = this.getPoForm(),
                poPanel = this.getPoPanel(),
                gridPeng = this.getPoPengGrid();

        if (idForm === 1) {
            poPanel.down('#searchPo').disable();
            poPanel.down('#poCabang').setReadOnly(true);
            form.down('#id').setValue(resp.data.id);
            form.down('#po_cabang_name').setValue(poPanel.down('#poCabang').getRawValue());
            form.down('#po_no').setValue(resp.data.po_no);
            form.saved = false;

            gridPeng.getStore().load();
        } else if (idForm === 2) {
            poPanel.down('#searchPo').enable();
            poPanel.down('#poCabang').setReadOnly(false);
            poPanel.down('#poCabang').reset();
            
            form.getForm().reset();
            form.saved = true;

            gridPeng.getStore().removeAll();
        } else {
            Ext.MessageBox.show({
                title: resp.title,
                msg: resp.msg,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });

            form.getForm().reset();
            form.down('#pengNewItem').disable();
            form.saved = true;

            grid2.getStore().removeAll();
        }
    },
    onFailure: function(resp, idForm) {
        Ext.MessageBox.show({
            title: resp.title,
            msg: resp.msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    }
});

/* End of file Base.js */
/* Location: ./assets/js/app/controller/Base.js */