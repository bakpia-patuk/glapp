var modelku = Ext.define('eTrav.model.AkunModelTree', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'statusCabang', type: 'int'},
        {name: 'lokasiCabang', type: 'int'},
        {name: 'namaTabel', type: 'string'},
        {name: 'codeAkun', type: 'string'},
        {name: 'codeAkunchild', type: 'int'},
        {name: 'codeAkunPure', type: 'string'},
        {name: 'akunCodeOld', type: 'string'},
        {name: 'groupAkun', type: 'int'},
        {name: 'namaAkun', type: 'string'},
        {name: 'parentAkun', type: 'string'},
        {name: 'isBiaya', type: 'boolean'},
        {name: 'debetKredit', type: 'string'},
        {name: 'aktifStatus', type: 'int'},
        {name: 'akunCurr', type: 'int'},
        {name: 'akunBall', type: 'float'},
        {name: 'isBerangkat', type: 'int'},
        {name: 'isAkunKas', type: 'boolean'},
        {name: 'akunStatusTampil', type: 'int'},
        {name: 'fungsiAkun', type: 'int'},
        {name: 'akunHead', type: 'int'},
        {name: 'akunDesc', type: 'string'},
//        {name: 'akunPosition', type: 'string'},
        {name: 'hasChild', type: 'boolean'},
        {name: 'iconCls', type: 'string'},
        {name: 'leaf', type: 'boolean'},
        {name: 'expanded', defaultValue: true}
    ],
    idProperty: 'id'
});



Ext.define('GlApp.store.akmsakun.AkunStoreTree', {
    extend: 'Ext.data.TreeStore',
    model: modelku,
    
    root: {
        text: 'root',
        id: '0',
        expanded: false
    },
    proxy: {
        type: 'ajax',
        url: BASE_PATH + 'shared/akun_tree',
        actionMethods: 'POST',
        reader: {
            type: 'json'
        }
    },
    clearOnLoad: false
});