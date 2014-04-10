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
        {ref: 'stockOpGrid', selector: '#arusstockgrid'}
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
                        if(r[0]){
                            form.getForm().loadRecord(r[0]);
                        }
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