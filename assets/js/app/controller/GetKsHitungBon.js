/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetKsHitungBon', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'kshitungbon.GetKsHitungBon',
//        'kshitungbon.KsHitungBonDetailGrid',
        'kshitungbon.KsHitungBonGrid',
//        'kshitungbon.listItemKasbon',
        'kshitungbon.KsHitungBonForm',
//        'kshitungbon.newWindow'
//        'hitungkasbon.app2Form',
//        'hitungkasbon.akunWindow',
//        'hitungkasbon.listAkun'
    ],
    refs: [
        {ref: 'KsHitungBonGrid', selector: '#kshitungbongrid'},
//        {ref: 'KsHitungBonDetailGrid', selector: '#kshitungbondetailgrid'},
        {ref: 'KsHitungBonForm', selector: '#kshitungbonform'},
//        {ref: 'itemGrid', selector: '#itemkasbon'}
    ],
    init: function () {
        this.control({
        });
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */