var modelku = Ext.define('eTrav.model.PengadaanDetailModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'pengadaanNo', type: 'int'},
        {name: 'pengadaanKode', type: 'pengadaanKode'},
        {name: 'barangId', type: 'int'},
        {name: 'barangName', type: 'string'},
        {name: 'barangMerk', type: 'string'},
        {name: 'barangNameKode', type: 'string'},
        {name: 'barangKemasan', type: 'string'},
        {name: 'barangKatalog', type: 'string'},
        {name: 'barangHarga', type: 'double'},
        {name: 'barangDisc', type: 'double'},
        {name: 'tglKebutuhan', type: 'date'},
        {name: 'barangDesc', type: 'string'},
        {name: 'barangPpn', type: 'float'},
        {name: 'barangQty', type: 'int'},
        {name: 'barangNetto', type: 'float'},
        {name: 'barangStatus', type: 'int'},
        {name: 'simpanStatus', type: 'int'},
        {name: 'poStatus', type: 'int'},
        {name: 'poId', type: 'int'},
        {name: 'pengDivisi', type: 'int'},
        {name: 'pengCabangId', type: 'int'}
    ],
    idProperty: 'id'
});
Ext.define('GlApp.store.dvtxpengadaan.PengadaanDetailStore', {
    extend: 'Ext.data.Store',
    alias: 'store.dvtxpengadaan.pengadaandetailstore',
    model: modelku,
   
    autoLoad: false,
    storeId: 'PengadaanDetailStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'dv_txpengadaan/list_pengadaan_detail',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    groupField: 'pengadaanKode'
});