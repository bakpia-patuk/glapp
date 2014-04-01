var PengDtModel = Ext.define('GlApp.model.PengDtModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'no', type: 'int'},
        {name: 'id', type: 'string'},
        {name: 'cabang_id', type: 'int'},
        {name: 'divisi', type: 'int'},
        {name: 'pengadaan_id', type: 'string'},
        {name: 'tgl_butuh', type: 'date'},
        {name: 'barang_gol', type: 'int'},
        {name: 'barang_id', type: 'string'},
        {name: 'barang_name', type: 'string'},
        {name: 'peng_merk', type: 'int'},
        {name: 'merk_name', type: 'string'},
        {name: 'peng_katalog', type: 'string'},
        {name: 'peng_kemasan', type: 'int'},
        {name: 'peng_qty', type: 'int'},
        {name: 'peng_harga', type: 'float'},
        {name: 'peng_disc', type: 'float'},
        {name: 'peng_ppn', type: 'float'},
        {name: 'qty_po', type: 'int'},
        {name: 'po_merk', type: 'int'},
        {name: 'po_katalog', type: 'string'},
        {name: 'po_kemasan', type: 'int'},
        {name: 'po_qty', type: 'int'},
        {name: 'po_harga', type: 'float'},
        {name: 'po_disc', type: 'float'},
        {name: 'po_ppn', type: 'float'},
        {name: 'po_status', type: 'int'},
        {name: 'po_id', type: 'int'},
        {name: 'barang_desc', type: 'string'},
        {name: 'simpan_status', type: 'int'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.gdtxpengadaan.PengDetailStore', {
    extend: 'Ext.data.Store',
    alias: 'store.gdtxpengadaan.pengdetailstore',
    model: PengDtModel,
    storeId: 'PengStore',
    autoLoad: false,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'gd_pengadaan/list_detail',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});