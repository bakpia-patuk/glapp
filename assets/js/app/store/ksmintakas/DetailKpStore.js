

Ext.define('GlApp.store.ksmintakas.DetailKpStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ksmintakas.detailkpstore',
    model: MsTelisa,
    storeId: 'KsMkDetailKpStore',
    autoLoad: false,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'shared/list_detailkp',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});