/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetGdLsArusStock', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'gdlsarusstock.GetGdLsArusStock'
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