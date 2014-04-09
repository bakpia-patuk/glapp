var Faktur = Ext.define('GlApp.model.FakturModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'no', type: 'int'},
        {name: 'id', type: 'string'},
        {name: 'faktur_tgl', type: 'date'},
        {name: 'faktur_suppid', type: 'int'},
        {name: 'faktur_no', type: 'string'},
        {name: 'faktur_nototal', type: 'float'},
        {name: 'faktur_realisasi', type: 'float'},
        {name: 'faktur_realstatus', type: 'int'},
        {name: 'faktur_bayar', type: 'int'},
        {name: 'faktur_bayartgl', type: 'date'},
        {name: 'faktur_cabang', type: 'int'},
        {name: 'faktur_usercreate', type: 'int'},
        {name: 'faktur_agrstat', type: 'int'},
        {name: 'faktur_agrid', type: 'int'},
        {name: 'faktur_ctkstatus', type: 'int'},
        {name: 'fkt_userapp', type: 'int'},
        {name: 'fkt_userappsign', type: 'string'},
        {name: 'fkt_userkirim', type: 'string'},
        {name: 'fkt_userkirimsign', type: 'string'},
        {name: 'simpan_status', type: 'int'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.kskeluar.FakturStore', {
    extend: 'Ext.data.Store',
    alias: 'store.kskeluar.trxkasstore',
    model: Faktur,
    storeId: 'KsKkFakturStore',
    autoLoad: false,
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