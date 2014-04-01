/**
 * @author Isht Ae
 **/
var editorCell = new Ext.grid.plugin.CellEditing({
    clicksToEdit: 2
});


Ext.define('GlApp.view.gdtxpo.TxPoGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxpo.txpogrid',
    itemId: 'txpogrid',
    border: false,
    store: 'gdtxpo.PoPengStore',
    autoScroll: true,
    forceFit: false,
    columnLines: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            plugins: [editorCell],
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Pengadaan',
                deferEmptyText: false,
                stripeRows: false
            },
            features: [
                {
                    startCollapsed: false,
                    id: 'poPengGroup',
                    ftype: 'grouping',
                    groupHeaderTpl: 'No Pengadaan : {name}',
                    hideGroupedHeader: false,
                    enableGroupingMenu: true
                }
            ],
            columns: [
                {
                    xtype: 'checkcolumn',
                    flex: 0.25,
                    align: 'center',
                    dataIndex: 'po_status',
                    itemId: 'setPo'
                },
                {
                    xtype: 'gridcolumn',
                    width: 250,
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
                    width: 50,
                    text: 'QTY',
                    format:'000',
                    align: 'center',
                    dataIndex: 'po_qty',
                    editor: {
                        allowBlank: false,
                        hideTrigger: true
                    }
                },
                {
                    xtype: 'numbercolumn',
                    width: 150,
                    text: 'HARGA',
                    align: 'right',
                    dataIndex: 'po_harga'
                },
                {
                    xtype: 'numbercolumn',
                    width: 50,
                    text: 'DISC (%)',
                    align: 'center',
                    dataIndex: 'po_disc'
                },
                {
                    xtype: 'numbercolumn',
                    width: 50,
                    text: 'PPN (%)',
                    align: 'center',
                    dataIndex: 'po_ppn'
                },
                {
                    xtype: 'numbercolumn',
                    width: 150,
                    text: 'NETTO',
                    align: 'right',
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