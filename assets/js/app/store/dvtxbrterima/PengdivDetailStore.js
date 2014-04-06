var modelku = Ext.define('eTrav.model.PengdivDetailModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'pengadaanNo', type: 'int'},
        {name: 'pengadaanKode', type: 'string'},
        {name: 'barangId', type: 'string'},
        {name: 'barangName', type: 'string'},
        {name: 'qtyMinta', type: 'string'},
        {name: 'qtyKirim', type: 'string'},
        {name: 'qtyTerima', type: 'string'},
        {name: 'mintaStatus', type: 'string'},
        {name: 'kirimStatus', type: 'float'},
        {name: 'terimaStatus', type: 'int'},
        {name: 'tglKirim', type: 'date'},
        {name: 'noKirim', type: 'string'},
        {name: 'tglTerima', type: 'date'},
        {name: 'userKirim', type: 'int'},
        {name: 'userTerima', type: 'int'},
         {name: 'appr_status', type: 'int'}
    ],
    idProperty: 'id'
});
Ext.define('GlApp.store.dvtxbrterima.PengdivDetailStore', {
    extend: 'Ext.data.Store',
    alias: 'store.dvtxbrterima.pengadaandetailstore',
    model: modelku,
    
    autoLoad: false,
    storeId: 'PengdivDetailStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'dv_txbrminta/list_mintadiv_detail',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    groupField: 'pengadaanKode'
});