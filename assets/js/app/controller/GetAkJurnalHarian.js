/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetAkJurnalHarian', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'akjurnalharian.GetAkJurnalHarian',
        'akjurnalharian.AkJurnalHarianGrid',
//        'akjurnalharian.newWindow',
        'akjurnalharian.AkJurnalHarianForm',
//        'akjurnalharian.jpForm',
//        'akjurnalharian.listAkun',
        //SHARE window
//        'shared.newWindow'
    ],
    refs: [
        {ref: 'AkJurnalHarianGrid', selector: '#akjurnalhariangrid'},
//        {ref: 'inputTglA', selector: '#dateStartJm'},
//        {ref: 'inputTglB', selector: '#dateEndJm'},
        {ref: 'AkJurnalHarianForm', selector: '#akjurnalharianform'},
//        {ref: 'jpForm', selector: '#jpform'}
    ],
    init: function() {
        this.control({
        });
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */