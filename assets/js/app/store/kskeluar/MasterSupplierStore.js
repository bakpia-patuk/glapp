var MasterSupplier = Ext.define('GlApp.model.MasterSupplierModel', {
    extend: 'Ext.data.Model',
    fields: [
        // id       ms_group ms_saldopiutang    
        {name: 'id', type: 'int'},
        {name: 'ms_kode', type: 'int'},
        {name: 'ms_kodesub', type: 'int'},
        {name: 'ms_status', type: 'int'},
        {name: 'ms_kota', type: 'int'},
        {name: 'namakotams', type: 'string'},
        {name: 'ms_name', type: 'string'},
        {name: 'suppdisplay', type: 'string'},
        {name: 'namamsbaru', type: 'int'},
        {name: 'ms_email', type: 'string'},
        {name: 'ms_alamat', type: 'string'},
        {name: 'ms_telp', type: 'string'},
        {name: 'ms_telp2', type: 'string'},
        {name: 'ms_contact1', type: 'string'},
        {name: 'ms_contact2', type: 'string'},
        {name: 'ms_hp', type: 'string'},
        {name: 'ms_fax', type: 'string'},
        {name: 'ms_bank', type: 'string'},
        {name: 'ms_rekening', type: 'string'},
        {name: 'grpalfabet', type: 'string'}
    ],
    idProperty: 'id'
});


Ext.define('GlApp.store.kskeluar.MasterSupplierStore', {
    extend: 'Ext.data.Store',
    alias: 'store.kskeluar.mastersupplierstore',
    model: MasterSupplier,
    storeId: 'KsMkMasterSupplierStore',
    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'shared/list_supplier',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});