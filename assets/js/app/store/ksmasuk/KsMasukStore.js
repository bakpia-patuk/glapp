var KasMasuk = Ext.define('GlApp.model.KsMasukModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'kdGrkId', type: 'int'},
        {name: 'kdName', type: 'string'},
        {name: 'kdDesc', type: 'string'},
        {name: 'isActive', type: 'int'},
        {name: 'kdAkun', type: 'int'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.ksmasuk.KsMasukStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ksmasuk.ksmasukstore',
    model: KasMasuk,
    storeId: 'KsKmtore',
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