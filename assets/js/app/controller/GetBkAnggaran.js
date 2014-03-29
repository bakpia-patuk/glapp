/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetBkAnggaran', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
    ],
    views: [
        'bkanggaran.GetBkAnggaran',
        'bkanggaran.BkAnggaranForm',
        'bkanggaran.BkAnggaranGrid',
        'bkanggaran.BkAnggaranNonGrid',
        'bkanggaran.BkAnggaranDetailGrid',
//        'anggaran.newWindow',
//        'anggaran.app2Form',
//        'anggaran.akunWindow',
//        'anggaran.listAkun',
//        'anggaran.detailbayarGrid',
        'bkanggaran.BkAnggaran1Grid',
        'bkanggaran.SupplierPanel'
    ],
    refs: [
        {ref: 'BkAnggaranForm', selector: '#bkanggaranform'},
        {ref: 'BkAnggaranGrid', selector: '#bkanggarangrid'},
        {ref: 'BkAnggaranNonGrid', selector: '#bkanggarannongrid'},
        {ref: 'BkAnggaran1Grid', selector: '#bkanggaran1grid'},
//        {ref: 'tabAnggaran', selector: '#anggaranTab'},
        {ref: 'BkAnggaranDetailGrid', selector: '#bkanggarandetailgrid'}
    ],
    init: function() {
        this.control({
        });
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */