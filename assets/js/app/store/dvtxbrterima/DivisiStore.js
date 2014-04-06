var modelku = Ext.define('eTrav.model.DivisiModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'divisiId', type: 'int'},
        {name: 'divisiName', type: 'string'},
        {name: 'isActive', type: 'int'}
    ],
    idProperty: 'id'
});
Ext.define('GlApp.store.dvtxbrterima.DivisiStore', {
    extend: 'Ext.data.Store',
    alias: 'store.dvtxbrterima.divisistore',
    model: modelku,
    
    autoLoad: false,
    storeId: 'DivisiStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'dv_txpengadaan/list_divisi',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});