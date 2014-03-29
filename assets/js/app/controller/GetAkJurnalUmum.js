/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetAkJurnalUmum', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'akjurnalumum.GetAkJurnalUmum',
        'akjurnalumum.AkJurnalUmumGrid'
    ],
    refs: [
        {ref: 'AkJurnalUmumGrid', selector: '#akjurnalumumgrid'},
        {ref: 'inputTglA', selector: '#dateStartJu'},
        {ref: 'inputTglB', selector: '#dateEndJu'}
    ],
    init: function () {
        this.control({
        });
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */