/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdtxterima.TxTtLotWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.gdtxterima.txttlotwin',
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
                                    fieldLabel: 'Id Tt ',
                                    name: 'idTt',
                                    readOnly: true,
                                    fieldCls: 'x-item-readonly',
                                    hidden: true
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Id Po ',
                                    name: 'idPo',
                                    readOnly: true,
                                    fieldCls: 'x-item-readonly',
                                    hidden: true
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Id barang ',
                                    name: 'idBarang',
                                    readOnly: true,
                                    fieldCls: 'x-item-readonly',
                                    hidden: true
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama Barang ',
                                    name: 'namaBarang',
                                    readOnly: true,
                                    fieldCls: 'x-item-readonly'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Barcode ',
                                    name: 'noBarcode',
                                    allowBlank: true
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'No Lot ',
                                    name: 'noLot',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Expired Date ',
                                    name: 'tglEd',
                                    format: 'd/M/Y',
                                    submitFormat: 'Y-m-d',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'qtyLot',
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
                                    name: 'qtyTt',
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
                                    name: 'qtyOld',
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
                            forceFit: true,
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    header: 'NO LOT'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    header: 'TGL EXPIRED'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    header: 'QTY'
                                }
                            ]
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