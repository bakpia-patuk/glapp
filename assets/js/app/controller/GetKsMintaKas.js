/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetKsMintaKas', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'ksmintakas.GetKsMintaKas',
        'ksmintakas.KsMintaKasForm',
        'ksmintakas.KsMintaKasGrid',
//        'ksmintakas.newWindow',
//        'ksmintakas.appForm',
//        'ksmintakas.app2Form',
        //shared Window
//        'shared.newWindow',
//        'shared.GkMasterGrid',
//        'shared.GkMasterAkunGrid',
//        'shared.GkMasterDetailGrid'
    ],
    refs: [
        {ref: 'KsMintaKasForm', selector: '#ksmintakasform'},
        {ref: 'KsMintaKasGrid', selector: '#ksmintakasgrid'},
//        {ref: 'appForm', selector: '#appform'},
//        {ref: 'app2Form', selector: '#app2form'},
//        {ref: 'GridKeperluan', selector: '#gkmastergrid'},
//        {ref: 'GridAkunKeperluan', selector: '#gkmasterakungrid'},
//        {ref: 'GridAkunDetail', selector: '#gkmasterdetailgrid'}
    ],
    init: function() {
        this.control({
        });
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */