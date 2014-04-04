/**
 * @author Isht Ae, Coepoe
 **/

Ext.define('GlApp.controller.GetBkAnggaran', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'bkanggaran.DaStoreTree',
        'bkanggaran.CabangStore',
        'bkanggaran.DaNonStoreTree',
        'bkanggaran.CabangNonStore',
        'bkanggaran.AgrSuppStore',
        'bkanggaran.BankPusatStore',
        'bkanggaran.BankDebetDariStore'
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
            '#bkanggarangrid':{
                selectionchange: function(model, records) {
                    var grid = this.getBkAnggaranGrid(),
                        btnListFkt = grid.down('#ListFakturBgAgr');

                    if (records[0]) {
                        var jenis = records[0].get('jenisBayar');
                        if (jenis == 1000) {
                            btnListFkt.enable();
                        } else {
                            btnListFkt.disable();
                        }
                    }
                },
            },
            '#bkanggarannongrid':{
                
            }
        });
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */