/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetKsKeluar', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
    ],
    views: [
        'kskeluar.GetKsKeluar',
        'kskeluar.KsKeluarForm',
        'kskeluar.KsKeluarGrid',
        'kskeluar.DataRujukanGrid',
//        'kaskeluar.listAkun',
//        'kaskeluar.akunWindow',
//        'kaskeluar.newWindow',
        'kskeluar.ListMintaBayar',
        'kskeluar.ListFaktur',
//        'kaskeluar.fakturWindow',
//        'kaskeluar.app2Form'
    ],
    refs: [
        {ref: 'KsKeluarForm', selector: '#kskeluarform'},
        {ref: 'KsKeluarGrid', selector: '#kskeluargrid'},
        {ref: 'KsKeluarTab', selector: '#kskeluartab'},
        // panel button
        {ref: 'DateStartKk', selector: '#datestarkk'},
        
//        //daftar Grid selain KK
        {ref: 'ListFaktur', selector: '#listfaktur'},
        {ref: 'ListMintaBayar', selector: '#listmintabayar'},
        {ref: 'DataRujukanGrid', selector: '#datarujukangrid'}
    ],
    init: function() {
        this.control({
            '#kaskeluartab':{
                tabchange: function(tabPanel, tab) {
                    var id = tab.itemId;
                    var faktur = 'kskeluar.listfaktur',
                            mintabayar = 'kskeluar.listmintabayar',
                            kk = 'kskeluar.kskeluargrid',
                            rujukan = 'kskeluar.datarujukangrid';

                    switch (id) {
                        case faktur:
                            this.loadFormFaktur(id);
                            break;
                        case mintabayar:
                            this.loadFormPermintaan(id);
                            break;
                        case kk:
                            this.disableFormKk(id);
                            break;
                        case rujukan:
                            this.loadFormRujukan(id);
                            break;
                        default:
                            console.log('tab lain');
                            break;
                    }
                }
            }
        });
    },
    disableFormKk: function(id) {
        Ext.getCmp('#datestarkk').show();
//        this.getKkForm().body.mask();
//
//        Ext.getCmp('kkSave').disable();
//        Ext.getCmp('kkSavePrint').disable();
//        Ext.getCmp('kkNew').disable();
//        Ext.getCmp('kkDelete').disable();
//
//        var grid = this.getKkGrid(),
//                store = grid.getStore(),
//                filterCollection = [];
//
//        var filter2 = new Ext.util.Filter({
//            property: 'kas_type',
//            value: 'kaskeluar'
//        });
//        filterCollection.push(filter2);
//
//        var filter2 = new Ext.util.Filter({
//            property: 'kas_tgltrx',
//            value: Ext.Date.format(new Date(), 'Y-m-d 00:00:00') + 'GT'
//        });
//        filterCollection.push(filter2);
//
//        var filter2 = new Ext.util.Filter({
//            property: 'kas_tgltrx',
//            value: Ext.Date.format(new Date(), 'Y-m-d 23:59:29') + 'LT'
//        });
//        filterCollection.push(filter2);
//
//        var filter2 = new Ext.util.Filter({
//            property: 'cabang_id',
//            value: userCabang
//        });
//        filterCollection.push(filter2);
//
//        store.clearFilter(true);
//        store.filter(filterCollection);
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */