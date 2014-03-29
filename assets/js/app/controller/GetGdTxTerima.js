/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetGdTxTerima', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
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
        {ref: 'SupplierForm', selector: '#mssupplierform'},
        {ref: 'SupplierGrid', selector: '#mssuppliergrid'}
    ],
    init: function() {
        this.listen({
            controller: {
            },
            component: {
                '#txttform button[action=getClientSign]': {
                    click: this.showSignForm
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
    showSignForm: function(btn) {
        var win = Ext.widget('gdtxterima.txttsignwin');
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