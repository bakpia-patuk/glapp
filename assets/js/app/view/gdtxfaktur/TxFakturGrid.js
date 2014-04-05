/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxfaktur.TxFakturGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxfaktur.txfakturgrid',
    itemId: 'txfakturgrid',
    border: false,
    store: 'gdtxfaktur.TtStore',
    autoScroll: true,
    forceFit: false,
    columnLines: true,
    selModel: Ext.create('Ext.selection.CheckboxModel', {
        //header: false,
        //selectOnly: true
    }),

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Terima Barang',
                deferEmptyText: false
            },
            tbar: [
                // {
                //     xtype: 'datefield',
                //     fieldLabel: 'Filter ',
                //     labelWidth: 40,
                //     labelAlign: 'right',
                //     emptyText: 'Tgl. Awal',
                //     displayField: 'type',
                //     valueField: 'typeCode',
                //     queryMode: 'local',
                //     forceSelection: true,
                //     typeAhead: true,
                //     valueNotFoundText: 'Tidak ada Data'
                // },
                // {
                //     xtype: 'datefield',
                //     fieldLabel: ' s.d ',
                //     labelWidth: 30,
                //     labelAlign: 'right',
                //     emptyText: 'Tgl. Akhir',
                //     displayField: 'type',
                //     valueField: 'typeCode',
                //     queryMode: 'local',
                //     forceSelection: true,
                //     typeAhead: true,
                //     valueNotFoundText: 'Tidak ada Data'
                // },
                // {
                //     xtype: 'combobox',
                //     emptyText: 'Supplier',
                //     allowBlank: false
                // },
                // {
                //     text: 'SEARCH'
                // },
                // '->',
                // {
                //     text: 'REFRESH'
                // }
            ],
            
            columns: [
                {
                    xtype: 'datecolumn',
                    flex: 0.35,
                    text: 'TGL. TRANSAKSI',
                    dataIndex: 'tt_tgltrx',
                    renderer: function (value, meta, record) {
                        var status = record.get('ttFakturStatus');
                        if (status !== 0) {
                            return Ext.util.Format.date(value, 'd/M/Y');
                        } else {
                            return '<span style="color:red;">' + Ext.util.Format.date(value, 'd/M/Y') + '</span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.5,
                    text: 'NO TT',
                    dataIndex: 'tt_no',
                    renderer: function (value, meta, record) {
                        var status = record.get('ttFakturStatus');
                        if (status !== 0) {
                            return value;
                        } else {
                            return '<span style="color:red;">' + value + '</span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.5,
                    text: 'KETERANGAN',
                    dataIndex: 'tt_desc',
                    renderer: function (value, meta, record) {
                        var status = record.get('tt_fkstatus');
                        if (status !== 0) {
                            return value;
                        } else {
                            return '<span style="color:red;">' + value + '</span>';
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */