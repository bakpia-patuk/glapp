var modelku = Ext.define('eTrav.model.AkunCustomModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'akunId', type: 'int'},
        {name: 'customName', type: 'string'},
        {name: 'customLabel', type: 'string'},
        {name: 'customTable', type: 'string'},
        {name: 'status', type: 'int'},
        {name: 'customDesc', type: 'string'},
        {name: 'simpanStatus', type: 'int'}
    ],
    idProperty: 'id'
});
Ext.define('GlApp.store.akmsakun.AkunCustomStore', {
    extend: 'Ext.data.Store',
    alias: 'store.akmsakun.akuncustomstore',
    model: modelku,
   
    autoLoad: false,
    storeId: 'AkunCustomStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'data/list_akun_custom',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});