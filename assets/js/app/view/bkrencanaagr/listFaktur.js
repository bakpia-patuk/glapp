Ext.define('eTrav.view.mintaanggaran.listFaktur', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.daftarFaktur',
    border: false,
    forceFit: true,
    columnLines: true,
    //selModel : smGrid,
    flex: 1,
    store: 'FakturStore',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                emptyText: 'Tidak ada data faktur',
                deferEmptyText: false
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    flex: 0.3,
                    text: 'NOMOR FAKTUR',
                    dataIndex: 'trx_fakturno'
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.3,
                    text: 'NILAI',
                    dataIndex: 'trx_value',
                    renderer: function (value, meta, record) {
                        return Ext.util.Format.number(value, '0.000,00/i');
                    }
                },
                {
                    xtype: 'datecolumn',
                    flex: 0.3,
                    text: 'JTH TEMPO',
                    dataIndex: 'trx_ed',
                    renderer: Ext.util.Format.dateRenderer('d/M/Y')
                },
                {
                    xtype: 'checkcolumn',
                    flex: 0.1,
                    align: 'center',
                    dataIndex: 'checked',
                    listeners: {
                        checkchange: function (column, recordIndex, checked) {
                            var grid = this.up('grid'),
                                noFak = grid.getStore().getAt(recordIndex).get('trx_fakturno'),
                                valueFak = grid.getStore().getAt(recordIndex).get('trx_value'),
                                idFak = grid.getStore().getAt(recordIndex).get('id');

                            var fakField = Ext.getCmp('maFakNo'),
                                fakTotal = Ext.getCmp('maFakTotal'),
                                fakId = Ext.getCmp('maFakId');

                            if (checked === true) {
                                fakId.setValue(fakId.getValue() + idFak + ';');
                                fakField.setValue(fakField.getValue() + noFak + ';');
                                fakTotal.setValue(fakTotal.getValue() + valueFak);
                            } else {
                                fakId.setValue(fakId.getValue().replace(idFak + ';', ''));
                                fakField.setValue(fakField.getValue().replace(noFak + ';', ''));
                                fakTotal.setValue(fakTotal.getValue() - valueFak);
                            }
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});