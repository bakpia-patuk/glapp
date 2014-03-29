/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.dvlsstockop.DvLsStockOpForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.dvlsstockop.dvlsstockopform',
    itemId: 'dvlsstockopform',
    border: false,
    preventHeader: false,
    bodyStyle: FORM_BG,
    bodyPadding: '10 5',
    buttonAlign: 'right',
    fieldDefaults: {
        width: 300,
        labelAlign: 'right',
        labelWidth: 110,
        msgTarget: 'side'
    },
    autoScroll: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    text: 'Simpan',
                    iconCls: 'icon-btn-save',
                    disabled: false,
//                    action: 'soSave'
                },
                {
                    xtype: 'button',
                    text: 'Baru',
                    iconCls: 'icon-btn-add',
                    disabled: false,
//                    action: 'soSave'
                }
            ],
            items: [
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tanggal ',
                    name: 'tglTransaksi',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    value: new Date(),
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Lokasi Barang ',
                    emptyText: 'Ruang Lokasi',
                    displayField: 'ruangName',
                    valueField: 'id',
                    queryMode: 'local',
                    name: 'namaGudang',
//                    store: 'DivisiRuanganStore',
                    hidden: false,
                    readOnly: true,
                    forceSelection: true,
                    typeAhead: true,
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama Barang ',
                    name: 'namaBarang',
                    allowBlank: false,
                    hidden: false,
                    disabled: false,
                    readOnly: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Id Barang ',
                    name: 'idBarang',
                    allowBlank: false,
                    hidden: true,
                    disabled: false,
                    readOnly: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Satuan ',
                    name: 'satDasar',
                    hidden: true,
                    disabled: false,
                    readOnly: true,
                    fieldCls: 'fieldReadOnly'
                },
                {
                    xtype: 'numberfield',
                    name: 'itemqty',
                    fieldLabel: 'Stock Awal ',
                    allowNegative: false,
                    minValue: 0, //prevents negative numbers
                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    allowBlank: false
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Penyesuaian ',
                    width: 300,
                    columns: 1,
                    items: [
                        {
                            boxLabel: 'Penambahan',
                            name: 'penyesuaianst',
                            width: 95,
                            inputValue: 1,
                            checked: true
                        },
                        {
                            boxLabel: 'Pengurangan',
                            width: 95,
                            name: 'penyesuaianst',
                            inputValue: 0,
                            checked: false
                        }
                    ]
                },
                //Field TTD
                {
                    xtype: 'textfield',
                    fieldLabel: 'Jumlah Barang ',
                    name: 'itemTrxqty',
                    allowBlank: false,
//                    listeners: {
//                        change: function() {
//                            if(this.getValue() > 0) {
//                                this.up('form').down('#btnLotDivSo').enable();
//                            } else {
//                                this.up('form').down('#btnLotDivSo').disable();
//                            }
//                            
//                            var val = parseInt(this.getValue()),
//                                type = this.up('form').getForm().findField('penyesuaianst').getGroupValue(),
//                                awal = parseInt(this.up('form').getForm().findField('itemqty').getValue()),
//                                akhir = this.up('form').getForm().findField('oldqty');
//                        
//                            akhir.setValue(type === 1 ? awal + val : awal - val);
//                        }
//                    }
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
                            ui: 'blue-button',
                            itemId: 'btnLotDivSo',
                            text: 'Lihat',
                            margins: '0 0 0 5',
//                            disabled: true,
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
                    fieldLabel: 'User Login ',
                    name: 'username',
                    hidden: true,
//                    value: petugas,
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Current ref ',
                    name: 'refTrx',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'ID ',
                    name: 'soid',
                    hidden: true
                }
            ]
        });

        me.callParent(arguments);
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */
