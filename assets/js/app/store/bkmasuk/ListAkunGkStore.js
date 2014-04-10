var GroupPerlu = Ext.define('GlApp.model.GrkModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'akun_code', type: 'string'},
        {name: 'akun_alias', type: 'string'},
        {name: 'akun_name', type: 'string'},
        {name: 'akun_form', type: 'string'},
        {name: 'akun_parent', type: 'int'},
        {name: 'akun_d_k', type: 'int'},
        {name: 'akun_active', type: 'int'},
        {name: 'akun_curr', type: 'int'},
        {name: 'akun_bal_init', type: 'int'},
        {name: 'akun_head_status', type: 'int'},
        {name: 'akun_pos_status', type: 'int'},
        {name: 'akun_child_status', type: 'int'},
        {name: 'akun_group', type: 'int'},
        {name: 'akun_status_tampil', type: 'int'},
        {name: 'akun_note', type: 'string'},
        {name: 'akun_fungsi', type: 'int'},
        {name: 'akun_custom', type: 'int'}
    ],
    idProperty: 'id'
});

Ext.define('GlApp.store.bkmasuk.ListAkunGkStore', {
    extend: 'Ext.data.Store',
    alias: 'store.bkmasuk.KsMklistakungbktore',
    model: GroupPerlu,
    storeId: 'KsKmListAkunGkStore',
    autoLoad: false,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'shared/list_akun_gr',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});