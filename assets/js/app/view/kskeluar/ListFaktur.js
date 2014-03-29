Ext.define('GlApp.view.kskeluar.ListFaktur', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.kskeluar.listfaktur',
    itemId: 'listfaktur',
    title: 'DATA FAKTUR',
    border: false,
    forceFit: true,
    columnLines: true,
    flex: 1,
//    store: 'FakturStore',
    //selModel: Ext.create('Ext.selection.CheckboxModel', {
    //}),

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                emptyText: 'Tidak ada data faktur',
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
                {
                    xtype: 'checkcolumn',
                    flex: 0.05,
                    align: 'center',
                    text: '',
                    dataIndex: 'checked',
//                    listeners: {
//                        checkchange: function (column, recordIndex, checked) {
//                            var grid = this.up('grid'),
//                                noFak = grid.getStore().getAt(recordIndex).get('id'),
//                                valueFak = grid.getStore().getAt(recordIndex).get('fktTotal');
//
//                            var fakField = Ext.getCmp('kkFakNo'),
//                                fakTotal = Ext.getCmp('kkFakTotal');
//
//                            if (checked === true) {
//                                fakField.setValue(fakField.getValue() + noFak + ';');
//                                fakTotal.setValue(fakTotal.getValue() + valueFak);
//                            } else {
//                                fakField.setValue(fakField.getValue().replace(noFak + ';', ''));
//                                fakTotal.setValue(fakTotal.getValue() - valueFak);
//                            }
//                        }
//                    }
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.6,
                    text: 'NOMOR FAKTUR',
                    dataIndex: 'fktNo'
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.3,
                    align: 'right',
                    text: 'NILAI',
                    dataIndex: 'fktTotal',
                    renderer: function (value, meta, record) {
                        return Ext.util.Format.number(value, '0.000,00/i');
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});