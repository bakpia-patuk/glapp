var PoDetailModel = Ext.define('GlApp.model.PoDetailModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'no', type: 'int'},
        {name: 'id', type: 'string'},
        {name: 'po_id', type: 'string'},
        {name: 'po_no', type: 'string'},
        {name: 'po_ed', type: 'date'},
        {name: 'po_cabang_id', type: 'int'},
        {name: 'po_divisi', type: 'int'},
        {name: 'po_supp_id', type: 'int'},
        {name: 'peng_id', type: 'string'},
        {name: 'barang_id', type: 'string'},
        {name: 'barang_qty', type: 'int'},
        {name: 'barang_harga', type: 'float'},
        {name: 'barang_disc', type: 'float'},
        {name: 'barang_ppn', type: 'float'},
        {name: 'barang_netto', type: 'float'},
        {name: 'barang_merk', type: 'int'},
        {name: 'barang_ket', type: 'string'},
        {name: 'barang_katalog', type: 'string'},
        {name: 'tt_status', type: 'int'},
        {name: 'tt_id', type: 'int'},
        {name: 'tt_qty_kirim', type: 'int'},
        {name: 'tt_set', type: 'int'},
        {name: 'simpan_status', type: 'int'},
        {name: 'barang_name', type: 'string'},
        {name: 'merk_name', type: 'string'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.gdtxpo.PoDetailStore', {
    extend: 'Ext.data.Store',
    alias: 'store.gdtxpo.podetailstore',
    model: PoDetailModel,
    storeId: 'PoDetailStore',
    autoLoad: false,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'gd_po/list_po_detail',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});