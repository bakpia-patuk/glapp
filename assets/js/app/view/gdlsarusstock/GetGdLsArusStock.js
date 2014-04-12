/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.gdlsarusstock.GetGdLsArusStock', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.gdlsarusstock.getgdlsarusstock',
    itemId: 'getgdlsarusstock',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'fit',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'grid',
                    border: true,
                    ui: 'orange-panel',
                    title: 'DAFTAR STOCK OPNAME',
                    forceFit: true,
                    columnLines: true,
                    viewConfig: {
                        autoScroll: true,
                        emptyText: 'Tidak ada data Arus Barang',
                        deferEmptyText: false
                    },
                    tbar: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Filter ',
                            labelWidth: 40,
                            labelAlign: 'right',
                            emptyText: 'Tgl. Awal',
                            displayField: 'type',
                            valueField: 'typeCode',
                            queryMode: 'local',
                            forceSelection: true,
                            typeAhead: true,
                            valueNotFoundText: 'Tidak ada Data'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: ' s.d ',
                            labelWidth: 30,
                            labelAlign: 'right',
                            emptyText: 'Tgl. Akhir',
                            displayField: 'type',
                            valueField: 'typeCode',
                            queryMode: 'local',
                            forceSelection: true,
                            typeAhead: true,
                            valueNotFoundText: 'Tidak ada Data'
                        },
                        {
                            xtype: 'combobox',
                            emptyText: 'Cabang',
                            allowBlank: false
                        },
                        {
                            text: 'SEARCH',
                            ui: 'orange-button',
                        },
                        '->',
                        {
                            text: 'CETAK',
                            ui: 'orange-button',
                        },
                        {
                            text: 'REFRESH',
                            ui: 'orange-button',
                        },
                        {
                            text: 'ALL',
                            ui: 'orange-button',
                        }

                    ],
                    columns: [
                        Ext.create('Ext.grid.RowNumberer'),
                        {
                            width: 100,
                            header: 'Tgl. Stock Opname',
                            dataIndex: 'tglTrx',
                            renderer: Ext.util.Format.dateRenderer('d/M/Y')
                        },
                        {
                            width: 150,
                            header: 'No Stock Opname',
                            hidden: false,
                            dataIndex: 'stkRef'
                        },
//                {
//                    width: 400,
//                    header: 'Nama Barang',
//                    hidden: false,
//                    dataIndex: 'stkItemName'
//                },
                        {
                            text: 'Jenis',
                            columns: [
                                {
                                    width: 150,
                                    xtype: 'numbercolumn',
                                    align: 'center',
                                    header: 'Pengurangan',
                                    dataIndex: 'stkQtyOut',
                                    format: '0000'
                                },
                                {
                                    width: 150,
                                    xtype: 'numbercolumn',
                                    align: 'center',
                                    header: 'Penambahan',
                                    dataIndex: 'stkQtyIn',
                                    format: '0000'
                                }
                            ]
                        },
                        {
                            text: 'Stock',
                            columns: [
                                {
                                    width: 75,
                                    xtype: 'numbercolumn',
                                    align: 'center',
                                    header: 'Awal',
                                    dataIndex: 'stkQtyFirst',
                                    format: '0000'
                                },
                                {
                                    width: 75,
                                    xtype: 'numbercolumn',
                                    align: 'center',
                                    header: 'Akhir',
                                    dataIndex: 'stkQtyLast',
                                    format: '0000'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */