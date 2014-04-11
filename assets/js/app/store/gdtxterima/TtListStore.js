var TtListModel = Ext.define('GlApp.model.TtListModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'no', type: 'int'},
        {name: 'id', type: 'string'},
        {name: 'tt_id', type: 'string'},
        {name: 'tt_no', type: 'string'},
        {name: 'tt_tgltrx', type: 'datetime'},
        {name: 'tt_cabang', type: 'int'},
        {name: 'tt_supp_id', type: 'int'},
        {name: 'tt_barang_id', type: 'string'},
        {name: 'tgl_trx', type: 'date'},
        {name: 'tt_qty_kirim', type: 'int'},
        {name: 'cabang_name', type: 'string'},
        {name: 'barang_name', type: 'string'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.gdtxterima.TtListStore', {
    extend: 'Ext.data.Store',
    alias: 'store.gdtxterima.ttliststore',
    model: TtListModel,
    storeId: 'TtListStore',
    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'gd_tt/list_tt_all',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    groupField: 'tt_no'
});