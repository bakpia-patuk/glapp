Ext.define('GlApp.view.kskeluar.ListMintaBayar', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.kskeluar.listmintabayar',
    itemId: 'listmintabayar',
    title: 'DATA PERMINTAAN',
    border: false,
    forceFit: true,
    columnLines: true,
    flex: 1,
    store: 'kskeluar.MintaKasStore',
    initComponent: function() {
        var me = this,
                grid = me;

        Ext.applyIf(me, {
            viewConfig: {
                // /autoScroll: true,
                emptyText: 'Tidak ada daftar Permintaan Bayar',
                deferEmptyText: false
            },
            tbar: [
                '->',
                {
                    text: 'REFRESH',
                    ui: 'green-button',
                    handler: function() {
                        grid.getStore().load();
                    }
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'datecolumn',
                    flex: 0.18,
                    text: 'TGL. TRANS',
                    dataIndex: 'tgl_trx',
                    renderer: Ext.util.Format.dateRenderer('d/M/Y')
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.25,
                    text: 'NAMA PENERIMA',
                    dataIndex: 'trx_penerima',
                    renderer: 'uppercase'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.6,
                    text: 'KEPERLUAN',
                    dataIndex: 'trx_desc'
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.3,
                    text: 'JUMLAH',
                    align: 'right',
                    dataIndex: 'trx_value',
                    renderer: function(value, meta, record) {
                        return Ext.util.Format.number(value, '0,000.00/i');
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});