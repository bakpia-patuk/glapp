/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxpengadaan.TxPengadaanGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxpengadaan.txpengadaangrid',
    itemId: 'txpengadaangrid',
    border: false,
    store: 'gdtxpengadaan.PengStore',
    autoScroll: true,
    forceFit: true,
    columnLines: true,
    plugins: 'bufferedrenderer',
    selModel: Ext.create('Ext.selection.CheckboxModel', {
    }),
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Pengadaan',
                deferEmptyText: false,
                stripeRows: false,
                trackOver: false,
                getRowClass: function(record, rowIndex, rowParams, store) {
                    return record.get('peng_class_row');
                }
            },
            bbar: [
                {
                    xtype:'tbtext',
                    text: '<b>LEGEND : </b>'
                },
                '->',
                {
                    text: '&nbsp;'
                }
            ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'NO PENGADAAN',
                    dataIndex: 'no_pengadaan'
                },
                {
                    xtype: 'datecolumn',
                    width: 100,
                    text: 'TGL. PENGADAAN',
                    dataIndex: 'tgl_trx',
                    format: 'd/M/Y'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'CABANG',
                    dataIndex: 'cabang_name'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'DIVISI',
                    dataIndex: 'divisi_name'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */