var JurnalUmum = Ext.define('GlApp.model.JurnalAllModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'noBk', type: 'string'},
        {name: 'jenis_trx', type: 'int'},
        {name: 'jumlah_trx', type: 'float'},
        {name: 'idJurnal', type: 'int'},
        {name: 'tgl_trx', type: 'datetime'},
        {name: 'tglJurnal', type: 'date'},
        {name: 'jamJurnal', type: 'time'},
        {name: 'idAkun', type: 'int'},
        {name: 'status_db', type: 'int'},
        {name: 'codeAkun', type: 'string'},
        {name: 'akun_name', type: 'string'},
        {name: 'akun_group', type: 'int'},
        {name: 'kredit', type: 'float'},
        {name: 'debet', type: 'float'},
        {name: 'jumlahTrx', type: 'float'},
        {name: 'uraian', type: 'string'},
        {name: 'no_ref_trx', type: 'string'},
        {name: 'jurnal_type', type: 'int'},
        {name: 'status_app', type: 'boolean'},
        {name: 'cabang', type: 'int'},
        {name: 'cabangName', type: 'string'},
        {name: 'peg_id', type: 'int'},
        {name: 'user_create', type: 'string'}
    ],
    idProperty: 'idJurnal'
});

Ext.define('GlApp.store.akjurnalumum.JurnalAllStore', {
    extend: 'Ext.data.Store',
    alias: 'store.akjurnalumum.jurnalallstore',
    model: JurnalUmum,
    storeId: 'AkJuUmumStore',
    autoLoad: false,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'ak_jurnalumum/jurnal_all_list',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
//    groupField: ['jurnal_type']
});

//Ext.define('GlApp.store.akurnalumum.JurnalAllStore', {
//    extend: 'Ext.data.Store',
//    alias: 'store.jurnalallstore',
//    requires: [
//        'eTrav.model.JurnalAllModel'
//    ],
//    autoLoad: false,
//    storeId: 'JurnalAllStore',
//    model: 'eTrav.model.JurnalAllModel',
//    remoteFilter: true,
//    proxy: {
//        success: true,
//        type: 'ajax',
//        url: BASE_PATH + 'akun/jurnal_all_list',
//        reader: {
//            type: 'json',
//            root: 'data'
//        }
//    },
//    // sorters: {property: 'tglJurnal', direction: 'ASC'},
//    
//});

