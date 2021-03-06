/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdlsstockop.StockOpForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.gdlsstockop.stockopform',
    itemId: 'stockopform',
    border: false,
    bodyStyle: FORM_BG,
    bodyPadding: 10,
    buttonAlign: 'right',
    fieldDefaults: {
        width: 300,
        labelAlign: 'right',
        labelWidth: 110,
        msgTarget: 'side'
    },
    autoScroll: true,
    initComponent: function() {
        var me = this;

        var form = me;

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    disabled: false,
                    text: 'ADD_NEW',
                    ui: 'orange-button',
                    iconCls: 'icon-btn-add',
                    action: 'stockNew'
                },
                {
                    xtype: 'button',
                    text: 'SIMPAN',
                    ui: 'orange-button',
                    iconCls: 'icon-btn-save',
                    action: 'stockSave'
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Id So ',
                    name: 'id_trx',
                    allowBlank: true,
                    hidden: true,
                    disabled: false,
                    readOnly: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Type Trx',
                    name: 'stk_trxreftype',
                    readOnly: true,
                    fieldCls: 'x-item-readonly',
                    value: 'opnamegudang',
                    hidden: false
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tanggal ',
                    name: 'stk_date',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    value: new Date(),
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama Barang ',
                    name: 'mi_name',
                    itemId: 'mi_name',
                    allowBlank: false,
                    hidden: false,
                    readOnly: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Kode Item ',
                    name: 'id',
                    itemId: 'id_item',
                    hidden: false,
                    disabled: false,
                    readOnly: true,
                    fieldCls: 'fieldReadOnly'
                },
                {
                    xtype: 'numberfield',
                    name: 'stock_last',
                    fieldLabel: 'Stock Awal ',
                    allowNegative: false,
                    minValue: 0, //prevents negative numbers
                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    readOnly: true,
                    allowBlank: true
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Penyesuaian ',
                    width: 300,
                    columns: 1,
                    items: [
                        {
                            boxLabel: 'Penambahan',
                            name: 'stk_trxtype',
                            width: 95,
                            inputValue: 1,
                            checked: true
                        },
                        {
                            boxLabel: 'Pengurangan',
                            width: 95,
                            name: 'stk_trxtype',
                            inputValue: 0,
                            checked: false
                        }
                    ]
                },
                //Field TTD
                {
                    xtype: 'textfield',
                    fieldLabel: 'Jumlah Barang ',
                    name: 'stk_qty',
                    itemId: 'stk_qty',
                    allowBlank: false,
                    listeners: {
                        change: function() {
                            var val = parseInt(this.getValue()),
                                    type = this.up('form').getForm().findField('stk_trxtype').getGroupValue(),
                                    awal = parseInt(this.up('form').getForm().findField('stock_last').getValue()),
                                    akhir = this.up('form').getForm().findField('oldqty');

                            var lastVal = type === 1 ? awal + val : awal - val;
                            akhir.setValue(lastVal);

                            if (this.getValue() > 0 && lastVal > 0) {
                                this.up('form').down('#btnLostSo').enable();
                            } else {
                                this.up('form').down('#btnLostSo').disable();
                            }
                        }
                    }
                },
                {
                    xtype: 'fieldcontainer',
                    width: 300,
                    layout: 'hbox',
                    itemId: 'SoLotTambah',
                    items: [
                        {
                            html: 'Tambah No LOT :',
                            border: false,
                            width: 110,
                            bodyStyle: FORM_BG,
                            padding: '3 0 0 15',
                            align: 'right'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'icon-btn-search',
                            ui: 'orange-button',
                            itemId: 'btnLostSo',
                            text: 'Lihat',
                            margins: '0 0 0 5',
                            disabled: true,
                            action: 'loadSoLotTambah'
                        }
                    ]
                },
                {
                    xtype: 'numberfield',
                    name: 'oldqty',
                    fieldLabel: 'Jml. Stock Akhir ',
                    allowNegative: false,
                    minValue: 0, //prevents negative numbers
                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    allowBlank: true,
                    readOnly: true,
                    hidden: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'random Key',
                    hidden: false,
                    name: 'random_string',
                    itemId: 'random_string'
                }
            ]
        });
        me.callParent(arguments);
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */