/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetGdTxTerima', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'gdtxterima.SupplierStore',
        'gdtxterima.PoDetailStore',
        'gdtxterima.TtLotStore',
        'gdtxterima.TtListStore',
        'gdtxterima.CabangStore',
        'gdtxterima.MasterSupplierStore'
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
        {ref: 'TtLotGrid', selector: '#txttgriddt'},
        {ref: 'TtForm', selector: '#txttform'},
        {ref: 'WindowLot', selector: '#gridLot'},
        {ref: 'FormLot', selector: '#formLot'},
        {ref: 'Tsxttlistgrid', selector: '#tsxttlistgrid'}
        
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
                    click: this.saveTt
                },
                '#newttpanel button[action=ttPrint]': {
                    click: this.saveTtPrint
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
                    afterrender: function() {
                        this.initForm(this.getTtForm(), '#imageTtdTb');
                    }
                },
                '#txttform button[action=getClientSign]': {
                    click: function(btn) {
                        var form = this.getTtForm();
                        if (form.down('#id').getValue() === '0') {
                            Ext.Msg.alert('Warning', 'Lakukan transaksi terlebih dahulu');
                            return;
                        }
                        var win = Ext.widget('gdtxterima.txttsignwin');
                        win.down('#idTt').setValue(form.down('#id').getValue());
                    }
                },
                '#txttsignwin button[action=ttSave]': {
                    click: function(btn) {
                        var form = this.getTtForm(),
                                id = form.down('#id').getValue();

                        form.down('#imageTtdTb1').setSrc('assets/ttd_tx/ttSign' + id + 'NULL_.png');
                        btn.up('window').close();
                    }
                },
                '#txttgrid': {
                    selectionchange: function(m, r) {
                        var form = this.getTtForm(),
                                gridLot = this.getTtLotGrid(),
                                store = gridLot.getStore(), filterCollection = [];

                        if (form.down('#id').getValue() !== '0') {
                            if (r[0]) {
                                var statusFilter = new Ext.util.Filter({
                                    property: 'stk_trxreftype',
                                    value: 'ttgudang'
                                });
                                filterCollection.push(statusFilter);
                                var statusFilter = new Ext.util.Filter({
                                    property: 'stk_trxref',
                                    value: form.down('#id').getValue()
                                });
                                filterCollection.push(statusFilter);
                                var statusFilter = new Ext.util.Filter({
                                    property: 'stl_barangid',
                                    value: r[0].get('barang_id')
                                });
                                filterCollection.push(statusFilter);
                                store.clearFilter(true);
                                store.filter(filterCollection);
                            }
                        }
                    }
                },
                '#txttgriddt button[action=ttLotAdd]': {
                    click: function(btn) {
                        var form = this.getTtForm();
                        if (form.down('#id').getValue() === '0') {
                            Ext.Msg.alert('Warning', 'Lakukan transaksi terlebih dahulu');
                            return;
                        }

                        var grid = this.getTtPoGrid(),
                                sel = grid.getSelectionModel().getSelection(),
                                gridLot = this.getTtLotGrid(),
                                store = gridLot.getStore();
                        if (!sel.length) {
                            Ext.Msg.alert('Warning', 'Pilih barang yang akan di buat lot');
                            return;
                        }

                        if (sel[0].get('tt_id') === '0') {
                            Ext.Msg.alert('Warning', 'Barang belum dimasukkan ke transaksi');
                            return;
                        }

                        var win = Ext.widget('gdtxterima.txttlotwin'),
                                formLot = win.down('#formLot');

                        formLot.down('#stk_trxref').setValue(sel[0].get('tt_id'));
                        formLot.down('#stl_barangid').setValue(sel[0].get('barang_id'));
                        formLot.down('#stl_barangname').setValue(sel[0].get('barang_name'));
                        formLot.down('#qty_tt').setValue(sel[0].get('tt_qty_kirim'));
                        formLot.down('#qty_tt_old').setValue(sel[0].get('barang_qty'));
                        store.load();
                    }
                },
                '#formLot button[action=lotSave]': {
                    click: function(btn) {
                        var form = btn.up('form');

                        if (form.getForm().isValid()) {
                            this.ajaxReq('gd_tt/save_lot', form.getForm().getValues(), 9);
                        }
                    }
                },
                '#tsxttlistgrid button[action=printListTt]': {
                click: function(btn, e, opt) {
                    var grid = this.getTsxttlistgrid(),
                            sm = grid.getSelectionModel(),
                            sel = sm.getSelection();
                    if (!sel.length) {
                        Ext.Msg.alert('Info', 'Pilih Barang TT Dahulu');
                        return;
                    }

                    window.open(BASE_PATH + 'gd_tt/print_tt/1/' + sel[0].get('tt_id'), "Print Preview", "height=" + screen.height + ",width=950, scrollbars=true");
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
    saveTt: function(btn) {
        var form = this.getTtForm();

        if (form.getForm().isValid()) {
            this.ajaxReq('gd_tt/save', form.getForm().getValues(), 4);
        }
    },
    saveTtPrint: function(btn) {
        var form = this.getTtForm();

        if (form.getForm().isValid()) {
            this.ajaxReq('gd_tt/save', form.getForm().getValues(), 5);
        }
    },
    setItemTt: function(column, recordIndex, checked) {
        var form = this.getTtForm(),
                grid = this.getTtPoGrid(),
                poPanel = this.getPanelTerima(),
                store = grid.getStore(),
                idTt = form.down('#id').getValue(),
                poSupplier = poPanel.down('#ttSupplier').getValue(),
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
                gridLot = this.getTtLotGrid(),
                gridPo = this.getTtPoGrid();
        if (idForm === 1) {
            //SET TT INIT
            poPanel.down('#searchTt').disable();
            poPanel.down('#ttSupplier').setReadOnly(true);
            form.down('#id').setValue(resp.data.id);
            form.down('#tt_supp_name').setValue(poPanel.down('#ttSupplier').getRawValue());
            form.down('#tt_no').setValue(resp.data.tt_no);
            form.saved = false;
            gridPo.getSelectionModel().clearSelections();
            gridPo.getStore().load();
        } else if (idForm === 2) {
            poPanel.down('#searchTt').enable();
            poPanel.down('#ttSupplier').setReadOnly(false);
            poPanel.down('#ttSupplier').reset();
            form.getForm().reset();
            form.saved = true;
            gridPo.getStore().removeAll();
            gridLot.getStore().removeAll();
            form.down('#imageTtdTb1').setSrc('assets/appdata/signBlank.png');
        } else if (idForm === 3) {
            Ext.StoreMgr.lookup('gdtxpo.SupplierEmailStore').load();
        } else if (idForm === 4) {
            poPanel.down('#searchTt').enable();
            poPanel.down('#ttSupplier').setReadOnly(false);
            poPanel.down('#ttSupplier').reset();
            form.getForm().reset();
            form.saved = true;
            gridPo.getStore().removeAll();
            gridLot.getStore().removeAll();
            form.down('#imageTtdTb1').setSrc('assets/appdata/signBlank.png');

            Ext.MessageBox.show({
                title: resp.title,
                msg: resp.msg,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        } else if (idForm === 5) {
            poPanel.down('#searchTt').enable();
            poPanel.down('#ttSupplier').setReadOnly(false);
            poPanel.down('#ttSupplier').reset();
            form.getForm().reset();
            form.saved = true;
            gridPo.getStore().removeAll();
            gridLot.getStore().removeAll();
            form.down('#imageTtdTb1').setSrc('assets/appdata/signBlank.png');

            this.printTt(0, resp.data);
        } else if(idForm === 9){
            var form = this.getFormLot();
            form.getForm().reset();
            form.down('#stk_trxref').setValue(resp.data.stk_trxref);
            form.down('#stl_barangid').setValue(resp.data.barang_id);
            form.down('#stl_barangname').setValue(resp.data.barang_name);
            form.down('#qty_tt').setValue(resp.data.qty_tt);
            this.getWindowLot().getStore().load();
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
    printTt: function(type, id) {
        window.open(BASE_PATH + 'gd_tt/print_tt/' + type + '/' + id, "Print Preview", "height=" + screen.height + ",width=950,modal=yes,alwaysRaised=yes,scrollbars=yes");
    }

});

/* End of file Base.js */
/* Location: ./assets/js/app/controller/Base.js */