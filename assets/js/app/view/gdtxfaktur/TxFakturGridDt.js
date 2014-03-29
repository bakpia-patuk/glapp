/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxfaktur.TxFakturGridDt', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxfaktur.txfakturgriddt',
    itemId: 'txfakturgriddt',
    border: false,
//    store: 'ItemStore',
    autoScroll: true,
    forceFit: true,
    columnLines: true,
    initComponent: function() {
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
                    id: 'tfPoTtGridSum',
                    ftype: 'grouping',
                    groupHeaderTpl: 'No PO : {name}',
                    hideGroupedHeader: false,
                    //remoteRoot: 'summaryData',
                    enableGroupingMenu: true
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    text: 'NAMA BARANG',
                    dataIndex: 'ttBarangName'
                },
                {
                    xtype: 'numbercolumn',
                    width: 90,
                    text: 'QTY PESAN',
                    align: 'center',
                    format: '0',
                    dataIndex: 'ttQtyPesan'
                },
                {
                    xtype: 'numbercolumn',
                    width: 100,
                    align: 'center',
                    format: '0',
                    text: 'QTY TERIMA',
                    dataIndex: 'ttQtyKirim'
                },
                {
                    xtype: 'numbercolumn',
                    width: 150,
                    text: 'HARGA',
                    align: 'right',
                    dataIndex: 'ttPrice',
                    format: '0.000,00/i'
                },
                {
                    xtype: 'numbercolumn',
                    width: 60,
                    text: 'DISC',
                    align: 'center',
                    dataIndex: 'ttDisc',
                    format: '0'
                },
                {
                    xtype: 'numbercolumn',
                    width: 60,
                    text: 'PPN',
                    align: 'center',
                    dataIndex: 'ttPpn',
                    format: '0'
                },
                {
                    xtype: 'numbercolumn',
                    width: 150,
                    text: 'NETTO',
                    align: 'right',
                    dataIndex: 'ttItemNetto',
                    format: '0.000,00/i',
                    renderer: function() {
                        return Ext.util.Format.number(0, '0.000,00/i');
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */