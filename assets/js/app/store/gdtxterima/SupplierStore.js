var SupplierModel = Ext.define('GlApp.model.SupplierModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'ms_kode', type: 'string'},
        {name: 'ms_kodesub', type: 'string'},
        {name: 'ms_name', type: 'string'},
        {name: 'ms_group', type: 'string'},
        {name: 'ms_alamat', type: 'string'},
        {name: 'ms_kota', type: 'string'},
        {name: 'ms_telp', type: 'string'},
        {name: 'ms_telp2', type: 'string'},
        {name: 'ms_email', type: 'string'},
        {name: 'ms_hp', type: 'string'},
        {name: 'ms_fax', type: 'string'},
        {name: 'ms_contact1', type: 'string'},
        {name: 'ms_contact2', type: 'string'},
        {name: 'ms_bank', type: 'string'},
        {name: 'ms_rekening', type: 'string'},
        {name: 'ms_saldopiutang', type: 'string'},
        {name: 'ms_status', type: 'string'}
    ],
    idProperty: 'id'
});


Ext.define('GlApp.store.gdtxterima.SupplierStore', {
    extend: 'Ext.data.Store',
    alias: 'store.gdtxterima.supplierstore',
    model: SupplierModel,
    storeId: 'GdTtSupplierStore',
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