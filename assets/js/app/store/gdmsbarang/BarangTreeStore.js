var BarangModel = Ext.define('GlApp.model.BarangModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'mi_parent_id', type: 'int'},
        {name: 'mi_kode', type: 'string'},
        {name: 'mi_name', type: 'string'},
        {name: 'mi_item_price', type: 'float'},
        {name: 'mi_curr', type: 'int'},
        {name: 'mi_merk', type: 'int'},
        {name: 'mi_barcode', type: 'string'},
        {name: 'mi_kemasan', type: 'int'},
        {name: 'mi_satuan', type: 'int'},
        {name: 'mi_nolot', type: 'int'},
        {name: 'mi_inv_stat', type: 'int'},
        {name: 'mi_ed', type: 'date'},
        {name: 'mi_katalog', type: 'string'},
        {name: 'mi_diskon', type: 'float'},
        {name: 'mi_ppn', type: 'float'},
        {name: 'mi_hpp', type: 'float'},
        {name: 'mi_pengstat', type: 'int'},
        {name: 'mi_loc', type: 'int'},
        {name: 'mi_child_stat', type: 'int'},
        {name: 'mi_active', type: 'int'},
        {name: 'mi_sort', type: 'int'},
        {name: 'simpan_status', type: 'int'},
        {name: 'leaf', type: 'boolean'},
        {name: 'expanded', defaultValue: true}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.gdmsbarang.BarangTreeStore', {
    extend: 'Ext.data.TreeStore',
    model: BarangModel,
    root: {
        text: 'root',
        id: '0',
        expanded: true
    },
    proxy: {
        type: 'ajax',
        url: BASE_PATH + 'shared/list_barang_tree',
        actionMethods: 'POST',
        reader: {
            type: 'json'
        }
    },
    clearOnLoad: true
});