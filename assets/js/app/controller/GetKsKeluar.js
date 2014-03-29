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
//        //daftar Grid selain KK
        {ref: 'ListFaktur', selector: '#listfaktur'},
        {ref: 'ListMintaBayar', selector: '#listmintabayar'},
        {ref: 'DataRujukanGrid', selector: '#datarujukangrid'}
    ],
    init: function() {
        this.control({
        });
    },
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */