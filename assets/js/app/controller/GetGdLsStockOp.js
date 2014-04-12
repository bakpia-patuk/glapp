/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetGdLsStockOp', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'gdlsstockop.BarangStore',
        'gdlsstockop.GolonganStore'
    ],
    views: [
        'gdlsstockop.GetGdLsStockOp',
        'gdlsstockop.StockOpForm',
        'gdlsstockop.StockOpGrid',
        'gdlsstockop.ArusStockGrid',
        'gdlsstockop.TxTtLotWin'
    ],
    refs: [
        {ref: 'BarangGrid', selector: '#stockopgrid'},
        {ref: 'StockOpForm', selector: '#stockopform'},
        {ref: 'StockOpGrid', selector: '#arusstockgrid'}
    ],
    init: function() {
        this.listen({
            controller: {
            },
            component: {
                '#stockopform': {
                    afterrender: function() {
                        this.getStockOpForm().saved = true;
                    }
                },
                '#stockopform button[action=stockNew]': {
                    click: this.resetForm
                },
                '#stockopform button[action=stockSave]': {
                    click: this.saveForm
                },
                '#stockopform button[action=loadSoLotTambah]': {
                    click: this.lotShow
                },
                '#stockopgrid': {
                    selectionchange: function(m, r) {
                        var form = this.getStockOpForm();
                        if (form.saved) {
                            if (r[0]) {
                                form.getForm().reset();
                                this.initKey(this.getStockOpForm(), '#random_string');
                                form.getForm().loadRecord(r[0]);
                            }
                        }
                    }
                },
                '#barangSearch': {
                    click: function() {
                        var grid = this.getBarangGrid(),
                                store = grid.getStore(),
                                type = grid.down('#soType').getValue(),
                                gol = grid.down('#soBarangGol').getValue(),
                                query = grid.down('#soBarangQuery').getValue(),
                                filterCollection = [];
                        if (type === null) {
                            Ext.Msg.alert('Warning', 'Pilih Jenis barang');
                            return;
                        }

                        var statusFilter = new Ext.util.Filter({
                            property: 'mi_inv_stat',
                            value: type
                        });
                        filterCollection.push(statusFilter);

                        if (gol !== null) {
                            var statusFilter = new Ext.util.Filter({
                                property: 'mi_parent_id',
                                value: gol
                            });
                            filterCollection.push(statusFilter);
                        }
                        if (query !== "") {
                            var statusFilter = new Ext.util.Filter({
                                property: 'mi_name=ll',
                                value: query
                            });
                            filterCollection.push(statusFilter);
                        }

                        store.clearFilter(true);
                        store.filter(filterCollection);

                    }
                },
                '#stockopform button[action=lotSave]': {
                    click: function(btn) {
                        var form = btn.up('form');

                        if (form.getForm().isValid()) {
                            this.ajaxReq('gd_stockop/save_lot', form.getForm().getValues(), 3);
                        }
                    }
                },
                '#txttlotwin button[action=setLot]': {
                    click: function(btn) {
                        var win = btn.up('window');
                        this.getStockOpForm().saved = false;
                        win.close();
                    }
                }
            },
            global: {
            },
            store: {
            }
        });
    },
    resetForm: function(btn) {
        var form = this.getTtForm();
        if (form.saved) {
            this.onSuccess(1, 1);
        } else {
            Ext.Msg.show({
                title: 'Konfirmasi',
                msg: 'Anda sedang melakukan transaksi. Lanjutakan transaksi ?',
                buttons: Ext.Msg.YESNO,
                scope: this,
                fn: function(btn) {
                    if (btn === 'no') {
                        this.ajaxReq('gd_tt/reset', form.getForm().getValues(), 1);
                    }
                }
            });
            return false;
        }
    },
    saveForm: function(btn) {
    },
    lotShow: function(btn) {
        var win = Ext.widget('gdlsstockop.txttlotwin'),
                form = win.down('#formLotSo'),
                soform = this.getStockOpForm();

        form.down('#stl_barangid').setValue(soform.down('#id_item').getValue());
        form.down('#stl_barangname').setValue(soform.down('#mi_name').getValue());
        form.down('#qty_tt').setValue(soform.down('#stk_qty').getValue());
        form.down('#stk_trxref').setValue(soform.down('#random_string').getValue());
    },
    onSuccess: function(resp, idForm) {
        var soform = this.getStockOpForm(),
                poPanel = this.getPanelTerima(),
                gridLot = this.getTtLotGrid(),
                gridPo = this.getTtPoGrid();
        if (idForm === 1) {
        } else if (idForm === 2) {
        } else {
            Ext.StoreMgr.lookup('gdtxpo.SupplierEmailStore').load();
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