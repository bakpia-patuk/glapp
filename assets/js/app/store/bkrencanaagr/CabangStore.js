var CabangModel = Ext.define('GlApp.model.CabangModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'cabang_code', type: 'string'},
        {name: 'cabang_city', type: 'string'},
        {name: 'cabang_alias', type: 'string'},
        {name: 'cabang_city_name', type: 'string'},
        {name: 'cabang_address', type: 'string'},
        {name: 'cabang_phone', type: 'string'}
    ],
    idProperty: 'id'
});


Ext.define('GlApp.store.bkrencanaagr.CabangStore', {
    extend: 'Ext.data.Store',
    alias: 'store.bkrencanaagr.cabangstore',
    model: CabangModel,
    storeId: 'BkRaCabangStore',
    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'shared/list_cabang',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});