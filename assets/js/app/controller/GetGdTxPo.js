/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetGdTxPo', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'gdtxpo.CabangStore',
        'gdtxpo.PoPengStore',
        'gdtxpo.SupplierStore',
        'gdtxpo.SupplierEmailStore',
        'gdtxpo.PoStore',
        'gdtxpo.PoDetailStore'
    ],
    views: [
        'gdtxpo.GetGdTxPo',
        'gdtxpo.TxPoForm',
        'gdtxpo.TxPoGrid',
        'gdtxpo.TxPoListGrid',
        'gdtxpo.TxPoListGridDt',
        'gdtxpo.PoEmailWin'
    ],
    refs: [
        {ref: 'PoPanel', selector: '#popanelform'},
        {ref: 'PoForm', selector: '#txpoform'},
        {ref: 'PoGrid', selector: '#txpolistgrid'},
        {ref: 'PoDtGrid', selector: '#txpolistgriddt'},
        {ref: 'PoPengGrid', selector: '#txpogrid'},
        {ref: 'PoEmailWin', selector: '#poemailwin'}
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
                '#popanelform button[action=poSave]': {
                    click: this.savePo
                },
                '#popanelform button[action=poSavePrint]': {
                    click: this.savePoPrint
                },
                '#popanelform button[action=poSavePdf]': {
                    click: this.savePoPdf
                },
                '#txpogrid': {
                    edit: this.editPoPengadaan
                },
                '#txpolistgrid': {
                    selectionchange: function(m, r) {
                        var grid = this.getPoDtGrid(),
                                store = grid.getStore();

                        if (r[0]) {
                            store.clearFilter(true);
                            store.filter('po_id', r[0].get('id'));
                        }
                    }
                },
                '#txpolistgrid button[action=printPoCopy]': {
                    click: function() {
                        var grid = this.getPoGrid(),
                                sel = grid.getSelectionModel().getSelection();

                        if (!sel.length) {
                            Ext.Msg.alert('Info', 'Pilih PO yang akan di cetak ulang');
                            return;
                        }
                        
                        this.printPo(1, sel[0].get('id'));
                    }
                },
                '#txpolistgrid button[action=sentPoPdf]': {
                    click: function() {
                        var grid = this.getPoGrid(),
                                sel = grid.getSelectionModel().getSelection();

                        if (!sel.length) {
                            Ext.Msg.alert('Info', 'Pilih PO yang akan di kirim ulang');
                            return;
                        }
                        
                        this.pdfPo(sel[0].get('id'));
                    }
                },
                '#txpolistgrid button[action=searchPo]': {
                    click: this.showListPo
                },
                '#txpolistgrid button[action=allPo]': {
                    click: this.showAllPo
                },
                '#setPo': {
                    checkchange: this.setItemPo
                },
                '#poemailwin button[action=saveSuppEmail]': {
                    click: this.saveEmail
                },
                '#txpoform': {
                    afterrender: function(){
                        this.initForm(this.getPoForm(), '#imageTtdPO');
                    }
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
    savePo: function(btn) {
        var form = this.getPoForm(),
                total = form.down('#po_value').getValue();
        if (total === 0) {
            Ext.Msg.alert('Info', 'Anda belum melakukan transaksi');
            return;
        }

        if (form.getForm().isValid()) {
            this.ajaxReq('gd_po/save', form.getForm().getValues(), 4);
        }
    },
    savePoPrint: function(btn) {
        var form = this.getPoForm(),
                total = form.down('#po_value').getValue();
        if (total === 0) {
            Ext.Msg.alert('Info', 'Anda belum melakukan transaksi');
            return;
        }

        if (form.getForm().isValid()) {
            this.ajaxReq('gd_po/save', form.getForm().getValues(), 5);
        }
    },
    savePoPdf: function(btn) {
        var form = this.getPoForm(),
                total = form.down('#po_value').getValue();
        if (total === 0) {
            Ext.Msg.alert('Info', 'Anda belum melakukan transaksi');
            return;
        }

        if (form.getForm().isValid()) {
            this.ajaxReq('gd_po/save', form.getForm().getValues(), 6);
        }
    },
    saveEmail: function(btn) {
        var win = this.getPoEmailWin(),
                form = win.down('#formEmail');
        this.ajaxReq('shared/add_email', form.getForm().getValues(), 3);
        win.close();
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
    showListPo: function(btn) {
        var grid1 = this.getPoGrid(),
                tgl1 = grid1.down('#poListTgl1').getValue(),
                tgl2 = grid1.down('#poListTgl2').getValue(),
                cabang = grid1.down('#poListCabang').getValue(),
                store = grid1.getStore(),
                filterCollection = [];

        var statusFilter = new Ext.util.Filter({
            property: 'trx_date',
            value: Ext.Date.format(tgl1 === null ? new Date() : tgl1, 'Y-m-d 00:00:00') + 'GT'
        });
        filterCollection.push(statusFilter);

        var statusFilter = new Ext.util.Filter({
            property: 'trx_date',
            value: Ext.Date.format(tgl2 === null ? new Date() : tgl2, 'Y-m-d 23:59:59') + 'LT'
        });
        filterCollection.push(statusFilter);

        var statusFilter = new Ext.util.Filter({
            property: 'po_cabangid',
            value: cabang !== null ? cabang : CABANG_ID
        });
        filterCollection.push(statusFilter);

        grid1.getSelectionModel().clearSelections();
        store.clearFilter(true);
        store.filter(filterCollection);
    },
    showAllPo: function(btn) {
        var grid1 = this.getPoGrid(),
                tgl1 = grid1.down('#poListTgl1').getValue(),
                tgl2 = grid1.down('#poListTgl2').getValue(),
                store = grid1.getStore(),
                filterCollection = [];

        var statusFilter = new Ext.util.Filter({
            property: 'trx_date',
            value: Ext.Date.format(tgl1 === null ? new Date() : tgl1, 'Y-m-d 00:00:00') + 'GT'
        });
        filterCollection.push(statusFilter);

        var statusFilter = new Ext.util.Filter({
            property: 'trx_date',
            value: Ext.Date.format(tgl2 === null ? new Date() : tgl2, 'Y-m-d 23:59:59') + 'LT'
        });
        filterCollection.push(statusFilter);

        grid1.getSelectionModel().clearSelections();
        store.clearFilter(true);
        store.filter(filterCollection);
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
        if (form.down('#id').getValue() !== '0') {
            if (e.record.dirty) {
                if (e.record.data.po_id !== 0) {
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
                                form.down('#po_value').setValue(resp.data);
                            }
                        }
                    });
                } else {
                    e.grid.getStore().load();
                }
            }
        } else {
            e.grid.getStore().load();
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

        this.ajaxReq(url, params, 1);
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
            form.down('#po_value').setValue(resp.data.po_value);
            form.saved = false;
            gridPeng.getStore().load();
        } else if (idForm === 2) {
            poPanel.down('#searchPo').enable();
            poPanel.down('#poCabang').setReadOnly(false);
            poPanel.down('#poCabang').reset();
            form.getForm().reset();
            form.saved = true;
            gridPeng.getStore().removeAll();
        } else if (idForm === 3) {
            Ext.StoreMgr.lookup('gdtxpo.SupplierEmailStore').load();
        } else if (idForm === 4) {
            poPanel.down('#searchPo').enable();
            poPanel.down('#poCabang').setReadOnly(false);
            poPanel.down('#poCabang').reset();
            form.getForm().reset();
            form.saved = true;
            gridPeng.getStore().removeAll();

            Ext.MessageBox.show({
                title: resp.title,
                msg: resp.msg,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        } else if (idForm === 5) {
            poPanel.down('#searchPo').enable();
            poPanel.down('#poCabang').setReadOnly(false);
            poPanel.down('#poCabang').reset();
            form.getForm().reset();
            form.saved = true;
            gridPeng.getStore().removeAll();
            this.printPo(0, resp.data);
        } else {
            poPanel.down('#searchPo').enable();
            poPanel.down('#poCabang').setReadOnly(false);
            poPanel.down('#poCabang').reset();
            form.getForm().reset();
            form.saved = true;
            gridPeng.getStore().removeAll();
            this.pdfPo(resp.data);
        }
    },
    onFailure: function(resp, idForm) {
        Ext.MessageBox.show({
            title: resp.title,
            msg: resp.msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    },
    printPo: function(type, id) {
        window.open(BASE_PATH + 'gd_po/print_po/' + type + '/' + id, "Print Preview", "height=" + screen.height + ",width=950,modal=yes,alwaysRaised=yes,scrollbars=yes");
    },
    pdfPo: function(id) {
        Ext.Ajax.request({
            url: BASE_PATH + 'gd_po/pdf_po/' + id,
            method: 'POST',
            scope: this,
            callback: function(options, success, response) {
                var resp = Ext.decode(response.responseText);

                if (resp.success === 'true') {
                    Ext.MessageBox.show({
                        title: 'Info',
                        msg: resp.message,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                } else {
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: resp.message,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            }
        });
    }
});
/* End of file Base.js */
/* Location: ./assets/js/app/controller/Base.js */