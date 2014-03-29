/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.kshitungbon.KsHitungBonGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.kshitungbon.kshitungbongrid',
    itemId: 'kshitungbongrid',
    autoScroll: true,
    title: 'DAFTAR KAS BON',
    forceFit: true,
    ui: 'green-panel',
//    store: 'TrxKasStore',
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
                emptyText: 'Tidak ada data Kas Bon',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'tbtext',
                    text: '<strong>Filter :</strong>'
                },
                {
                    xtype: 'datefield',
                    width: 130,
                    fieldLabel: 'Tgl. Awal',
                    emptyText: 'Tgl Awal',
                    hideLabel: true,
                    name: 'dateStart',
                    itemId: 'dateStartKk',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d'
                },
                {
                    xtype: 'tbtext',
                    text: '<small>s/d</small>'
                },
                {
                    xtype: 'datefield',
                    width: 130,
                    fieldLabel: 'Tgl. Akhir',
                    emptyText: 'Tgl Akhir',
                    hideLabel: true,
                    name: 'dateEnd',
                    itemId: 'dateEndKk',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d'
                },
                {
                    xtype: 'button',
                    cls: 'searchBtn',
                    iconCls: 'icon-btn-search',
//                    action: 'kkSearch'
                },
                '->',
                {
                    xtype: 'button',
                    iconCls: 'icon-btn-refresh',
//                    action: 'kkRefresh'
                },
                {
                    xtype: 'button',
                    iconCls: 'icon-btn-print',
//                    action: 'kkPrint'
                },
                {
                    xtype: 'button',
                    iconCls: 'icon-btn-clear',
//                    action: 'kkToday'
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    flex: 0.175,
                    text: 'NO. TRANS',
                    dataIndex: 'idTrans'
                },
                {
                    xtype: 'datecolumn',
                    flex: 0.190,
                    text: 'TGL. TRANS',
                    dataIndex: 'tglTransaksi',
                    renderer: Ext.util.Format.dateRenderer('d/M/Y')
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.57,
                    text: 'NAMA PEGAWAI',
                    dataIndex: 'pegNameNama'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.5,
                    hidden: true,
                    text: 'KETERANGAN',
                    dataIndex: 'keterangan',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        return '<span style="font-weight:bold;font-size:12px"> Total</span>';
                    }
                },
                {
                    flex: 0.2,
                    align: 'right',
                    header: 'JUMLAH',
                    dataIndex: 'jumlahTrx',
                    summaryType: 'sum',
                    renderer: function (value, meta, record) {
                        return Ext.util.Format.number(value, '0.000,00/i');
                    },
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        return '<span style="font-weight:bold;font-size:12px">' + Ext.util.Format.number(value, '0.000,00/i') + '</span>';
                    }
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.095,
                    align: 'center',
                    dataIndex: 'symbol'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.2,
                    hidden: true,
                    text: 'USER BUAT',
                    dataIndex: 'userBuat',
                    renderer: 'uppercase'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */