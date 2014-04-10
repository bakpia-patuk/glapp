/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetGdLsStockOp', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'gdlsstockop.BarangStore'
    ],
    views: [
        'gdlsstockop.GetGdLsStockOp',
        'gdlsstockop.StockOpForm',
        'gdlsstockop.StockOpGrid',
        'gdlsstockop.ArusStockGrid'
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
    }
});

/* End of file Base.js */
/* Location: ./assets/js/app/controller/Base.js */