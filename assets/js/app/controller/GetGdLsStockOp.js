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
                        if (r[0]) {
                            form.getForm().loadRecord(r[0]);
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
                }
            },
            global: {
            },
            store: {
            }
        });
    },
    resetForm: function(btn) {
    },
    saveForm: function(btn) {
    },
    lotShow: function(btn) {
        var win = Ext.widget('gdlsstockop.txttlotwin');
    }
});

/* End of file Base.js */
/* Location: ./assets/js/app/controller/Base.js */