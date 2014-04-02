var Faktur = Ext.define('GlApp.model.FakturModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'faktur_tgl', type: 'date'},
        {name: 'faktur_suppid', type: 'int'},
//        {name: 'fktSuppNama', type: 'string'},
        {name: 'faktur_no', type: 'string'},
        {name: 'faktur_nototal', type: 'float'},
        {name: 'faktur_bayar', type: 'int'},
        {name: 'fktBgStat', type: 'int'},
        {name: 'faktur_cabang', type: 'int'},
//        {name: 'fktCabangName', type: 'string'},
        {name: 'faktur_usercreate', type: 'int'},
        {name: 'faktur_ctkstatus', type: 'int'},
        {name: 'simpan_status', type: 'int'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.kskeluar.FakturStore', {
    extend: 'Ext.data.Store',
    alias: 'store.kskeluar.trxkasstore',
    model: Faktur,
    storeId: 'KsKkFakturStore',
    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'ks_keluar/trx_faktur',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});