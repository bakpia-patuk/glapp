/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.bkmsbank.BkMsBankGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bkmsbank.bkmsbankgrid',
    itemId: 'bkmsbankgrid',
    autoScroll: true,
    title: 'TABEL BANK',
    forceFit: true,
    store: 'bkmsbank.BankStore',
    columnLines: true,
    border: false,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Bank',
                deferEmptyText: false
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 175,
                    text: 'NAMA BANK',
                    dataIndex: 'bankGroupNama'
                },
                {
                    xtype: 'gridcolumn',
                    width: 175,
                    text: 'NAMA ALIAS',
                    dataIndex: 'bank_alias'
                },
                {
                    xtype: 'gridcolumn',
                    width: 145,
                    text: 'ATAS NAMA',
                    dataIndex: 'bank_reknama'
                },
                {
                    xtype: 'gridcolumn',
                    width: 130,
                    text: 'NO REKENING',
                    dataIndex: 'bank_rekno'
                },
                {
                    xtype: 'gridcolumn',
                    width: 175,
                    text: 'ALAMAT',
                    dataIndex: 'bank_alamat'
                }
            ]
        });
        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */