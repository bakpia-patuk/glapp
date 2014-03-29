Ext.define('GlApp.model.JurnalAllModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'noBk', type: 'string'},
        {name: 'typeTrx', type: 'int'},
        {name: 'jumlahTrxKas', type: 'float'},
        {name: 'idJurnal', type: 'int'},
        {name: 'tglJurnalFull', type: 'datetime'},
        {name: 'tglJurnal', type: 'date'},
        {name: 'jamJurnal', type: 'time'},
        {name: 'idAkun', type: 'int'},
        {name: 'status_db', type: 'int'},
        {name: 'codeAkun', type: 'string'},
        {name: 'namaAkun', type: 'string'},
        {name: 'groupAkun', type: 'int'},
        {name: 'kredit', type: 'float'},
        {name: 'debet', type: 'float'},
        {name: 'jumlahTrx', type: 'float'},
        {name: 'keterangan', type: 'string'},
        {name: 'noRefTrx', type: 'string'},
        {name: 'typeJurnal', type: 'int'},
        {name: 'apprStat', type: 'boolean'},
        {name: 'cabangId', type: 'int'},
        {name: 'cabangName', type: 'string'},
        {name: 'userId', type: 'int'},
        {name: 'userCreate', type: 'string'}
    ],
    idProperty: 'idJurnal'
});

Ext.define('eTrav.store.JurnalAllStore', {
    extend: 'Ext.data.Store',
    alias: 'store.jurnalallstore',
    requires: [
        'eTrav.model.JurnalAllModel'
    ],
    autoLoad: false,
    storeId: 'JurnalAllStore',
    model: 'eTrav.model.JurnalAllModel',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'akun/jurnal_all_list',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    // sorters: {property: 'tglJurnal', direction: 'ASC'},
    groupField: ['typeJurnal']
});

