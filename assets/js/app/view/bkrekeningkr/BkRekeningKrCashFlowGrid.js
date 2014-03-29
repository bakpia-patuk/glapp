/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.bkrekeningkr.BkRekeningKrCashFlowGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bkrekeningkr.bkrekeningkrcashflowgrid',
    itemId: 'bkrekeningkrcashflowgrid',
    autoScroll: true,
    ui: 'orange-panel',
    title: 'TABEL CASH FLOW BANK',
    forceFit: false,
    //store: 'laporanKasStore',
    columnLines: true,
    flex: 1,
    border: false,
    disableSelection: true,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Cash Flow',
                deferEmptyText: false
            },
            columns: [
                {
                    xtype: 'datecolumn',
                    flex: 0.22,
                    text: 'TGL. TRANSAKSI',
                    dataIndex: 'tglTransaksi',
                    renderer: function (value, meta, record) {
                        var id = record.data.namaAkun;
                        if (id == 'keterangan') {
                            return '';
                        }
                        else {
                            return Ext.util.Format.date(value, 'd/M/Y');
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.7,
                    text: 'KETERANGAN',
                    dataIndex: 'keterangan'
                },
                {
                    flex: 0.2,
                    align: 'right',
                    header: 'DEBET',
                    dataIndex: 'jumlahTrx',
                    summaryType: 'sum',
                    renderer: function (val) {
                        if (val >= 0) {
                            return Ext.util.Format.number(val, '0.000,00/i');
                        } else {
                            return '<span style="color:red;"><i>( ' + Ext.util.Format.number(Math.abs(val), '0.000,00/i') + ' )</i></span>';
                        }
                        return val;
                    },
                    summaryRenderer: function (val, summaryData, dataIndex) {
                        if (val >= 0) {
                            return '<span style="font-weight:bold;font-size:12px">' + Ext.util.Format.number(val, '0.000,00/i') + '</span>';
                        } else {
                            return '<span style="color:red;font-weight:bold;font-size:12px"><i>( ' + Ext.util.Format.number(Math.abs(val), '0.000,00/i') + ' )</i></span>';
                        }
                        return val;
                    }
                },
                {
                    flex: 0.2,
                    align: 'right',
                    header: 'KREDIT',
                    dataIndex: 'jumlahTrx',
                    summaryType: 'sum',
                    renderer: function (val) {
                        if (val >= 0) {
                            return Ext.util.Format.number(val, '0.000,00/i');
                        } else {
                            return '<span style="color:red;"><i>( ' + Ext.util.Format.number(Math.abs(val), '0.000,00/i') + ' )</i></span>';
                        }
                        return val;
                    },
                    summaryRenderer: function (val, summaryData, dataIndex) {
                        if (val >= 0) {
                            return '<span style="font-weight:bold;font-size:12px">' + Ext.util.Format.number(val, '0.000,00/i') + '</span>';
                        } else {
                            return '<span style="color:red;font-weight:bold;font-size:12px"><i>( ' + Ext.util.Format.number(Math.abs(val), '0.000,00/i') + ' )</i></span>';
                        }
                        return val;
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */