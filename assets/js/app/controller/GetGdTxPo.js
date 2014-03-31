/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetGdTxPo', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'gdtxpo.CabangStore',
        'gdtxpo.PoPengStore'
    ],
    views: [
        'gdtxpo.GetGdTxPo',
        'gdtxpo.TxPoForm',
        'gdtxpo.TxPoGrid',
        'gdtxpo.TxPoListGrid',
        'gdtxpo.TxPoListGridDt'
    ],
    refs: [
        {ref: 'PoPanel', selector: '#popanelform'},
        {ref: 'PoForm', selector: '#txpoform'},
        {ref: 'PoPengGrid', selector: '#txpogrid'}
    ],
    init: function() {
        this.listen({
            controller: {
            },
            component: {
                '#popanelform button[action=searchPo]': {
                    click: this.showListPeng
                },
                '#popanelform button[action=refreshPo]': {
                    click: this.reloadListPeng
                },
                '#popanelform button[action=suppDelete]': {
                    action: this.showSatuan
                }
            },
            global: {
            },
            store: {
            }
        });
    },
    showListPeng: function(btn) {
        var panel = this.getPoPanel(),
                tgl1 = panel.down('#poTgl1').getValue(),
                tgl2 = panel.down('#poTgl2').getValue(),
                cabang = panel.down('#poCabang').getValue(),
                grid1 = this.getPoPengGrid(),
                store = grid1.getStore(),
                filterCollection = [];

        if (cabang !== null) {
            var statusFilter = new Ext.util.Filter({
                property: 'trx_pengadaan.tgl_trx',
                value: Ext.Date.format(tgl1 === null ? new Date() : tgl1, 'Y-m-d 00:00:00') + 'GT'
            });
            filterCollection.push(statusFilter);

            var statusFilter = new Ext.util.Filter({
                property: 'trx_pengadaan.tgl_trx',
                value: Ext.Date.format(tgl2 === null ? new Date() : tgl2, 'Y-m-d 23:59:59') + 'LT'
            });
            filterCollection.push(statusFilter);

            var statusFilter = new Ext.util.Filter({
                property: 'trx_pengadaan.cabang_id',
                value: cabang
            });
            filterCollection.push(statusFilter);

            grid1.getSelectionModel().clearSelections();

            store.clearFilter(true);
            store.filter(filterCollection);
            store.group('no_pengadaan');
        } else {
            Ext.Msg.alert('Warning', 'Pilih Cabang terlebih dahulu');
        }
    },
    reloadListPeng: function(btn) {
        var panel = this.getPoPanel(),
                cabang = panel.down('#poCabang').getValue(),
                grid1 = this.getPoPengGrid(),
                store = grid1.getStore();

        if (cabang !== null) {
            store.load();
        }
    },
    showSatuan: function(btn) {
        var win = Ext.widget('gdmsbarang.msbarangsatuanwin');
    }
});

/* End of file Base.js */
/* Location: ./assets/js/app/controller/Base.js */