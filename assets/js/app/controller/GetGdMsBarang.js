/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetGdMsBarang', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'gdmsbarang.GolonganStore',
        'gdmsbarang.BarangStore',
        'gdmsbarang.BarangTreeStore',
        'gdmsbarang.MerkStore'
    ],
    views: [
        'gdmsbarang.GetGdMsBarang',
        'gdmsbarang.MsBarangForm',
        'gdmsbarang.MsBarangGrid',
        'gdmsbarang.MsBarangTree',
        'gdmsbarang.MsBarangKemasanWin',
        'gdmsbarang.MsBarangSatuanWin',
        'gdmsbarang.MsBarangLimitWin',
        'gdmsbarang.MsBarangMerkWin'
    ],
    refs: [
        {ref: 'ItemForm', selector: '#stockminform'},
        {ref: 'ItemGrid', selector: '#stockminform'},
        {ref: 'ItemTreeGrid', selector: '#stockminform'}
    ],
    init: function() {
        this.listen({
            controller: {
            },
            component: {
                '#msbarangform': {
                    afterrender: this.loadForm
                },
                '#msbarangform button[action=itemLimit]': {
                    click: this.showLimitForm
                },
                '#msbarangform button[action=editorKemasan]': {
                    click: this.showKemasan
                },
                '#kemasangrid button[action=showSatuan]': {
                    click: this.showSatuan
                }
            },
            global: {
            },
            store: {
            }
        });
    },
    loadForm: function() {
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