var modelku = Ext.define('eTrav.model.ItemMerkModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'merk_name', type: 'string'},
        {name: 'simpan_status', type: 'int'}
    ],
    idProperty: 'id'
});
Ext.define('GlApp.store.dvtxpengadaan.ItemMerkStore', {
    extend: 'Ext.data.Store',
    alias: 'store.dvtxpengadaan.itemmerkstore',
    model: modelku,
    
    autoLoad: false,
    storeId: 'ItemMerkStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'dv_txpengadaan/list_item_merk',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});