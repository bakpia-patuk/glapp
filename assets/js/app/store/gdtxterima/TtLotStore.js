var TtLotModel = Ext.define('GlApp.model.TtLotModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'no', type: 'int'},
        {name: 'id', type: 'string'},
        {name: 'stl_date', type: 'date'},
        {name: 'stl_cabangid', type: 'int'},
        {name: 'stl_divisiid', type: 'int'},
        {name: 'stl_ruangid', type: 'int'},
        {name: 'stl_barangid', type: 'string'},
        {name: 'stl_nolot', type: 'string'},
        {name: 'stl_qty', type: 'int'},
        {name: 'stl_qtylast', type: 'int'},
        {name: 'stl_baranged', type: 'date'},
        {name: 'stk_trxreftype', type: 'string'},
        {name: 'stk_trxref', type: 'string'},
        {name: 'stl_barcode', type: 'string'},
        {name: 'simpan_status', type: 'int'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.gdtxterima.TtLotStore', {
    extend: 'Ext.data.Store',
    alias: 'store.gdtxterima.ttlotstore',
    model: TtLotModel,
    storeId: 'TtLotStore',
    autoLoad: false,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'gd_tt/list_tt_lot',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});