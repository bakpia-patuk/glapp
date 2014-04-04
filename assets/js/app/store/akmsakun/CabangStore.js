var modelku = Ext.define('eTrav.model.CabangModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'cabangId', type: 'string'},
        {name: 'cabangCity', type: 'string'},
        {name: 'cabangName', type: 'string'},
        {name: 'cabangCityName', type: 'string'},
        {name: 'cabangAdd', type: 'string'},
        {name: 'cabangTelp', type: 'string'}
    ],
    idProperty: 'id'
});
Ext.define('GlApp.store.akmsakun.CabangStore', {
    extend: 'Ext.data.Store',
    alias: 'store.akmsakun.cabangstore',
    model: modelku,
   
    autoLoad: true,
    storeId: 'CabangStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'data/list_cabang',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});