Ext.define('GlApp.view.kskeluar.ListFaktur', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.kskeluar.listfaktur',
    itemId: 'listfaktur',
    title: 'DATA FAKTUR',
    border: false,
    forceFit: true,
    columnLines: true,
    flex: 1,
    store: 'kskeluar.FakturStore',
    //selModel: Ext.create('Ext.selection.CheckboxModel', {
    //}),

    initComponent: function () {
        var me = this;
        var grid = me;

        Ext.applyIf(me, {
            viewConfig: {
                emptyText: 'Tidak ada data faktur',
                deferEmptyText: false
            },
            tbar: [
                '->',
                {
                    xtype: 'combobox',
                    emptyText: 'Supplier',
                    width: 180,
                    itemId: 'ttSupplier',
                    triggerAction: 'all',
                    hideTrigger: false,
                    mode: 'remote',
                    minChars: 2,
                    store: 'kskeluar.MasterSupplierStore',
                    displayField: 'ms_name',
                    valueField: 'id'
                },
                {
                    text: 'SEARCH',
                    ui: 'green-button',
                    action: 'searchTt',
                    itemId: 'searchTt',
                    handler: function() {
                            var store = grid.getStore(),
                            cmb = grid.down('#ttSupplier').getValue();
                        if( cmb != null) {

                            store.clearFilter(true);
                            store.filter('faktur_suppid', cmb);
                        }
                    }
                },
                '-',
                {
                    text: 'REFRESH',
                    ui: 'green-button',
                    action: 'refreshTt',
                    handler: function() {
                        if(grid.down('#ttSupplier').getValue() != null) {
                            grid.getStore().load();
                        }
                    }
                }
            ],
            columns: [
                {
                    xtype: 'checkcolumn',
                    flex: 0.05,
                    align: 'center',
                    text: '',
                    dataIndex: 'checked',
                    itemId: 'fakturCheck'
                    // listeners: {
                    //     checkchange: function (column, recordIndex, checked) {
                    //         var grid = this.up('grid'),
                    //             noFak = grid.getStore().getAt(recordIndex).get('id'),
                    //             valueFak = grid.getStore().getAt(recordIndex).get('faktur_nototal');

                    //         var fakField = Ext.getCmp('kkFakNo'),
                    //             fakTotal = Ext.getCmp('kkFakTotal'),
                    //             fakTotal = Ext.getCmp('kkFakTotal');

                    //         if (checked === true) {
                    //             fakField.setValue(fakField.getValue() + noFak + ';');
                    //             fakTotal.setValue(fakTotal.getValue() + valueFak);
                    //         } else {
                    //             fakField.setValue(fakField.getValue().replace(noFak + ';', ''));
                    //             fakTotal.setValue(fakTotal.getValue() - valueFak);
                    //         }
                    //     }
                    // }
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.6,
                    text: 'NOMOR FAKTUR',
                    dataIndex: 'faktur_no'
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.2,
                    align: 'right',
                    text: 'NILAI',
                    dataIndex: 'faktur_nototal',
                    renderer: function (value, meta, record) {
                        return Ext.util.Format.number(value, '0,000.00/i');
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});