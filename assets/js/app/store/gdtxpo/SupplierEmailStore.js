var EmailModel = Ext.define('GlApp.model.EmailModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'supp_id', type: 'int'},
        {name: 'email', type: 'string'},
        {name: 'email_name', type: 'string'}
    ],
    idProperty: 'id'
});


Ext.define('GlApp.store.gdtxpo.SupplierEmailStore', {
    extend: 'Ext.data.Store',
    alias: 'store.gdtxpo.supplieremailstore',
    model: EmailModel,
    storeId: 'GdPoSuppEmailStore',
    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'shared/list_supplier_email',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});