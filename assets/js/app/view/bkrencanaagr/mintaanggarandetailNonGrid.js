/**
 * @author Isht Ae
 **/
Ext.define('eTrav.view.mintaanggaran.mintaanggarandetailNonGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mintaanggarandetailnongrid',
    itemId: 'mintaanggarandetailnongrid',
    autoScroll: true,
    forceFit: false,
    store: 'MintaAnggaranDetailStore',
    columnLines: true,
    flex: 1,
    border: false,
//    selModel: Ext.create('Ext.selection.CheckboxModel', {
//    }),

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data detail',
                deferEmptyText: false
            },
            features: [
                {
                    startCollapsed: false,
                    id: 'dmanfSummary',
                    ftype: 'grouping',
                    groupHeaderTpl: 'Type Bayar {name}',
                    hideGroupedHeader: false,
                    //remoteRoot: 'summaryData',
                    enableGroupingMenu: true
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    text: 'KETERANGAN',
                    flex: 0.5,
                    dataIndex: 'keterangan',
                    hidden: false
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */