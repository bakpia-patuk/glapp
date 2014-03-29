/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetBkRencanaAgr', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'bkrencanaagr.GetBkRencanaAgr',
        'bkrencanaagr.BkRencanaAgrForm',
        'bkrencanaagr.BkRencanaAgrGrid',
        'bkrencanaagr.BkRencanaAgrNonGrid',
//        'bkrencanaagr.BkRencanaAgrDetailGrid',
//        'bkrencanaagr.BkRencanaAgrDetailNonGrid',
//        'bkrencanagr.newWindow',
//        'bkrencanagr.newSuppForm',
//        'bkrencanagr.listFaktur',
//        'bkrencanagr.fakturWindow',
        //shared Window
//        'shared.newWindow',
//        'shared.GkMasterGrid',
//        'shared.GkMasterAkunGrid',
//        'shared.GkMasterDetailGrid'
    ],
    refs: [
        {ref: 'BkRencanaAgrTab', selector: '#bkrencanaagrtab'},
        {ref: 'BkRencanaAgrForm', selector: '#bkrencanaagrform'},
        {ref: 'BkRencanaAgrGrid', selector: '#bkrencanaagrgrid'},
        {ref: 'BkRencanaAgrNonGrid', selector: '#bkrencanaagrnongrid'},
//        {ref: 'BkRencanaAgrDetailGrid', selector: '#bkrencanaagrdetailgrid'},
//        {ref: 'suppForm', selector: '#newsuppform'},
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