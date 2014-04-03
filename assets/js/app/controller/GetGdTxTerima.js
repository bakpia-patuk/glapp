/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetGdTxTerima', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'gdtxterima.SupplierStore',
        'gdtxterima.PoDetailStore'
    ],
    views: [
        'gdtxterima.GetGdTxTerima',
        'gdtxterima.TxTtForm',
        'gdtxterima.TxTtGrid',
        'gdtxterima.TxTtGridDt',
        'gdtxterima.TxTtListGrid',
        'gdtxterima.TxTtSignWin',
        'gdtxterima.TxTtLotWin'
    ],
    refs: [
        {ref: 'PanelTerima', selector: '#newttpanel'},
        {ref: 'TtPoGrid', selector: '#txttgrid'},
        {ref: 'TtForm', selector: '#txttform'}
    ],
    init: function() {
        this.listen({
            controller: {
            },
            component: {
                '#newttpanel button[action=ttNew]': {
                    click: this.resetTt
                },
                '#newttpanel button[action=ttSave]': {
                    click: this.showListPo
                },
                '#newttpanel button[action=ttPrintWindow]': {
                    click: this.showListPo
                },
                '#newttpanel button[action=searchTt]': {
                    click: this.showListPo
                },
                '#newttpanel button[action=refreshTt]': {
                    click: this.reloadListPo
                },
                '#setTt': {
                    checkchange: this.setItemTt
                },
                '#txttform': {
                    afterrender: function(){
                        this.initForm(this.getTtForm(), '#imageTtdTb');
                    }
                },
                '#txttform button[action=getClientSign]': {
                    click: function(btn){
                        var win = Ext.widget('gdtxterima.txttsignwin');
                    }
                },
                '#txttgriddt button[action=ttLotAdd]': {
                    click: function(btn){
                        var win = Ext.widget('gdtxterima.txttlotwin');
                    }
                }
            },
            global: {
            },
            store: {
            }
        });
    },
    showListPo: function(btn) {
        var panel = this.getPanelTerima(),
                tgl1 = panel.down('#ttTgl1').getValue(),
                tgl2 = panel.down('#ttTgl2').getValue(),
                supplier = panel.down('#ttSupplier').getValue(),
                grid1 = this.getTtPoGrid(),
                store = grid1.getStore(),
                filterCollection = [];
        if (supplier !== null) {
            var statusFilter = new Ext.util.Filter({
                property: 'po_supp_id',
                value: supplier
            });
            filterCollection.push(statusFilter);

            grid1.getSelectionModel().clearSelections();
            store.clearFilter(true);
            store.filter(filterCollection);
            store.group('po_no');
        } else {
            Ext.Msg.alert('Warning', 'Pilih Supplier terlebih dahulu');
        }
    },
    reloadListPo: function(btn) {
        var panel = this.getPanelTerima(),
                cabang = panel.down('#ttSupplier').getValue(),
                grid1 = this.getTtPoGrid(),
                store = grid1.getStore();
        if (cabang !== null) {
            store.load();
            store.group('po_no');
        }
    },
    resetTt: function(btn) {
        var form = this.getTtForm();
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
                        this.ajaxReq('gd_tt/reset', form.getForm().getValues(), 2);
                    }
                }
            });
            return false;
        }
    },
    setItemTt: function(column, recordIndex, checked) {
        var form = this.getTtForm(),
                grid = this.getTtPoGrid(),
                poPanel = this.getPanelTerima(),
                store = grid.getStore(),
                idTt = form.down('#id').getValue(),
                poSupplier= poPanel.down('#ttSupplier').getValue(),
                idPo = store.getAt(recordIndex).get('id'),
                url, params;
        params = {
            id: idTt,
            id_po: idPo,
            supplier: poSupplier
        };
        if (checked) {
            url = 'gd_tt/set_status/1';
        } else {
            url = 'gd_tt/set_status/0';
        }

        this.ajaxReq(url, params, 1);
    },
    onSuccess: function(resp, idForm) {
        var form = this.getTtForm(),
                poPanel = this.getPanelTerima(),
                gridPo = this.getTtPoGrid();
        if (idForm === 1) {
            //SET TT INIT
            poPanel.down('#searchTt').disable();
            poPanel.down('#ttSupplier').setReadOnly(true);
            form.down('#id').setValue(resp.data.id);
            form.down('#tt_supp_name').setValue(poPanel.down('#ttSupplier').getRawValue());
            form.down('#tt_no').setValue(resp.data.tt_no);
            form.saved = false;
            gridPo.getStore().load();
        } else if (idForm === 2) {
            poPanel.down('#searchTt').enable();
            poPanel.down('#ttSupplier').setReadOnly(false);
            poPanel.down('#ttSupplier').reset();
            form.getForm().reset();
            form.saved = true;
            gridPo.getStore().removeAll();
        } else if (idForm === 3) {
            Ext.StoreMgr.lookup('gdtxpo.SupplierEmailStore').load();
        } else if (idForm === 4) {
            poPanel.down('#searchPo').enable();
            poPanel.down('#poCabang').setReadOnly(false);
            poPanel.down('#poCabang').reset();
            form.getForm().reset();
            form.saved = true;
            gridPo.getStore().removeAll();

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
            gridPo.getStore().removeAll();
            this.printPo(0, resp.data);
        } else {
            poPanel.down('#searchPo').enable();
            poPanel.down('#poCabang').setReadOnly(false);
            poPanel.down('#poCabang').reset();
            form.getForm().reset();
            form.saved = true;
            gridPo.getStore().removeAll();
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
    }
});

/* End of file Base.js */
/* Location: ./assets/js/app/controller/Base.js */