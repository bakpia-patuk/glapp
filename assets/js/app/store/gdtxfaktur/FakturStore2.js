var Faktur = Ext.define('GlApp.model.FakturModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'fktTgl', type: 'date'},
        {name: 'fktSuppId', type: 'int'},
        {name: 'fktSuppNama', type: 'string'},
        {name: 'fktNo', type: 'string'},
        {name: 'fktTotal', type: 'float'},
        {name: 'fktByrStat', type: 'int'},
        {name: 'fktBgStat', type: 'int'},
        {name: 'fktCabangId', type: 'int'},
        {name: 'fktCabangName', type: 'string'},
        {name: 'fktUserId', type: 'int'},
        {name: 'fktCetakStatus', type: 'int'},
        {name: 'fktSimpanStatus', type: 'int'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.gdtxfaktur.FakturStore2', {
    extend: 'Ext.data.Store',
    alias: 'store.gdtxfaktur.fakturstore2',
    model: Faktur,
    storeId: 'gdtxfaktur.FakturStore2',
    autoLoad: true,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'gd_txfaktur/list_tf',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});