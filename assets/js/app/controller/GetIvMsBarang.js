/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetIvMsBarang', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'ivmsbarang.GetIvMsBarang',
        'ivmsbarang.IvMsBarangForm',
        'ivmsbarang.IvMsBarangGrid'
    ],
    refs: [
        {ref: 'IvMsBarangForm', selector: '#ivmsbarangform'},
        {ref: 'IvMsBarangGrid', selector: '#ivmsbaranggrid'}
    ],
    init: function() {
        this.control({
        });
    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */