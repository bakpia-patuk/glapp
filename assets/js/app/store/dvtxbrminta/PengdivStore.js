var modelku = Ext.define('eTrav.model.PengdivModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'tglTransaksi', type: 'date'},
        {name: 'pengNo', type: 'string'},
        {name: 'cabangId', type: 'int'},
        {name: 'divisi', type: 'int'},
        {name: 'ruangan', type: 'int'},
        {name: 'divisiTujuan', type: 'int'},
        {name: 'tujuan', type: 'int'},
        {name: 'divisiName', type: 'string'},
        {name: 'ruangName', type: 'string'},
        {name: 'divTujuanName', type: 'string'},
        {name: 'divRuangName', type: 'string'},
        {name: 'pengPetugas', type: 'int'},
        {name: 'simpanStatus', type: 'int'},
         {name: 'appr_status', type: 'int'}
    ],
    idProperty: 'idPengadaan'
});

Ext.define('GlApp.store.dvtxbrminta.PengdivStore', {
    extend: 'Ext.data.Store',
    alias: 'store.dvtxbrminta.pengdivstore',
    model: modelku,
   
    autoLoad: false,
    storeId: 'PengdivStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'dv_txbrminta/list_mintadiv',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});