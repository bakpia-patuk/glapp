/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.kskeluar.KsKeluarForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.kskeluar.kskeluarform',
    itemId: 'kskeluarform',
    border: false,
    preventHeader: false,
    bodyStyle: FORM_BG,
    bodyPadding: 10,
    buttonAlign: 'right',
    fieldDefaults: {
        width: 300,
        labelAlign: 'right',
        labelWidth: 115,
        msgTarget: 'side'
    },
    autoScroll: true,
    initComponent: function () {
        var me = this,
                form = me;
        
        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    text: 'ADD_NEW',
                    ui: 'green-button',
                    iconCls: 'icon-btn-add',
                    itemId: 'KasKeluarNew'
                },
                {
                    xtype: 'button',
                    text: 'SAVE',
                    ui: 'green-button',
                    iconCls: 'icon-btn-save',
                    itemId: 'KasKeluarSave'
                },
                {
                    xtype: 'button',
                    text: 'PRINT',
                    ui: 'green-button',
                    iconCls: 'icon-btn-print',
                    itemId: 'KasKeluarSavePrint'
                },
                {
                    xtype: 'button',
                    text: 'DELETE',
                    ui: 'green-button',
                    hidden: true,
                    iconCls: 'icon-btn-delete',
                    itemId: 'KasKeluarDelete'
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Form ID ',
                    name: 'kas_type',
                    value: 'kaskeluar',
                    hidden: true,
                    allowBlank: false,
                    readOnly: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Type Kas Keluar ',
                    name: 'kk_type',
                    itemId: 'kk_type',
                    hidden: true,
                    allowBlank: false,
                    readOnly: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'ID Trans ',
                    name: 'id',
                    hidden: true
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tanggal ',
                    name: 'kas_tgltrx',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    value: new Date(),
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Nama Supplier ',
                    name: 'faktur_suppid',
                    itemId: 'faktur_suppid',
                    hidden: false,
                    triggerAction: 'all',
                    minChars: 2,
                    store: 'kskeluar.MasterSupplierStore',
                    displayField: 'ms_name',
                    valueField: 'id',
                    emptyText: 'Nama Supplier',
                    readOnly: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Faktur ',
                    name: 'faktur_id',
                    itemId: 'faktur_id',
                    hidden: true
                },
                Ext.create('Ext.ux.form.NumericField', {
                    hidden: false,
                    fieldLabel: 'Jumlah Tagihan ',
                    name: 'faktur_nototal',
                    itemId: 'faktur_nototal',
                    decimalPrecision: 2,
                    decimalSeparator: '.',
                    alwaysDisplayDecimals: true,
                    allowNegative: false,
                    minValue: 0, //prevents negative numbers
                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    allowBlank: true,
                    readOnly: true,
                    itemCls: 'x-item-readonly',
                    value: 0,
                    listeners: {
                        'change': function () {
                            var iki = this.getValue(),
                                iku = form.getForm().findField('jumlahSupLebihBayar').getValue();

                            form.getForm().findField('kas_jumlah').setValue(iki - iku);
                        }
                    }
                }),
                Ext.create('Ext.ux.form.NumericField', {
                    hidden: false,
                    fieldLabel: 'Kelebihan Bayar ',
                    name: 'jumlahSupLebihBayar',
                    decimalPrecision: 2,
                    decimalSeparator: '.',
                    alwaysDisplayDecimals: true,
                    allowNegative: false,
                    minValue: 0, //prevents negative numbers
                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    allowBlank: true,
                    readOnly: true,
                    value: 0,
                    itemCls: 'x-item-readonly'
                }),
                {
                    xtype: 'textfield',
                    fieldLabel: 'ID Minta Bayar',
                    name: 'ma_id',
                    hidden: true,
                    listeners: {
                        change: function () {
                            if (this.getValue() !== "") {
                                this.up('form').getForm().findField('kas_jumlah').setReadOnly(true);
                            }
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Divisi ',
                    name: 'divisi_name',
                    readOnly: true,
                    fieldCls: 'x-item-readonly',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    name: 'agrplan_periksa',
                    itemId: 'agrplan_periksa',
                    fieldLabel: 'Nama Pmriksaan ',
                    readOnly: true,
                    hidden: true,
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'agrplan_pasien',
                    itemId: 'agrplan_pasien',
                    fieldLabel: 'Nama Pasien ',
                    readOnly: true,
                    hidden: true,
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'agrplan_rujuk',
                    itemId: 'agrplan_rujuk',
                    fieldLabel: 'Di Rujuk Ke ',
                    readOnly: true,
                    hidden: true,
                    allowBlank: true
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Status Kas ',
                    emptyText: 'Pilih',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    name: 'kas_akun',
                    forceSelection: true,
                    hidden: true,
                    typeAhead: true,
                    allowBlank: true,
                    valueNotFoundText: 'Tidak ada Data',
                    store: new Ext.data.SimpleStore({
                        id: 0,
                        fields: [
                            'typeCode', //numeric value is the key
                            'type' //the text value is the value
                        ],
                        data: [
                            [4, 'Kas Tunai'],
                            [5, 'Kas Bon']
                        ]
                    })
                },
                Ext.create('Ext.ux.form.NumericField', {
                    fieldLabel: 'Nominal ',
                    name: 'kas_jumlah',
                    decimalPrecision: 2,
                    decimalSeparator: ',',
                    alwaysDisplayDecimals: true,
                    allowNegative: false,
                    minValue: 0, //prevents negative numbers
                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    allowBlank: false,
                    readOnly: true
                }),
                {
                    xtype: 'comboboxedit',
                    fieldLabel: 'Keperluan ',
                    name: 'trx_desc',
                    hidden: true,
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Petugas ',
                    name: 'petugas',
                    value: USER_NAME,
                    hidden: false,
                    readOnly: true,
                    fieldCls: 'x-item-readonly'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Penerima ',
                    name: 'kas_namabayar',
                    readOnly: false,
                    hidden: false,
                    allowBlank: false
                },
                {
                    xtype: 'fieldcontainer',
                    width: 300,
                    layout: 'hbox',
                    items: [
                        {
                            html: 'Tanda Tangan :',
                            border: false,
                            width: 115,
                            bodyStyle: FORM_BG,
                            padding: '3 0 0 27',
                            align: 'right'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'icon-btn-search',
                            ui: 'green-button',
                            text: 'Ambil TTD',
                            margins: '0 0 0 5',
                            handler: function () {
                               var win = new Ext.widget('kskeluar.kksignwin');
                               win.down('#idKk').setValue(form.down('#random_string').getValue());
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    width: 300,
                    layout: 'hbox',
                    margins: '-10 0 0 0',
                    items: [
                        {
                            html: 'Preview : ',
                            border: false,
                            width: 120,
                            bodyStyle: FORM_BG,
                            padding: '3 0 0 61',
                            align: 'right'
                        },
                        Ext.create('Ext.Img', {
                            margin: '0 0 0 0',
                            baseCls: 'imagefieldthumb',
                            src: BASE_PATH + 'assets/appdata/signBlank.png',
                            itemId: 'imageTtdKk1'
                        })
                    ]
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'random Key',
                    hidden: true,
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