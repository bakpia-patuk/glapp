var modelku = Ext.define('eTrav.model.AkunModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'codeAkun', type: 'string'},
        {name: 'codeAkunPure', type: 'string'},
        {name: 'codeAkunRender', type: 'string'},
        {name: 'groupAkun', type: 'int'},
        {name: 'namaAkun', type: 'string'},
        {name: 'parentAkun', type: 'string'},
        {name: 'isBiaya', type: 'boolean'},
        {name: 'debetKredit', type: 'string'},
        {name: 'aktifStatus', type: 'int'},
        {name: 'akunCurr', type: 'int'},
        {name: 'symbol', type: 'string'},
        {name: 'akunBall', type: 'float'},
        {name: 'groupBerangkat', type: 'int'},
        {name: 'akunStatusTampil', type: 'int'},
        {name: 'akunHead', type: 'string'},
        {name: 'akunPosition', type: 'int'},
        {name: 'hasChild', type: 'boolean'},
        {name: 'iconCls', type: 'string'},
        {name: 'akunFungsi', type: 'int'}
    ],
    idProperty: 'id'
});
Ext.define('GlApp.store.akmsakun.AkunComboStore', {
    extend: 'Ext.data.Store',
    alias: 'store.akmsakun.akuncombostore',
    model: modelku,
    
    autoLoad: false,
    storeId: 'AkunComboStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'data/get_akun_combo',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});