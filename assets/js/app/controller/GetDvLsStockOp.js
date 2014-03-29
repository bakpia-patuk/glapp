/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetDvLsStockOp', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'dvlsstockop.GetDvLsStockOp',
        'dvlsstockop.DvLsStockOpForm',
        'dvlsstockop.DvLsStockOpItemGrid',
        'dvlsstockop.DvLsStockOpTrxGrid',
//        'dvlsstockop.divlistSoGrid',
        'dvlsstockop.DvLsStockOpLotForm',
//        'dvlsstockop.divnoLotGrid'
    ],
    refs: [
        {ref: 'DvLsStockOpForm', selector: '#dvlsstockopform'},
        {ref: 'DvLsStockOpItemGrid', selector: '#dvlsstockopitemgrid'},
        {ref: 'DvLsStockOpTrxGrid', selector: '#dvlsstockoptrxgrid'},
//        {ref: 'DvLsStockOpLotForm', selector: '#dvlsstockoplotform'},
    ],
    init: function () {
        this.control({
            controller: {
            },
            component: {
                '#dvlsstockopform button[action=loadSoLotTambah]': {
                    click: this.listBarangLot
                },
            },
            global: {
            },
            store: {
            }
        });
    },
    listBarangLot: function(btn) {
        var win = Ext.widget('dvlsstockop.dvlsstockoplotform');
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */