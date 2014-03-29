Ext.define('eTrav.view.dvtxpengadaan.DvTxDetailPengadaanGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dvtxpengadaan.dvtxdetailpengadaangrid',
    border: false,
    forceFit: false,
    columnLines: true,
    itemId: 'dvtxdetailpengadaangrid',
    //selModel : smGrid,
    //flex: 1,
//    store: 'PengadaanDetailStore',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                // /autoScroll: true,
                emptyText: 'Tidak ada daftar Akun',
                deferEmptyText: false
            },
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    width: 300,
                    text: 'NAMA BARANG',
                    dataIndex: 'barangName',
                    renderer: function (value, meta, record) {
                        var status = record.get('poStatus');
                        if (status == 1) {
                            return '<span style="color:#ffe900;">' + value + '</span>';
                        } else if (status == 2) {
                            return '<span style="color:#5ac403;">' + value + '</span>';
                        } else {
                            return '<span style="color:#ff0000;">' + value + '</span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'UNTUK TGL.',
                    dataIndex: 'tglKebutuhan',
                    renderer: function (value, meta, record) {
                        var status = record.get('poStatus');
                        if (status == 1) {
                            return '<span style="color:#ffe900;">' + Ext.util.Format.date(value, 'd/M/Y') + '</span>';
                        } else if (status == 2) {
                            return '<span style="color:#5ac403;">' + Ext.util.Format.date(value, 'd/M/Y') + '</span>';
                        } else {
                            return '<span style="color:#ff0000;">' + Ext.util.Format.date(value, 'd/M/Y') + '</span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'barangMerk',
                    text: 'MERK',
                    renderer: function (value, meta, record) {
                        var status = record.get('poStatus');
                        if (status == 1) {
                            return '<span style="color:#ffe900;">' + value + '</span>';
                        } else if (status == 2) {
                            return '<span style="color:#5ac403;">' + value + '</span>';
                        } else {
                            return '<span style="color:#ff0000;">' + value + '</span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'barangKatalog',
                    text: 'NO KATALOG',
                    renderer: function (value, meta, record) {
                        var status = record.get('poStatus');
                        if (status == 1) {
                            return '<span style="color:#ffe900;">' + value + '</span>';
                        } else if (status == 2) {
                            return '<span style="color:#5ac403;">' + value + '</span>';
                        } else {
                            return '<span style="color:#ff0000;">' + value + '</span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'barangKemasan',
                    text: 'KEMASAN',
                    renderer: function (value, meta, record) {
                        var status = record.get('poStatus');
                        if (status == 1) {
                            return '<span style="color:#ffe900;">' + value + '</span>';
                        } else if (status == 2) {
                            return '<span style="color:#5ac403;">' + value + '</span>';
                        } else {
                            return '<span style="color:#ff0000;">' + value + '</span>';
                        }
                    }
                },
                {
                    xtype: 'numbercolumn',
                    width: 110,
                    dataIndex: 'barangQty',
                    text: 'QTY PESANAN',
                    format: '0000',
                    renderer: function (value, meta, record) {
                        var status = record.get('poStatus');
                        if (status == 1) {
                            return '<span style="color:#ffe900;">' + Ext.util.Format.number(value, '000') + '</span>';
                        } else if (status == 2) {
                            return '<span style="color:#5ac403;">' + Ext.util.Format.number(value, '000') + '</span>';
                        } else {
                            return '<span style="color:#ff0000;">' + Ext.util.Format.number(value, '000') + '</span>';
                        }
                    },
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 250,
                    dataIndex: 'barangDesc',
                    text: 'KETERANGAN',
                    renderer: function (value, meta, record) {
                        var status = record.get('poStatus');
                        if (status == 1) {
                            return '<span style="color:#ffe900;">' + value + '</span>';
                        } else if (status == 2) {
                            return '<span style="color:#5ac403;">' + value + '</span>';
                        } else {
                            return '<span style="color:#ff0000;">' + value + '</span>';
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});