/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxfaktur.TxFakturPrintWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.gdtxfaktur.txfakturprintwin',
    itemId: 'txfakturprintwin',
    title: 'CETAK FAKTUR',
    width: 450,
    height: 250,
    modal: true,
    resizable: false,
    border: false,
    autoScroll: true,
    layout: 'fit',
    autoShow: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'grid',
                    forceFit: true,
                    tbar: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Filter ',
                            labelWidth: 40,
                            width: 200,
                            labelAlign: 'right',
                            emptyText: 'Nama Supplier',
                            displayField: 'type',
                            valueField: 'typeCode',
                            queryMode: 'local',
                            forceSelection: true,
                            typeAhead: true,
                            valueNotFoundText: 'Tidak ada Data'
                        },
                        {
                            text: 'SEARCH'
                        },
                        '->',
                        {
                            text: 'PRINT_FAKTUR'
                        },
                        {
                            text: 'REFRESH'
                        }
                    ],
                    columns: [
                        Ext.create('Ext.grid.RowNumberer'),
                        {
                            xtype: 'gridcolumn',
                            flex: 0.5,
                            header: 'NO FAKTUR'
                        },
                        {
                            xtype: 'numbercolumn',
                            flex: 0.4,
                            header: 'NOMINAL'
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Close',
                    scope: this,
                    handler: this.close
                }
            ]
        });
        me.callParent(arguments);
    }
});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */