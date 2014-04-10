var BarangModel = Ext.define('GlApp.model.BarangModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'no', type: 'int'},
        {name: 'id', type: 'string'},
        {name: 'id_barang', type: 'int'},
        {name: 'mi_name', type: 'string'},
        {name: 'stock_last', type: 'int'},
        {name: 'stock_min', type: 'int'},
        {name: 'stock_max', type: 'int'},
        {name: 'mi_parent_id', type: 'int'},
        {name: 'mi_parent_name', type: 'string'},
        {name: 'mi_merk', type: 'int'},
        {name: 'mi_merk_name', type: 'string'},
        {name: 'mi_item_price', type: 'float'},
        {name: 'mi_barcode', type: 'string'},
        {name: 'mi_inv_stat', type: 'int'},
        {name: 'mi_katalog', type: 'string'},
        {name: 'mi_diskon', type: 'float'},
        {name: 'mi_ppn', type: 'float'},
        {name: 'mi_hpp', type: 'float'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.gdlsstockop.BarangStore', {
    extend: 'Ext.data.Store',
    alias: 'store.gdlsstockop.barangstore',
    model: BarangModel,
    storeId: 'TrxPengStore',
    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'shared/list_barang_cabang',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});