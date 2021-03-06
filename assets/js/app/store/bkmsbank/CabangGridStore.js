var CabangModel = Ext.define('GlApp.model.CabangModel', {
    extend: 'Ext.data.Model',
    fields: [
//        id  cabang_code  cabang_alias  cabang_city  cabang_address  cabang_phone  cabang_active
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


Ext.define('GlApp.store.bkmsbank.CabangGridStore', {
    extend: 'Ext.data.Store',
    alias: 'store.bkmsbank.cabanggridstore',
    model: CabangModel,
    storeId: 'BkMsBkCabangGridStore',
    autoLoad: false,
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