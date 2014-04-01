/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.kshitungbon.KsHitungBonDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.kshitungbon.kshitungbondetailgrid',
    itemId: 'kshitungbondetailgrid',
    autoScroll: true,
//    title: 'Daftar Kas Keluar',
    forceFit: true,
    store: 'kshitungbon.DetailKbStore',
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
                emptyText: 'Tidak ada data detail item kasbon',
                deferEmptyText: false
            },
            features: [
                {
                    startCollapsed: false,
                    id: 'dtlKb',
                    ftype: 'groupingsummary',
                    groupHeaderTpl: 'Rincian Kas Bon',
                    hideGroupedHeader: false,
                    //remoteRoot: 'summaryData',
                    enableGroupingMenu: true
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'datecolumn',
                    flex: 0.2,
                    text: 'TGL. TRANS',
                    dataIndex: 'tgl_trx',
                    renderer: function (value, meta, record) {
                        return Ext.util.Format.date(value, 'd/M/Y');
                    }
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.5,
                    text: 'NAMA TRANSAKSI',
                    dataIndex: 'keterangan'
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.2,
                    align: 'right',
                    header: 'JUMLAH',
                    dataIndex: 'jumlah_trx',
                    summaryType: 'sum',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        return '<span style="font-weight:bold;font-size:16px;">' + Ext.util.Format.number(value, '0.000,00/i') + '</span>';
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */