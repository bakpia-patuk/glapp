var modelku = Ext.define('eTrav.model.KemasanModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'msi_idbarang', type: 'int'},
        {name: 'msi_satbesar', type: 'int'},
        {name: 'nama_satbesar', type: 'string'},
        {name: 'msi_satkecil', type: 'int'},
        {name: 'nama_satkecil', type: 'string'},
        {name: 'msi_konversi', type: 'int'},
        {name: 'is_active', type: 'int'}
    ],
    idProperty: 'id'
});
Ext.define('GlApp.store.dvtxpengadaan.KemasanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.dvtxpengadaan.kemasanstore',
    model: modelku,
   
    autoLoad: false,
    storeId: 'KemasanStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'dv_txpengadaan/kemasan_all',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});