var GroupPerlu = Ext.define('GlApp.model.GrkModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'grk_name', type: 'string'},
        {name: 'grk_desc', type: 'string'},
        {name: 'grk_status', type: 'int'},
        {name: 'grk_active', type: 'int'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.bkrencanaagr.GrkBkStore', {
    extend: 'Ext.data.Store',
    alias: 'store.bkrencanaagr.grkbkstore',
    model: GroupPerlu,
    storeId: 'BkRarkBkStore',
    autoLoad: false,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'shared/list_group_keperluan',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});