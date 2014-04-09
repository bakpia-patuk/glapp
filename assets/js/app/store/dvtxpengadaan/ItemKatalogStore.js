var modelku = Ext.define('eTrav.model.ItemKatalogModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id_katalog', type: 'int'},
        {name: 'item_id', type: 'int'},
        {name: 'katalog_no', type: 'string'},
        {name: 'simpan_status', type: 'int'}
    ],
    idProperty: 'id'
});
Ext.define('GlApp.store.dvtxpengadaan.ItemKatalogStore', {
    extend: 'Ext.data.Store',
    alias: 'store.dvtxpengadaan.itemkatalogstore',
    model: modelku,
   
    autoLoad: false,
    storeId: 'ItemKatalogStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'dv_txpengadaan/list_item_katalog',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});