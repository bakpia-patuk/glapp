/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetGdMsSupplier', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'gdmssupplier.GetGdMsSupplier',
        'gdmssupplier.MsSupplierForm',
        'gdmssupplier.MsSupplierGrid'
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
                '#mssupplierform button[action=suppSave]': {
                    click: this.showLimitForm
                },
                '#mssupplierform button[action=suppNew]': {
                    click: this.showKemasan
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
    showLimitForm: function(btn) {
        var win = Ext.widget('gdmsbarang.msbaranglimitwin');
    },
    showKemasan: function(btn) {
        var win = Ext.widget('gdmsbarang.msbarangkemasanwin');
    },
    showSatuan: function(btn) {
        var win = Ext.widget('gdmsbarang.msbarangsatuanwin');
    }
});

/* End of file Base.js */
/* Location: ./assets/js/app/controller/Base.js */