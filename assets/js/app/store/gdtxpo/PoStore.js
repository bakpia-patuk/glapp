var PoModel = Ext.define('GlApp.model.PoModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'no', type: 'int'},
        {name: 'id', type: 'string'},
        {name: 'trx_date', type: 'datetime'},
        {name: 'tgl_trx', type: 'date'},
        {name: 'po_no', type: 'string'},
        {name: 'po_ed', type: 'date'},
        {name: 'po_cabangid', type: 'int'},
        {name: 'po_suppid', type: 'int'},
        {name: 'supp_name', type: 'string'},
        {name: 'po_supp_email', type: 'string'},
        {name: 'po_datekirim', type: 'date'},
        {name: 'po_value', type: 'float'},
        {name: 'po_isangsuran', type: 'int'},
        {name: 'po_angdp', type: 'float'},
        {name: 'po_angqty', type: 'float'},
        {name: 'po_angvalue', type: 'float'},
        {name: 'po_usercreate', type: 'int'},
        {name: 'po_usersign', type: 'string'},
        {name: 'po_ttstatus', type: 'int'},
        {name: 'po_tfstatus', type: 'int'},
        {name: 'po_simpanstatus', type: 'int'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.gdtxpo.PoStore', {
    extend: 'Ext.data.Store',
    alias: 'store.gdtxpo.postore',
    model: PoModel,
    storeId: 'PoStore',
    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'gd_po/list_po_all',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});