var modelku = Ext.define('eTrav.model.GroupAkunModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'kodeGroupAkun', type: 'int'},
        {name: 'kodeGroupOld', type: 'int'},
        {name: 'namaGroupAkun', type: 'string'},
        {name: 'groupDesc', type: 'string'},
        {name: 'groupDesc', type: 'boolean'}
    ],
    idProperty: 'id'
});
Ext.define('GlApp.store.akmsakun.GroupAkunStore', {
    extend: 'Ext.data.Store',
    alias: 'store.akmsakun.groupakunstore',
    
    autoLoad: false,
    storeId: 'GroupAkunStore',
    model: modelku,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'shared/get_groups_akun',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

