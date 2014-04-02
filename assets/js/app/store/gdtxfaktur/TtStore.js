var Tt = Ext.define('GlApp.model.TtModel', {
    extend: 'Ext.data.Model',
    fields: [
        // tt_supp_id   tt_penerima           tt_urlsign2       faktur_id  tt_faktur_show
        {name: 'id', type: 'int'},
        {name: 'tt_tgltrx', type: 'date'},
        {name: 'tt_cabang', type: 'int'},
        {name: 'tt_no', type: 'string'},
        {name: 'tt_supp_id', type: 'int'},
//        {name: 'ms_name', type: 'string'},
        {name: 'tt_petugas', type: 'string'},
        {name: 'tt_urlsign', type: 'string'},
        {name: 'simpan_status', type: 'int'},
        {name: 'tt_urlsign2', type: 'string'},
//        {name: 'ttSimpanStatus', type: 'int'},
        {name: 'tt_desc', type: 'string'},
        {name: 'tt_fkstatus', type: 'int'},
//        {name: 'idBarang', type: 'string'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.gdtxfaktur.TtStore', {
    extend: 'Ext.data.Store',
    alias: 'store.gdtxfaktur.ttstore',
    model: Tt,
    storeId: 'TrxFakturStore',
    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'gd_txfaktur/tt_list',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});