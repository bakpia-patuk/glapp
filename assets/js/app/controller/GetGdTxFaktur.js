/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetGdTxFaktur', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'gdtxfaktur.GetGdTxFaktur',
        'gdtxfaktur.TxFakturForm',
        'gdtxfaktur.TxFakturGrid',
        'gdtxfaktur.TxFakturGridDt',
        'gdtxfaktur.TxBgFakturForm',
        'gdtxfaktur.TxBgFakturGrid',
        'gdtxfaktur.TxListFakturGrid',
        'gdtxfaktur.TxFakturPrintWin'
    ],
    refs: [
        {ref: 'SupplierForm', selector: '#mssupplierform'},
        {ref: 'SupplierGrid', selector: '#mssuppliergrid'}
    ],
    init: function() {
        this.listen({
            controller: {
            },
            component: {
                '#txfakturform button[action=fakturPrint]': {
                    click: this.showPrintGrid
                },
                '#txttgriddt button[action=ttLotAdd]': {
                    click: this.showLotForm
                },
                '#mssupplierform button[action=suppDelete]': {
                    click: this.showSatuan
                }
            },
            global: {
            },
            store: {
            }
        });
    },
    showPrintGrid: function(btn) {
        var win = Ext.widget('gdtxfaktur.txfakturprintwin');
    },
    showLotForm: function(btn) {
        var win = Ext.widget('gdtxterima.txttlotwin');
    },
    showSatuan: function(btn) {
        var win = Ext.widget('gdmsbarang.msbarangsatuanwin');
    }
});

/* End of file Base.js */
/* Location: ./assets/js/app/controller/Base.js */