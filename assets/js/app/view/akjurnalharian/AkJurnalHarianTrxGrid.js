/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.akjurnalharian.AkJurnalHarianTrxGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.akjurnalharian.akjurnalhariantrxgrid',
    itemId: 'akjurnalhariantrxgrid',
    autoScroll: true,
    title: 'DAFTAR TRANSAKSI HARIAN',
    forceFit: true,
    ui: 'blue-panel',
//    store: 'TrxAllStore',
    columnLines: true,
    flex: 1,
    border: false,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Transaksi Harian',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'tbtext',
                    text: '<strong>Cari dengan tanggal :&nbsp;&nbsp;&nbsp;</strong>'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tgl. Awal',
                    emptyText: 'Tgl Awal',
                    hideLabel: true,
                    name: 'dateStart',
                    itemId: 'dateStartTrxH',
                    format: 'd-M-Y',
                    submitFormat: 'Y-m-d'
                },
                {
                    xtype: 'tbtext',
                    text: '<small>&nbsp;&nbsp;s/d&nbsp;&nbsp;</small>'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tgl. Akhir',
                    emptyText: 'Tgl Akhir',
                    hideLabel: true,
                    name: 'dateEnd',
                    itemId: 'dateEndTrxH',
                    format: 'd-M-Y',
                    submitFormat: 'Y-m-d'
                },
                {
                    xtype: 'tbtext',
                    text: '&nbsp;'
                },
                {
                    xtype: 'button',
                    text: '',
                    cls: 'searchBtn',
                    iconCls: 'btn-search',
                    action: 'trxHSearch'
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Refresh',
                    iconCls: 'btn-refresh',
//                    action: 'trxHRefresh'
                },
                '-',
                {
                    xtype: 'button',
                    text: 'Hari ini',
                    iconCls: '',
//                    action: 'trxHToday'
                },
                '-',
                {
                    xtype: 'button',
                    text: 'Detail Trans.',
                    iconCls: '',
//                    action: 'trxDetail',
                    itemId: 'trxdetail',
                    disabled: true
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'datecolumn',
                    width: 100,
                    text: 'TGL.',
                    dataIndex: 'tglTransaksi',
                    renderer: Ext.util.Format.dateRenderer('d-M-Y')
                },
                {
                    xtype: 'gridcolumn',
                    width: 75,
                    text: 'NO. REF.',
                    dataIndex: 'no_refTrx'
                },
                {
                    xtype: 'gridcolumn',
                    width: 300,
                    text: 'URAIAN',
                    dataIndex: 'keterangan'
                }/*,
                 {
                 xtype: 'gridcolumn',
                 width: 100,
                 text: 'Jenis Trans',
                 dataIndex: 'jenis_trx'
                 }*/,
                {
                    width: 100,
                    header: 'JUMLAH',
                    dataIndex: 'jumlahTrx',
                    renderer: function (value, meta, record) {
                        return Ext.util.Format.number(value, '0.000,00/i');
                    },
                    align: 'right'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'MATA UANG',
                    dataIndex: 'symbol'
                }
            ]
        });

        me.callParent(arguments);
    },
    listeners: {
        afterRender: function () {
        }
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */