/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdmsbarang.MsBarangForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.gdmsbarang.msbarangform',
    itemId: 'msbarangform',
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
        me.addEvents('trigger2click');

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    text: 'Simpan',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-save',
                    action: 'itemSave'
                },
                {
                    xtype: 'button',
                    disabled: false,
                    text: 'Baru',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-add',
                    action: 'itemNew'
                },
                {
                    xtype: 'button',
                    disabled: false,
                    text: 'Hapus',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-delete',
                    action: 'itemDelete'
                },
                '->',
                {
                    text: 'Set Min',
                    action: 'itemLimit'
                }
            ],
            items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Id Barang ',
                    name: 'id',
                    itemId: 'id',
                    value: 0,
                    hidden: true
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Berlaku ',
                    width: 300,
                    margin: '-3 0 0 0',
                    itemId: 'statusAkunBerlaku',
                    items: [
                        {
                            boxLabel: 'Nasional',
                            name: 'is_nasional',
                            width: 100,
                            inputValue: 0,
                            checked: true,
                            listeners: {
                                change: function(rb, nv, ov, options) {
                                    if (nv) {
                                        form.down('#is_cabang').hide();
                                        form.down('#is_cabang').disable();
                                    }
                                }
                            }
                        },
                        {
                            boxLabel: 'Cabang',
                            name: 'is_nasional',
                            width: 60,
                            inputValue: 1,
                            listeners: {
                                change: function(rb, nv, ov, options) {
                                    if (nv) {
                                        form.down('#is_cabang').show();
                                        form.down('#is_cabang').enable();
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    itemId: 'is_cabang',
                    hidden: true,
                    items: [
                        {
                            xtype: 'label',
                            text: 'Set Cabang : ',
                            padding: '0 0 0 43',
                            width: 110
                        },
                        {
                            xtype: 'button',
//                          iconCls: 'icon-edit',
                            disabled: false,
                            ui: 'blue-button',
                            text: 'Setting',
                            tooltip: 'Set Cabang',
                            margins: '0 0 0 5',
                            itemId: 'setCabang'
                        }
                    ]
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Tipe Item ',
                    margin: '-3 0 0 0',
                    width: 300,
                    items: [
                        {
                            boxLabel: 'Golongan',
                            name: 'mi_child_stat',
                            width: 100,
                            inputValue: 0,
                            listeners: {
                                change: function(rb, nv, ov, options) {
                                    if (nv) {
                                        form.down('#mi_name').setFieldLabel('Nama Golongan ');
                                        form.down('#fieldBarang').hide();
                                        form.down('#fieldBarang').disable();
                                    }
                                }
                            }
                        },
                        {
                            boxLabel: 'Barang',
                            name: 'mi_child_stat',
                            width: 90,
                            inputValue: 1,
                            checked: true,
                            listeners: {
                                change: function(rb, nv, ov, options) {
                                    if (nv) {
                                        form.down('#mi_name').setFieldLabel('Nama Barang ');
                                        form.down('#fieldBarang').show();
                                        form.down('#fieldBarang').enable();
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    name: 'mi_name',
                    itemId: 'mi_name',
                    fieldLabel: 'Nama Barang ',
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Jenis Barang ',
                    emptyText: 'Pilih',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    name: 'mi_inv_stat',
                    forceSelection: true,
                    typeAhead: true,
                    valueNotFoundText: 'Tidak ada Data',
                    store: new Ext.data.SimpleStore({
                        id: 0,
                        fields: [
                            'typeCode', //numeric value is the key
                            'type' //the text value is the value
                        ],
                        data: [
                            [1, 'Persediaan'],
                            [2, 'Non Persediaan'],
                            [0, 'Inventaris']
                        ]
                    }),
                    listeners: {
                        'afterrender': function(cmb, e, opt) {
                            cmb.setValue(1);
                        },
                        'change': function(cmb, e, opt) {
                            var combo = form.down('#mi_parent_id'),
                                    store = combo.getStore(),
                                    filterCollection = [];

                            var statusFilter2 = new Ext.util.Filter({
                                property: 'mi_inv_stat',
                                value: cmb.getValue()
                            });
                            filterCollection.push(statusFilter2);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    name: 'mi_parent_id',
                    itemId: 'mi_parent_id',
                    fieldLabel: 'Golongan ',
                    minChars: 2,
                    triggerAction: 'all',
                    store: 'gdmsbarang.GolonganStore',
                    displayField: 'mi_name',
                    valueField: 'id',
                    queryMode: 'remote',
                    allowBlank: false,
                    hidden: false,
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    }
                },
                {
                    xtype: 'fieldcontainer',
                    width: 300,
                    itemId: 'fieldBarang',
                    items: [
                        {
                            xtype: 'comboboxedit',
                            name: 'mi_merk',
                            itemId: 'mi_merk',
                            fieldLabel: 'Merk ',
                            triggerAction: 'all',
                            store: 'gdmsbarang.MerkStore',
                            displayField: 'merk_name',
                            valueField: 'id',
                            matchFieldWidth: false,
                            listConfig: {
                                minWidth: 185
                            },
                            trigger2Cls: 'x-form-new-trigger',
                            onTrigger2Click: function(e) {
                                var win = Ext.widget('gdmsbarang.msbarangmerkwin');
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Katalog ',
                            name: 'mi_katalog',
                            hidden: false
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            itemId: 'kemasan',
                            hidden: false,
                            items: [
                                {
                                    html: 'Kemasan :',
                                    border: false,
                                    width: 110,
                                    bodyStyle: FORM_BG,
                                    padding: '3 0 0 56',
                                    align: 'right'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'icon-btn-edit',
                                    ui: 'blue-button',
                                    text: 'Editor',
                                    margins: '0 0 0 5',
                                    action: 'editorKemasan'
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Kemasan Id ',
                            name: 'mi_kemasan',
                            hidden: true
                        },
                        {
                            xtype: 'radiogroup',
                            fieldLabel: 'No LOT ',
                            margin: '-3 0 0 0',
                            hidden: false,
                            items: [
                                {
                                    boxLabel: 'Ya',
                                    name: 'mi_nolot',
                                    inputValue: 1,
                                    width: 90,
                                    listeners: {
                                        change: function(rb, nv, ov, options) {
                                            if (nv) {
                                            }
                                        }
                                    }
                                },
                                {
                                    boxLabel: 'Tidak',
                                    name: 'mi_nolot',
                                    inputValue: 0,
                                    checked: true,
                                    width: 90,
                                    listeners: {
                                        change: function(rb, nv, ov, options) {
                                            if (nv) {
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Stock Awal ',
                            name: 'mi_stock_init',
                            minValue: 0,
                            value: 0,
                            hideTrigger: true,
                            hidden: true
                        },
                        Ext.create('Ext.ux.form.NumericField', {
                            fieldLabel: 'Harga ',
                            name: 'mi_item_price',
                            decimalPrecision: 2,
                            decimalSeparator: '.',
                            alwaysDisplayDecimals: true,
                            allowNegative: false,
                            minValue: 0, //prevents negative numbers
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            allowBlank: false,
                            value: 0,
                            listeners: {
                                blur: function() {
                                    var disc = this.up('form').getForm().findField('itemDisc').getValue(),
                                            harga = this.getValue(),
                                            total_disc = harga * disc / 100;

                                    this.up('form').getForm().findField('itemNetto').setValue(harga - total_disc);
                                }
                            }
                        }),
                        Ext.create('Ext.ux.form.NumericField', {
                            fieldLabel: 'Discount ',
                            name: 'mi_diskon',
                            decimalPrecision: 2,
                            decimalSeparator: '.',
                            alwaysDisplayDecimals: true,
                            allowNegative: false,
                            minValue: 0, //prevents negative numbers
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            allowBlank: false,
                            value: 0,
                            listeners: {
                                blur: function() {
                                    var harga = this.up('form').getForm().findField('hargaItem').getValue(),
                                            disc = this.getValue(),
                                            total_disc = harga * disc / 100;

                                    this.up('form').getForm().findField('itemNetto').setValue(harga - total_disc);
                                }
                            }
                        }),
                        {
                            xtype: 'radiogroup',
                            fieldLabel: 'PPN ',
                            name: 'ppn',
                            width: 300,
                            margin: '-3 0 0 0',
                            hidden: false,
                            items: [
                                {
                                    boxLabel: 'Ya',
                                    name: 'mi_ppn',
                                    inputValue: 1,
                                    width: 90,
                                    checked: true,
                                    listeners: {
                                        change: function(rb, nv, ov, options) {
                                            if (nv) {
                                            }
                                        }
                                    }
                                },
                                {
                                    boxLabel: 'Tidak',
                                    name: 'mi_ppn',
                                    inputValue: 0,
                                    width: 90,
                                    listeners: {
                                        change: function(rb, nv, ov, options) {
                                            if (nv) {
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        Ext.create('Ext.ux.form.NumericField', {
                            fieldLabel: 'Netto ',
                            name: 'mi_hpp',
                            decimalPrecision: 2,
                            decimalSeparator: '.',
                            alwaysDisplayDecimals: true,
                            allowNegative: false,
                            minValue: 0, //prevents negative numbers
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            readOnly: true,
                            allowBlank: true
                        }),
                        {
                            xtype: 'radiogroup',
                            fieldLabel: 'Status Aktif ',
                            hidden: false,
                            margin: '-3 0 0 0',
                            width: 300,
                            items: [
                                {
                                    boxLabel: 'Ya',
                                    name: 'mi_active',
                                    inputValue: "1",
                                    width: 90,
                                    checked: true,
                                    listeners: {
                                        change: function(rb, nv, ov, options) {
                                            if (nv) {
                                            }
                                        }
                                    }
                                },
                                {
                                    boxLabel: 'Tidak',
                                    name: 'mi_active',
                                    inputValue: "0",
                                    width: 90,
                                    listeners: {
                                        change: function(rb, nv, ov, options) {
                                            if (nv) {
                                            }
                                        }
                                    }
                                }
                            ]
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