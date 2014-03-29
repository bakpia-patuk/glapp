/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.dvlsstockop.DvLsStockOpLotForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.dvlsstockop.dvlsstockoplotform',
    itemId: 'dvlsstockoplotform',
    title: 'NO LOT',
    width: 335,
    modal: true,
    resizable: false,
    border: false,
    autoScroll: true,
    layout: 'fit',
    autoShow: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
//            bbar: [
//                '->',
//                {
//                    xtype: 'button',
//                    text: 'Tambah',
//                    iconCls: 'icon-btn-save',
////                    action: 'solotSave'
//                }
//            ],
            items:[
                {
                    xtype: 'form',
                    bodyPadding: '10 5',
                    buttonAlign: 'right',
                    fieldDefaults: {
                        width: 270,
                        labelAlign: 'right',
                        labelWidth: 110,
                        msgTarget: 'side'
                    },
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
                            fieldLabel: 'Id Cabang ',
                            name: 'idCabang',
                            readOnly: true,
                            fieldCls: 'x-item-readonly',
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Id Ruang ',
                            name: 'idRuang',
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
                            itemId: 'noBarcode',
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
                            name: 'qtyLotMin',
                            width: 150,
                            fieldLabel: 'Jumlah Kurang ',
                            allowNegative: false,
                            minValue: 0, //prevents negative numbers
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            allowBlank: false,
                            disabled: true,
                            hidden: true
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
                        },
                        {
                            xtype: 'textfield',
                            width: 150,
                            fieldLabel: 'Type Stock ',
                            name: 'typeStock',
                            allowBlank: true,
                            hidden: true
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */