var ruangan = Ext.define('GlApp.model.RuangModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'divisiCode', type: 'int'},
        {name: 'cabangId', type: 'int'},
        {name: 'ruangId', type: 'string'},
        {name: 'ruangName', type: 'string'},
        {name: 'isActive', type: 'int'}
    ],
    idProperty: 'id'
});
Ext.define('GlApp.store.ivmsbarang.RuangFormStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ivmsbarang.ruangformstore',
    model: ruangan,
    
    autoLoad: false,
    storeId: 'IvMbRuangFormStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'iv_msbarang/list_ruang',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});