/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.akbukubesar.AkBukuBesarDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.akbukubesar.akbukubesardetailgrid',
    itemId: 'bbdetailgrid',
    autoScroll: true,
    forceFit: true,
//    store: 'JurnalBBStore',
    columnLines: true,
    flex: 1,
    border: false,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'tbtext',
                    id: 'bbDetail',
                    text: ''
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Cetak Detail',
                    iconCls: 'btn-print',
                    disabled: true,
//                    action: 'bbPrint'
                },
                '-',
                {
                    xtype: 'button',
                    disabled: true,
                    text: 'Export Excel',
                    iconCls: 'btn-excel',
//                    action: 'bbExport'
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'datecolumn',
                    width: 100,
                    text: 'TGL. JURNAL',
                    dataIndex: 'tglJurnal',
                    renderer: Ext.util.Format.dateRenderer('d/M/Y')
                },
                {
                    xtype: 'gridcolumn',
                    width: 300,
                    text: 'URAIAN',
                    dataIndex: 'keterangan'
                },
                {
                    header: 'DEBET',
                    dataIndex: 'debet',
                    width: 120,
                    align: 'right',
                    renderer: function (value, meta, record) {
                        return Ext.util.Format.number(value, '0.000,00/i');
                    }
                },
                {
                    header: 'KREDIT',
                    dataIndex: 'kredit',
                    width: 120,
                    align: 'right',
                    renderer: function (value, meta, record) {
                        return Ext.util.Format.number(value, '0.000,00/i');
                    }
                },
                {
                    text: 'SALDO',
                    width: 240,
                    columns: [
                        {
                            header: 'DEBET',
                            width: 120,
                            dataIndex: 'saldoDebet',
                            align: 'right',
                            renderer: function (val) {
                                if (val >= 0) {
                                    return Ext.util.Format.number(val, '0.000,00/i');
                                } else {
                                    return '<span style="color:red;"><i>( ' + Ext.util.Format.number(Math.abs(val), '0.000,00/i') + ' )</i></span>';
                                }
                                return val;
                            }
                        },
                        {
                            header: 'KREDIT',
                            width: 120,
                            dataIndex: 'saldoKredit',
                            align: 'right',
                            renderer: function (val) {
                                if (val >= 0) {
                                    return Ext.util.Format.number(val, '0.000,00/i');
                                } else {
                                    return '<span style="color:red;"><i>( ' + Ext.util.Format.number(Math.abs(val), '0.000,00/i') + ' )</i></span>';
                                }
                                return val;
                            }
                        }
                    ]
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