Ext.define('GlApp.view.kskeluar.ListMintaBayar', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.kskeluar.listmintabayar',
    itemId: 'listmintabayar',
    title: 'DATA PERMINTAAN',
    border: false,
    forceFit: true,
    columnLines: true,
    flex: 1,
//    store: 'MintaBayarStore',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                // /autoScroll: true,
                emptyText: 'Tidak ada daftar Permintaan Bayar',
                deferEmptyText: false
            },
            tbar: [
                '->',
                {
                    iconCls: 'icon-btn-refresh',
//                    handler: function () {
//                        this.up('grid').getStore().load();
//                    }
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'datecolumn',
                    flex: 0.18,
                    text: 'TGL. TRANS',
                    dataIndex: 'tglTrx',
                    renderer: Ext.util.Format.dateRenderer('d/M/Y')
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.25,
                    text: 'NAMA PENERIMA',
                    dataIndex: 'namaPenerima',
                    renderer: 'uppercase'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.6,
                    text: 'KEPERLUAN',
                    dataIndex: 'keterangan'
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.3,
                    text: 'JUMLAH',
                    align: 'right',
                    dataIndex: 'trxValue',
                    renderer: function (value, meta, record) {
                        return Ext.util.Format.number(value, '0.000,00/i');
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});