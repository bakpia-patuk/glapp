var modelku = Ext.define('eTrav.model.ItemModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'itemCode', type: 'string'},
        {name: 'itemRender', type: 'string'},
        {name: 'itemCodeOld', type: 'string'},
        {name: 'itemName', type: 'string'},
        {name: 'itemNetto', type: 'int'},
        {name: 'itemParent', type: 'int'},
        {name: 'itemParentName', type: 'string'},
        {name: 'itemMerk', type: 'int'},
        {name: 'itemMerkName', type: 'string'},
        {name: 'itemKemDef', type: 'string'},
        {name: 'isChild', type: 'int'},
        {name: 'isPpn', type: 'int'},
        {name: 'minStock', type: 'int'},
        {name: 'maxStock', type: 'int'},
        {name: 'initStock', type: 'int'},
        {name: 'lastStock', type: 'int'},
        {name: 'hargaItem', type: 'float'},
        {name: 'itemCurr', type: 'string'},
        {name: 'itemCatalog', type: 'string'},
        {name: 'itemBarcode', type: 'int'},
        {name: 'itemDisc', type: 'int'},
        {name: 'isNoLot', type: 'int'},
        {name: 'itemStatus', type: 'int'},
        {name: 'persediaanStatus', type: 'int'},
        {name: 'itemPosition', type: 'int'},
        {name: 'itemAktif', type: 'int'}
    ],
    idProperty: 'id'
});
Ext.define('GlApp.store.dvtxbrterima.ItemStore', {
    extend: 'Ext.data.Store',
    alias: 'store.dvtxbrterima.itemstore',
    model: modelku,
    autoLoad: false,
    storeId: 'ItemStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'dv_txpengadaan/get_items',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});