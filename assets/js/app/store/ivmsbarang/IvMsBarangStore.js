var barang = Ext.define('GlApp.model.IvMsBarangStore', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'db_cabang', type: 'int'},
        {name: 'db_divisi', type: 'int'},
        {name: 'db_ruang', type: 'int'},
        {name: 'db_barangid', type: 'int'},
        {name: 'divisi_name', type: 'string'},
        {name: 'ruang_name', type: 'string'},
        {name: 'barang_name', type: 'string'},
        {name: 'db_golid', type: 'int'},
        {name: 'db_value', type: 'int'},
        {name: 'db_barangseri', type: 'string'},
        {name: 'db_penyusutan', type: 'string'},
        {name: 'created', type: 'date'},
        {name: 'simpan_status', type: 'int'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.ivmsbarang.IvMsBarangStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ivmsbarang.ivmsbarangstore',
    model: barang,
    autoLoad: true,
    storeId: 'IvMsBarangStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'iv_msbarang/gets_ivmsbarang',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});