/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.bkrekeningkr.BkRekeningKrGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bkrekeningkr.bkrekeningkrgrid',
    itemId: 'bkrekeningkrgrid',
    autoScroll: true,
    title: 'TABEL REKENING KORAN',
    ui: 'orange-panel',
    forceFit: false,
//    store: 'laporanKasStore',
    columnLines: true,
    flex: 1,
    border: false,
    disableSelection: true,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Rekening Koran',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'datefield',
                    fieldLabel: 'Filter ',
                    labelWidth: 40,
                    emptyText: 'Tgl Awal',
                    name: 'dateStart',
                    itemId: 'dateStartRk',
                    hidden: false,
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 's/d',
                    labelWidth: 25,
                    emptyText: 'Tgl Akhir',
                    hideLabel: false,
                    labelSeparator: '',
                    hidden: false,
                    name: 'dateEnd',
                    itemId: 'dateEndRk',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d'
                },
                {
                    xtype: 'combobox',
                    emptyText: 'Pilih Bank',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    name: 'filterBankName',
                    itemId: 'filterBankName',
                    forceSelection: true,
                    hidden: false,
                    typeAhead: true,
                    allowBlank: false,
                    valueNotFoundText: 'Tidak ada Data',
                    store: new Ext.data.SimpleStore({
                        id: 0,
                        fields: [
                            'typeCode', //numeric value is the key
                            'type' //the text value is the value
                        ],
                        data: [
                            [1, 'Mandiri'],
                            [2, 'BCA'],
                            [3, 'BNI'],
                            [4, 'Permata'],
                            [5, 'BRI']
                        ]
                    }),
                    listeners: {
                        select: function(cmb, rec, opt) {
                        }
                    }
                },
                {
                    xtype: 'button',
                    cls: 'searchBtn',
                    itemId: 'dateBtn',
                    hidden: false,
                    iconCls: 'icon-btn-search',
//                    action: 'lkSearch'
                },
                '->',
                {
                    xtype: 'button',
                    iconCls: 'icon-btn-refresh',
                    tooltip: 'Refresh',
//                    action: 'lkRefresh'
                },
                {
                    xtype: 'button',
                    iconCls: 'icon-btn-clear',
                    tooltip: 'Clear Filter',
//                    action: 'lkToday'
                }
            ],
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