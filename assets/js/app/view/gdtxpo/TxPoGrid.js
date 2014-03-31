/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxpo.TxPoGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxpo.txpogrid',
    itemId: 'txpogrid',
    border: false,
    store: 'gdtxpo.PoPengStore',
    autoScroll: true,
    forceFit: false,
    columnLines: true,
    selModel: Ext.create('Ext.selection.CheckboxModel', {
    }),

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Pengadaan',
                deferEmptyText: false
            },
            features: [
                {
                    startCollapsed: false,
                    id: 'poPengGroup',
                    ftype: 'grouping',
                    groupHeaderTpl: 'No Pengadaan : {name}',
                    hideGroupedHeader: false,
                    //remoteRoot: 'summaryData',
                    enableGroupingMenu: true
                }
            ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    text: 'NAMA BARANG',
                    renderer: 'uppercase',
                    dataIndex: 'barang_name'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'MERK',
                    dataIndex: 'po_merk_name'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'NO KATALOG',
                    dataIndex: 'po_katalog'
                },
                {
                    xtype: 'numbercolumn',
                    width: 100,
                    text: 'QTY',
                    dataIndex: 'po_qty'
                },
                {
                    xtype: 'numbercolumn',
                    width: 150,
                    text: 'HARGA',
                    dataIndex: 'po_harga'
                },
                {
                    xtype: 'numbercolumn',
                    width: 100,
                    text: 'DISC (%)',
                    dataIndex: 'po_disc'
                },
                {
                    xtype: 'numbercolumn',
                    width: 100,
                    text: 'PPN (%)',
                    dataIndex: 'po_ppn'
                },
                {
                    xtype: 'numbercolumn',
                    width: 150,
                    text: 'NETTO',
                    dataIndex: 'po_netto'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    text: 'KETERANGAN',
                    dataIndex: 'barang_desc'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */