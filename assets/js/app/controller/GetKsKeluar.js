/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetKsKeluar', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
        'kskeluar.TrxKasStore',
        'kskeluar.FakturStore',
        'kskeluar.MintaKasRujukanStore',
        'kskeluar.MintaKasStore',
        'kskeluar.CabangStore'
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
        {ref: 'StartKk', selector: '#datestarkk'},
        {ref: 'EndKk', selector: '#dateendkk'},
        {ref: 'CabangKk', selector: '#cabangkk'},
        
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
                    var faktur = 'listfaktur',
                            mintabayar = 'listmintabayar',
                            kk = 'kskeluargrid',
                            rujukan = 'datarujukangrid';

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
            },
            '#kskeluargrid':{
                afterrender: function(){
                    var grid = this.getKsKeluarGrid(),
                        store = grid.getStore(),
                        filterCollection = [];

                    var filter2 = new Ext.util.Filter({
                        property: 'kas_type',
                        value: 'kaskeluar'
                    });
                    filterCollection.push(filter2);

                    store.clearFilter(true);
                    store.filter(filterCollection);
                }
            },
            '#listfaktur':{
                afterrender: function(id){
                    var grid = this.getListFaktur(),
                        store = grid.getStore();

                    store.removeAll();
                }
            },
            '#listmintabayar':{
                afterrender: function(){
                    var grid = this.getListMintaBayar(),
                        store = grid.getStore(),
                        filterCollection = [];

                    var filter2 = new Ext.util.Filter({
                        property: 'mk_keperluan',
                        value: '6NE'
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'trx_realstatus',
                        value: 0
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'trx_appr_status',
                        value: 1
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'cabang_id',
                        value: CABANG_ID
                    });
                    filterCollection.push(filter2);

                    store.clearFilter(true);
                    store.filter(filterCollection);
                }
            },
            '#datarujukangrid':{
                afterrender: function(){
                    var grid = this.getDataRujukanGrid(),
                        store = grid.getStore(),
                        filterCollection = [];

                    var filter2 = new Ext.util.Filter({
                        property: 'mk_keperluan',
                        value: '6'
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'trx_realstatus',
                        value: 0
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'trx_appr_status',
                        value: 1
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'cabang_id',
                        value: CABANG_ID
                    });
                    filterCollection.push(filter2);

                    store.clearFilter(true);
                    store.filter(filterCollection);
                }
            },
            '#KasKeluarSearch': {
                click: function(){
                    var grid = this.getKsKeluarGrid(),
                            store = grid.getStore(),
                            filterCollection = [],
                            date1 = this.getStartKk().getValue(),
                            date2 = this.getEndKk().getValue(),
                            cabang = this.getCabangKk().getValue();

                    if(cabang === null && date1 === null && date2 === null){
                        Ext.Msg.alert('Perhatian', 'Mohon isi salah satu filter.');
                        return;
                    } else {
                        var statusFilter = new Ext.util.Filter({
                            property: 'kas_type',
                            value: 'kaskeluar'
                        });
                        filterCollection.push(statusFilter);
                        
                        if(cabang !== null && date1 === null && date2 === null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'cabang_id',
                                value: cabang
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang === null && date1 !== null && date2 === null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang === null && date1 === null && date2 !== null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang === null && date1 !== null && date2 !== null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang !== null && date1 === null && date2 !== null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'cabang_id',
                                value: cabang
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang !== null && date1 !== null && date2 === null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter = new Ext.util.Filter({
                                property: 'cabang_id',
                                value: cabang
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        } else if(cabang !== null && date1 !== null && date2 !== null){
                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date1, 'Y-m-d 00:00:00') + 'GT'
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter = new Ext.util.Filter({
                                property: 'cabang_id',
                                value: cabang
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter = new Ext.util.Filter({
                                property: 'kas_tgltrx',
                                value: Ext.Date.format(date2, 'Y-m-d 23:59:59') + 'LT'
                            });
                            filterCollection.push(statusFilter);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        }
                    }
                }
            },
            '#KasKeluarRefresh':{
                click: function(){
                    var grid = this.getKsKeluarGrid(),
                            store = grid.getStore();
                    
                    store.clearFilter(true);
                    store.filter('kas_type', 'kaskeluar');
                    this.getStartKk().reset(),
                    this.getEndKk().reset(),
                    this.getCabangKk().reset();
                }
            },
            '#FakturRefresh':{
                click: function(){
                    var grid = this.getListFaktur(),
                            store = grid.getStore();
                    
                    store.clearFilter(true);
                    store.load();
                }
            },
            '#ListMkRefresh':{
                click: function(){
                    var grid = this.getListMintaBayar(),
                            store = grid.getStore(),
                        filterCollection = [];

                    var filter2 = new Ext.util.Filter({
                        property: 'mk_keperluan',
                        value: '6NE'
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'trx_realstatus',
                        value: 0
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'trx_appr_status',
                        value: 1
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'cabang_id',
                        value: CABANG_ID
                    });
                    filterCollection.push(filter2);

                    store.clearFilter(true);
                    store.filter(filterCollection);
                }
            },
            '#DataRujukanRefresh':{
                click: function(){
                    var grid = this.getDataRujukanGrid(),
                        store = grid.getStore(),
                        filterCollection = [];

                    var filter2 = new Ext.util.Filter({
                        property: 'mk_keperluan',
                        value: '6'
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'trx_realstatus',
                        value: 0
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'trx_appr_status',
                        value: 1
                    });
                    filterCollection.push(filter2);

                    var filter2 = new Ext.util.Filter({
                        property: 'cabang_id',
                        value: CABANG_ID
                    });
                    filterCollection.push(filter2);

                    store.clearFilter(true);
                    store.filter(filterCollection);
                }
            }
        });
    },
//    loadFormFaktur: function(id){
//        Ext.getCmp('kkSave').enable();
//        Ext.getCmp('kkSavePrint').enable();
//        Ext.getCmp('kkNew').enable();
//        Ext.getCmp('kkDelete').enable();
//        
//        this.getKsKeluarForm().body.unmask();
//        var form = this.getKsKeluarForm().getForm();
//
//        form.findField('namaSup').show();
//        form.findField('jumlahTagihan').show();
//        form.findField('jumlahSupLebihBayar').show();
//
//        form.findField('divisi').hide();
//        form.findField('keperluan').hide();
//        form.findField('statusKas').hide();
//        form.findField('statusKas').disable();
//        form.findField('pemeriksaan').hide();
//        form.findField('nama_pasien').hide();
//        form.findField('rujukan_pasien').hide();
//
//        form.findField('kkType').setValue(1);
//    },
//    loadFromFaktur: function(id){
//        Ext.getCmp('kkSave').enable();
//        Ext.getCmp('kkSavePrint').enable();
//        Ext.getCmp('kkNew').enable();
//        Ext.getCmp('kkDelete').enable();
//
//        this.getKsKeluarForm().body.unmask();
//        var form = this.getKsKeluarForm().getForm();
//
//        form.findField('namaSup').hide();
//        form.findField('jumlahTagihan').hide();
//        form.findField('jumlahSupLebihBayar').hide();
//        form.findField('pemeriksaan').hide();
//        form.findField('nama_pasien').hide();
//        form.findField('rujukan_pasien').hide();
//
//        form.findField('divisi').show();
//        form.findField('keperluan').show();
//        form.findField('statusKas').show();
//        form.findField('statusKas').enable();
//
//        form.findField('kkType').setValue(2);
//    },
//    disableFormKk: {
//    },
//    loadFormRujukan: {
//    }
});

/* End of file SystemMenu.js */
/* Location: ./assets/js/app/controller/SystemMenu.js */