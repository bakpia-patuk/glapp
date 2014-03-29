/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetAkMsAkun', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'akmsakun.GetAkMsAkun',
        'akmsakun.AkMsAkunForm',
//        'akmsakun.akunCustomForm',
        'akmsakun.AkMsAkunGrid',
//        'akmsakun.newWindow',
//        'akmsakun.listAkun',
//        'akmsakun.listAkunTujuan',
//        'akmsakun.listAkunCustom',
//        'akmsakun.blankForm'
    ],
    refs: [
        {ref: 'AkMsAkunForm', selector: '#akmsakunform'},
        {ref: 'AkMsAkunGrid', selector: '#akmsakungrid'},
//        {ref: 'listAkunGrid', selector: '#listakungrid'},
//        {ref: 'formCustomAkun', selector: '#akuncustomform'},
//        {ref: 'gridCustomAkun', selector: '#listakuncustom'}
    ],
    init: function() {
        this.control({
        });
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */