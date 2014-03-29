/**
 * @author Isht Ae
 **/
Ext.define('eTrav.view.mintaanggaran.mintaanggarandetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mintaanggarandetailgrid',
    itemId: 'mintaanggarandetailgrid',
    autoScroll: true,
    forceFit: true,
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
                emptyText: 'Tidak ada data detail faktur',
                deferEmptyText: false
            },
            features: [
                {
                    startCollapsed: false,
                    id: 'dmafSummary',
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
                    width: 150,
                    text: 'NAMA SUPPLIER',
                    sortable: false,
                    dataIndex: 'supplierName',
                    hidden: true
                },
                {
                    text: 'NO FAKTUR',
                    width: 100,
                    dataIndex: 'fakturNo'
                },
                {
                    text: 'NO PO',
                    width: 100,
                    dataIndex: 'fakturPo'
                },
                {
                    text: 'NO TT',
                    width: 100,
                    dataIndex: 'fakturTt'
                },
                {
                    text: 'NOMINAL',
                    xtype: 'numbercolumn',
                    width: 120,
                    align: 'right',
                    dataIndex: 'fakturValue',
                    format: '0.000,00/i'
                },
                {
                    text: 'JTH TEMPO',
                    xtype: 'datecolumn',
                    width: 100,
                    dataIndex: 'fakturEd',
                    format: 'd/M/Y'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */