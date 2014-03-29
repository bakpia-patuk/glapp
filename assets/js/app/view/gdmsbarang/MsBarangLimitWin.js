/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdmsbarang.MsBarangLimitWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.gdmsbarang.msbaranglimitwin',
    itemId: 'msbaranglimitwin',
    title: 'STOCK MIN MAX',
    width: 335,
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
                    xtype: 'form',
                    bodyPadding: 10,
                    fieldDefaults: {
                        width: 300,
                        labelAlign: 'right',
                        labelWidth: 110,
                        msgTarget: 'side'
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Id Barang ',
                            name: 'id',
                            hidden: false
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Cabang ',
                            name: 'cabang_id',
                            hidden: false
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Stock Min ',
                            name: 'stock_min',
                            hidden: false
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Stock Max ',
                            name: 'stock_min',
                            hidden: false
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Save',
                    action: 'satuanSave'
                },
                {
                    text: 'Cancel',
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