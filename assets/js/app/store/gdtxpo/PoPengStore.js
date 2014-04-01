var PoPengModel = Ext.define('GlApp.model.PoPengModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'no', type: 'int'},
        {name: 'id', type: 'string'},
        {name: 'pengadaan_id', type: 'string'},
        {name: 'no_pengadaan', type: 'string'},
        {name: 'barang_id', type: 'int'},
        {name: 'barang_name', type: 'string'},
        {name: 'po_merk', type: 'int'},
        {name: 'po_merk_name', type: 'string'},
        {name: 'po_katalog', type: 'string'},
        {name: 'po_kemasan', type: 'string'},
        {name: 'po_qty', type: 'int'},
        {name: 'po_harga', type: 'float'},
        {name: 'po_disc', type: 'float'},
        {name: 'po_ppn', type: 'float'},
        {name: 'po_netto', type: 'float'},
        {name: 'barang_desc', type: 'string'},
        {name: 'po_status', type: 'boolean'},
        {name: 'po_class_row', type: 'string'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.gdtxpo.PoPengStore', {
    extend: 'Ext.data.Store',
    alias: 'store.gdtxpo.popengstore',
    model: PoPengModel,
    storeId: 'PengStore',
    autoLoad: false,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'gd_po/list_pengadaan_all',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});