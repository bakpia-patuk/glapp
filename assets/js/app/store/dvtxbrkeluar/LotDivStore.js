var modelku = Ext.define('eTrav.model.LotDivModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'noLot', type: 'string'},
        {name: 'idRuang', type: 'int'},
        {name: 'idBarang', type: 'int'},
        {name: 'namaBarang', type: 'string'},
        {name: 'qtyLot', type: 'int'},
        {name: 'qtyKeluar', type: 'int'},
        {name: 'qtyOld', type: 'int'},
        {name: 'tglEd', type: 'date'},
        {name: 'noBarcode', type: 'string'},
        {name: 'simpanStatus', type: 'int'}
    ],
    idProperty: 'id'
});
Ext.define('GlApp.store.dvtxbrkeluar.LotDivStore', {
    extend: 'Ext.data.Store',
    alias: 'store.dvtxbrkeluar.lotdivstore',
    model: modelku,
  
    autoLoad: false,
    storeId: 'LotDivStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'dv_txbrkeluar/getsdiv_lot',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});