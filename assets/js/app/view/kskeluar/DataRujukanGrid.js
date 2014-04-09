/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.kskeluar.DataRujukanGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.kskeluar.datarujukangrid',
    itemId: 'datarujukangrid',
    autoScroll: true,
    title: 'DATA RUJUKAN',
    forceFit: true,
    store: 'kskeluar.MintaKasRujukanStore',
    columnLines: true,
    flex: 1,
    border: false,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Rujukan',
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
                    flex: 0.17,
                    text: 'TGL RUJUKAN',
                    dataIndex: 'tgl_trx',
                    renderer: Ext.util.Format.dateRenderer('d/M/Y')
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.23,
                    text: 'NAMA PASIEN',
                    dataIndex: 'mkr_namapasien',
                    renderer: 'uppercase'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.6,
                    text: 'NAMA PEMERIKSAAN',
                    dataIndex: 'mkr_pemeriksaan'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */