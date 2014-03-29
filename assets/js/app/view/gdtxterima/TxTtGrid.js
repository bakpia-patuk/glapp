/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxterima.TxTtGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdtxterima.txttgrid',
    itemId: 'txttgrid',
    border: false,
//    store: 'ItemStore',
    autoScroll: true,
    forceFit: false,
    columnLines: true,
    selModel: Ext.create('Ext.selection.CheckboxModel', {
    }),

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Pengadaan',
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
                    emptyText: 'Supplier',
                    allowBlank: false
                },
                {
                    text: 'SEARCH'
                },
                '->',
                {
                    text: 'REFRESH'
                }
            ],
            features: [
                {
                    startCollapsed: false,
                    id: 'poPengGroup',
                    ftype: 'grouping',
                    groupHeaderTpl: 'No Pengadaan : {name}',
                    hideGroupedHeader: false,
                    //remoteRoot: 'summaryData',
                    enableGroupingMenu: true
                }
            ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 300,
                    text: 'NAMA BARANG',
                    dataIndex: 'ttBarangName',
                    renderer: function (value, meta, record) {
                        var status = record.get('SimpanStatus');
                        if (status !== 0) {
                            return value;
                        } else {
                            return '<span style="color:red;">' + value + '</span>';
                        }
                    }
                },
                {
                    xtype: 'numbercolumn',
                    width: 100,
                    align: 'center',
                    text: 'QTY PESAN',
                    format: '000',
                    dataIndex: 'ttBarangPo',
                    renderer: function (value, meta, record) {
                        var status = record.get('SimpanStatus');
                        if (status !== 0) {
                            return value;
                        } else {
                            return '<span style="color:red;">' + value + '</span>';
                        }
                    }
                },
                {
                    xtype: 'numbercolumn',
                    width: 110,
                    align: 'center',
                    text: 'QTY DITERIMA',
                    format: '000',
                    dataIndex: 'ttBarangTerima',
                    renderer: function (value, meta, record) {
                        var status = record.get('SimpanStatus');
                        if (status !== 0) {
                            return value;
                        } else {
                            return '<span style="color:red;">' + value + '</span>';
                        }
                    },
                    editor: {
                        xtype: 'numberfield',
                        hideTrigger: true,
                        allowBlank: false
                    }
                },
                {
                    xtype: 'numbercolumn',
                    width: 110,
                    align: 'center',
                    text: 'QTY TERKIRIM',
                    format: '000',
                    dataIndex: 'ttBarangKirim',
                    renderer: function (value, meta, record) {
                        var status = record.get('SimpanStatus');
                        if (status !== 0) {
                            return value;
                        } else {
                            return '<span style="color:red;">' + value + '</span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'MERK',
                    dataIndex: 'ttBarangMerk',
                    renderer: function (value, meta, record) {
                        var status = record.get('SimpanStatus');
                        if (value === 0) {
                            if(status !== 0) {
                                return '-';
                            } else {
                                return '<span style="color:red;">-</span>';
                            }
                        } else {
                            if(status !== 0) {
                                return value;
                            } else {
                                return '<span style="color:red;">' + value + '</span>';
                            }
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    text: 'KATALOG',
                    dataIndex: 'ttBarangKatalog',
                    renderer: function (value, meta, record) {
                        var status = record.get('SimpanStatus');
                        if (value === 0) {
                            if(status !== 0) {
                                return '-';
                            } else {
                                return '<span style="color:red;">-</span>';
                            }
                        } else {
                            if(status !== 0) {
                                return value;
                            } else {
                                return '<span style="color:red;">' + value + '</span>';
                            }
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