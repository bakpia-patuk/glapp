var detail = Ext.define('GlApp.model.PenginvDetailModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'penginv_id', type: 'int'},
        {name: 'penginv_no', type: 'string'},
        {name: 'barang_id', type: 'int'},
        {name: 'barangName', type: 'string'},
        {name: 'barang_qty_minta', type: 'string'},
        {name: 'barang_qty_kirim', type: 'string'},
        {name: 'barang_qty_terima', type: 'string'},
        {name: 'minta_status', type: 'string'},
        {name: 'kirim_status', type: 'float'},
        {name: 'terima_status', type: 'int'},
        {name: 'tgl_kirim', type: 'date'},
        {name: 'tgl_terima', type: 'string'},
        {name: 'user_kirim', type: 'int'},
        {name: 'user_terima', type: 'int'},
        {name: 'brg_klr_stat', type: 'int'},
        {name: 'no_brg_msk', type: 'string'},
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.ivtxbrminta.IvTxBrMintaDetailStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ivtxbrminta.ivtxbrmintadetailstore',
    model: detail,
    autoLoad: false,
    storeId: 'ivtxbrmintadetailstore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'iv_txbrminta/list_mintainv_detail',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});