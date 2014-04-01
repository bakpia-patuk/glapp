var MsTelisa = Ext.define('GlApp.model.MasterTelisaModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'mt_cabang', type: 'int'},
        {name: 'mt_jenis', type: 'int'},
        {name: 'mt_nama', type: 'string'},
        {name: 'mt_rek', type: 'string'},
        {name: 'mt_surat', type: 'string'},
        {name: 'mt_alamat', type: 'string'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.ksmasuk.MasterTelisaStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ksmasuk.mastertelisastore',
    model: MsTelisa,
    storeId: 'AkKmMasterTelisaStore',
    autoLoad: false,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'shared/list_mstelisa',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});