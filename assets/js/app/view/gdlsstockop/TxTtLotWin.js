/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdlsstockop.TxTtLotWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.gdlsstockop.txttlotwin',
    itemId: 'txttlotwin',
    ui: 'orange-window',
    title: 'DATA NOMER LOT',
    width: 700,
    height: 400,
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
                    xtype: 'panel',
                    layout: 'border',
                    border: false,
                    bodyStyle: 'background: #F5AE45',
                    defaults: {
                        border: false,
                        ui: 'blue-panel',
                        split: true
                    },
                    items: [
                        {
                            xtype: 'form',
                            title: 'FORM LOT',
                            region: 'west',
                            width: 275,
                            bodyPadding: 10,
                            itemId: 'formLot',
                            fieldDefaults: {
                                labelAlign: 'right',
                                labelWidth: 90,
                                msgTarget: 'side',
                                width: 250
                            },
                            bbar: [
                                '->',
                                {
                                    xtype: 'button',
                                    ui: 'blue-button',
                                    text: 'Tambah',
                                    iconCls: 'icon-btn-save',
                                    action: 'lotSave'
                                }
                            ],
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Id ',
                                    name: 'id',
                                    readOnly: true,
                                    fieldCls: 'x-item-readonly',
                                    hidden: true
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Type Trx',
                                    name: 'stk_trxreftype',
                                    readOnly: true,
                                    fieldCls: 'x-item-readonly',
                                    value: 'ttgudang',
                                    hidden: true
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Id Ref ',
                                    name: 'stk_trxref',
                                    itemId: 'stk_trxref',
                                    readOnly: true,
                                    fieldCls: 'x-item-readonly',
                                    hidden: true
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Id Barang ',
                                    name: 'stl_barangid',
                                    itemId: 'stl_barangid',
                                    readOnly: true,
                                    fieldCls: 'x-item-readonly',
                                    hidden: true
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama Barang ',
                                    name: 'stl_barangname',
                                    itemId: 'stl_barangname',
                                    readOnly: true,
                                    fieldCls: 'x-item-readonly'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Barcode ',
                                    name: 'stl_barcode',
                                    allowBlank: true
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'No Lot ',
                                    name: 'stl_nolot',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Expired Date ',
                                    name: 'stl_baranged',
                                    format: 'd/M/Y',
                                    submitFormat: 'Y-m-d',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'stl_qty',
                                    width: 150,
                                    fieldLabel: 'Jumlah ',
                                    allowNegative: false,
                                    minValue: 0, //prevents negative numbers
                                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'qty_tt',
                                    itemId: 'qty_tt',
                                    width: 150,
                                    fieldLabel: 'Jumlah Kirim ',
                                    allowNegative: false,
                                    minValue: 0, //prevents negative numbers
                                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    allowBlank: false,
                                    hidden: true
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'qty_tt_old',
                                    itemId: 'qty_tt_old',
                                    width: 150,
                                    fieldLabel: 'Jumlah Old ',
                                    allowNegative: false,
                                    minValue: 0, //prevents negative numbers
                                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    allowBlank: true,
                                    hidden: true
                                }
                            ]
                        },
                        {
                            xtype: 'grid',
                            title: 'DAFTAR LOT',
                            region: 'center',
                            itemId: 'gridLot',
                            forceFit: true,
//                            store: 'gdtxterima.TtLotStore',
                            columns: [
                                Ext.create('Ext.grid.RowNumberer'),
                                {
                                    xtype: 'gridcolumn',
                                    flex: 0.5,
                                    text: 'NO LOT',
                                    dataIndex: 'stl_nolot'
                                },
                                {
                                    xtype: 'datecolumn',
                                    flex: 0.3,
                                    text: 'TGL. EXPIRED',
                                    dataIndex: 'stl_baranged',
                                    format: 'd/M/Y'
                                },
                                {
                                    xtype: 'numbercolumn',
                                    flex: 0.15,
                                    text: 'JUMLAH',
                                    format: '000',
                                    dataIndex: 'stl_qtylast'
                                }
                            ]
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Save',
                    scope: this,
                    handler: this.close
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