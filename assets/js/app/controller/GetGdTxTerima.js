/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.GetGdTxTerima', {
    extend: 'GlApp.controller.Base',
    models: [
    ],
    stores: [
        'gdtxterima.SupplierStore',
        'gdtxterima.PoDetailStore'
    ],
    views: [
        'gdtxterima.GetGdTxTerima',
        'gdtxterima.TxTtForm',
        'gdtxterima.TxTtGrid',
        'gdtxterima.TxTtGridDt',
        'gdtxterima.TxTtListGrid',
        'gdtxterima.TxTtSignWin',
        'gdtxterima.TxTtLotWin'
    ],
    refs: [
        {ref: 'PanelTerima', selector: '#newttpanel'},
        {ref: 'TtPoGrid', selector: '#txttgrid'}
    ],
    init: function() {
        this.listen({
            controller: {
            },
            component: {
                '#newttpanel button[action=searchTt]': {
                    click: this.showListPo
                }
            },
            global: {
            },
            store: {
            }
        });
    },
    showListPo: function(btn) {
        var panel = this.getPanelTerima(),
                tgl1 = panel.down('#ttTgl1').getValue(),
                tgl2 = panel.down('#ttTgl2').getValue(),
                supplier = panel.down('#ttSupplier').getValue(),
                grid1 = this.getTtPoGrid(),
                store = grid1.getStore(),
                filterCollection = [];
        if (supplier !== null) {
//            var statusFilter = new Ext.util.Filter({
//                property: 'trx_po.trx_date',
//                value: Ext.Date.format(tgl1 === null ? new Date() : tgl1, 'Y-m-d 00:00:00') + 'GT'
//            });
//            filterCollection.push(statusFilter);
//            var statusFilter = new Ext.util.Filter({
//                property: 'trx_po.trx_date',
//                value: Ext.Date.format(tgl2 === null ? new Date() : tgl2, 'Y-m-d 23:59:59') + 'LT'
//            });
//            filterCollection.push(statusFilter);
            var statusFilter = new Ext.util.Filter({
                property: 'po_supp_id',
                value: supplier
            });
            filterCollection.push(statusFilter);

            grid1.getSelectionModel().clearSelections();
            store.clearFilter(true);
            store.filter(filterCollection);
            store.group('po_no');
        } else {
            Ext.Msg.alert('Warning', 'Pilih Supplier terlebih dahulu');
        }
    }
});

/* End of file Base.js */
/* Location: ./assets/js/app/controller/Base.js */