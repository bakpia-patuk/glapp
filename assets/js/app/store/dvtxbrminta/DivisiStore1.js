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
Ext.define('GlApp.store.dvtxbrminta.DivisiStore1', {
    extend: 'Ext.data.Store',
    alias: 'store.dvtxbrminta.divisistore1',
    model: modelku,
    
    autoLoad: false,
    storeId: 'DivisiStore1',
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