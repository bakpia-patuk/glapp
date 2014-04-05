var TtDetail = Ext.define('GlApp.model.TtDetailModel', {
    extend: 'Ext.data.Model',
    fields: [
        // id     tt_cabang_id                          tt_faktur_show  faktur_id  tt_set  
        {name: 'id', type: 'string'},
        {name: 'tt_id', type: 'string'},
        {name: 'ttNo', type: 'string'},
        {name: 'tt_po_id', type: 'int'},
        {name: 'ttPoNo', type: 'string'},
        {name: 'ttPoExp', type: 'date'},
        {name: 'tt_peng_id', type: 'int'},
        {name: 'tt_barang_id', type: 'int'},
        {name: 'ttBarangName', type: 'string'},
        {name: 'tt_supp_id', type: 'int'},
        {name: 'tt_qty_pesan', type: 'int'},
        {name: 'tt_qty_kirim', type: 'int'},
        {name: 'tt_qty_sisa', type: 'int'},
        {name: 'tt_harga', type: 'float'},
        {name: 'tt_disc', type: 'int'},
        {name: 'tt_ppn', type: 'int'},
        {name: 'tt_faktur_status', type: 'int'},
        {name: 'simpan_status', type: 'int'}
    ],
    idProperty: 'id'
});


Ext.define('GlApp.store.gdtxfaktur.TtDetailStore', {
    extend: 'Ext.data.Store',
    alias: 'store.gdtxfaktur.ttdetailstore',
    model: TtDetail,
    storeId: 'TrxTtDetailStore',
    autoLoad: false,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'gd_txfaktur/tt_detail_list',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});