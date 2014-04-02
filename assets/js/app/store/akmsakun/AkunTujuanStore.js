var modelku = Ext.define('eTrav.model.AkunTujuanModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'akunId', type: 'int'},
        {name: 'tujuanId', type: 'int'},
        {name: 'tujuanKode', type: 'string'},
        {name: 'tujuanName', type: 'string'},
        {name: 'simpanStatus', type: 'int'}
    ],
    idProperty: 'id'
});
Ext.define('GlApp.store.akmsakun.AkunTujuanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.akmsakun.akuntujuanstore',
    model: modelku,
   
    autoLoad: false,
    autoSync: true,
    storeId: 'AkunTujuanStore',
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'GET',
            update: 'POST',
            create: 'POST',
            destroy: 'POST'
        },
        api: {
            read: BASE_PATH + 'data/list_akun_tujuan',
            update: BASE_PATH + 'master/akun_tujuan',
            create: BASE_PATH + 'master/akun_tujuan',
            destroy: BASE_PATH + 'master/at_delete'
        },
        reader: {
            type: 'json',
            success: true,
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'data',
            encode: true
        }
    },
    listeners: {
        write: function (store, operation, opts) {
            Ext.each(operation.records, function (record) {
                if (record.dirty) {
                    record.commit();
                }
            });
        },
        update: function (store, operation, opts) {
            Ext.each(operation.records, function (record) {
                if (record.dirty) {
                    record.commit();
                }
            });
            store.load();
        }
    }});