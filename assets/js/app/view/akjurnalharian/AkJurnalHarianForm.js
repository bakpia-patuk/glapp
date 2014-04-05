/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.akjurnalharian.AkJurnalHarianForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.akjurnalharian.akjurnalharianform',
    itemId: 'akjurnalharianform',
    id: 'akjurnalharianform',
    border: false,
    bodyStyle: FORM_BG,
    bodyPadding: '10',
    layout: 'auto',
    fieldDefaults: {
        width: 300,
        labelAlign: 'right',
        labelWidth: 80,
        msgTarget: 'side'
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    text: 'Simpan',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-save',
//                    action: 'jmSave'
                },
                {
                    xtype: 'button',
                    text: 'Baru',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-add',
//                    action: 'jmNew'
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Hapus',
                    iconCls: 'icon-btn-delete',
//                    action: 'jmDelete'
                },
                '->',
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Tambah Jurnal',
                    iconCls: 'icon-btn-',
//                    action: 'jmNewJurnal'
                }
            ],
            items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Id Trx',
                    name: 'id',
                    itemId: 'id',
                    value: 0,
                    hidden: true
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Id Jurnal',
                    name: 'idJurnal',
                    itemId: 'idJurnal',
                    value: 0,
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Status Otorisasi',
                    name: 'status_app',
                    itemId: 'status_app',
                    hidden: true
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Status ',
                    hidden: false,
                    itemId: 'trxStatus',
                    items: [
                        {
                            boxLabel: 'BKM',
                            name: 'jurnal_type',
                            inputValue: 0,
                            width: 60,
                            checked: true,
                            listeners: {
                                change: function(o, n, e, opt) {
                                    if (n) {
                                        this.up('form').down('#noBk').setFieldLabel('No BKM ');
                                        this.up('form').down('#bankAkun').disable();
                                        this.up('form').down('#bankAkun').hide();
                                    }
                                }
                            }
                        },
                        {
                            boxLabel: 'BKK',
                            name: 'jurnal_type',
                            inputValue: 1,
                            width: 60,
                            listeners: {
                                change: function(o, n, e, opt) {
                                    if (n) {
                                        this.up('form').down('#noBk').setFieldLabel('No BKK ');
                                        this.up('form').down('#bankAkun').disable();
                                        this.up('form').down('#bankAkun').hide();
                                    }
                                }
                            }
                        },
                        {
                            boxLabel: 'BBM',
                            name: 'jurnal_type',
                            inputValue: 2,
                            width: 60,
                            listeners: {
                                change: function(o, n, e, opt) {
                                    if (n) {
                                        this.up('form').down('#noBk').setFieldLabel('No BBM ');
                                        this.up('form').down('#bankAkun').enable();
                                        this.up('form').down('#bankAkun').show();
                                    }
                                }
                            }
                        },
                        {
                            boxLabel: 'BBK',
                            name: 'jurnal_type',
                            inputValue: 3,
                            width: 60,
                            listeners: {
                                change: function(o, n, e, opt) {
                                    if (n) {
                                        this.up('form').down('#noBk').setFieldLabel('No BBK ');
                                        this.up('form').down('#bankAkun').enable();
                                        this.up('form').down('#bankAkun').show();
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Akun Bank ',
//                    store: 'JhBankAkunStore',
                    name: 'bankAkun',
                    itemId: 'bankAkun',
                    displayField: 'namaAkun',
                    valueField: 'id',
                    queryMode: 'remote',
                    triggerCls: 'x-form-search-trigger',
                    hideTrigger: true,
                    emptyText: 'Ketik Nama Akun',
                    triggerAction: 'all',
                    minChars: 2,
                    forceSelection: true,
                    typeAhead: true,
                    allowBlank: false,
                    hidden: true,
                    disabled: true,
                    valueNotFoundText: 'Tidak ada Data',
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    },
                    listeners: {
                        afterrender: function() {
                            var store = this.getStore(),
                                    filterCollection = [];

                            var filter2 = new Ext.util.Filter({
                                property: 'akun_child_status',
                                value: 1
                            });
                            filterCollection.push(filter2);

                            var filter2 = new Ext.util.Filter({
                                property: 'akun_fungsi',
                                value: 2
                            });
                            filterCollection.push(filter2);

                            store.clearFilter(true);
                            store.filter(filterCollection);
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No BKM ',
                    name: 'noBk',
                    itemId: 'noBk',
                    allowBlank: false,
                    hidden: false,
                    readOnly: false
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tgl. Jurnal ',
                    name: 'tglJurnal',
                    width: 190,
                    allowBlank: false,
                    value: new Date(),
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d'
                },
                Ext.create('Ext.ux.form.NumericField', {
                    fieldLabel: 'Jumlah ',
                    name: 'jumlahTrxKas',
                    itemId: 'jumlahTrxKas',
                    decimalPrecision: 2,
                    decimalSeparator: '.',
                    alwaysDisplayDecimals: true,
                    allowNegative: false,
                    value: 0,
                    minValue: 1, //prevents negative numbers
                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    allowBlank: false
                }),
                {
                    xtype: 'textareafield',
                    width: 325,
                    height: 50,
                    fieldLabel: 'Keterangan ',
                    name: 'uraian',
                    itemId: 'uraian',
                    allowBlank: false
                },
                {
                    xtype: 'checkbox',
                    margin: '5 0 10 0',
                    itemId: 'akunLawan',
                    boxLabel: ' Akun Lawan',
                    inputValue: true,
                    uncheckedValues: false
                },
                {
                    xtype: 'fieldset',
                    width: 325,
                    padding: 10,
                    hidden: true,
                    itemId: 'AkunLawan',
                    disabled: true,
                    title: 'Data Akun Lawan',
                    labelAlign: 'top',
                    items: [
                        {
                            xtype: 'radiogroup',
                            fieldLabel: 'Status ',
                            hidden: false,
                            itemId: 'type',
                            items: [
                                {
                                    boxLabel: 'Debet',
                                    name: 'type',
                                    inputValue: 0,
                                    width: 90,
                                    checked: true
                                },
                                {
                                    boxLabel: 'Kredit',
                                    name: 'type',
                                    inputValue: 1,
                                    width: 90
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Nama Akun ',
//                            store: 'JhAkunStore',
                            name: 'idAkun',
                            itemId: 'idAkun',
                            displayField: 'namaAkun',
                            valueField: 'id',
                            queryMode: 'remote',
                            triggerCls: 'x-form-search-trigger',
                            hideTrigger: true,
                            emptyText: 'Ketik Nama Akun',
                            triggerAction: 'all',
                            minChars: 2,
                            forceSelection: true,
                            typeAhead: true,
                            allowBlank: false,
                            valueNotFoundText: 'Tidak ada Data',
                            matchFieldWidth: false,
                            listConfig: {
                                minWidth: 185
                            },
//                            listeners: {
//                                afterrender: function() {
//                                    var store = this.getStore();
//                                    store.clearFilter(true);
//                                    store.filter('akun_child_status', 1);
//                                },
//                                select: function() {
//                                    var val = this.getValue(),
//                                            rec = this.findRecordByValue(val);
//
//                                    this.up('form').down('#codeAkun').setValue(rec.get('codeAkunPure'));
//                                    this.up('form').down('#groupAkun').getStore().load();
//                                    this.up('form').down('#groupAkun').setValue(rec.get('groupAkun'));
//
//                                }
//                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Kode Akun ',
                            name: 'codeAkun',
                            itemId: 'codeAkun',
                            allowBlank: false,
                            hidden: false,
                            readOnly: true
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Group Akun ',
                            emptyText: '',
                            displayField: 'namaGroupAkun',
                            valueField: 'kodeGroupAkun',
                            queryMode: 'remote',
                            name: 'groupAkun',
                            itemId: 'groupAkun',
//                            store: 'GroupAkunStore',
                            triggerAction: 'all',
                            forceSelection: true,
                            typeAhead: true,
                            allowBlank: false,
                            readOnly: true
                        },
                        Ext.create('Ext.ux.form.NumericField', {
                            fieldLabel: 'Jumlah ',
                            name: 'jumlahTrx',
                            itemId: 'jumlahTrx',
                            decimalPrecision: 2,
                            decimalSeparator: '.',
                            alwaysDisplayDecimals: true,
                            allowNegative: false,
                            value: 0,
                            minValue: 0, //prevents negative numbers
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            allowBlank: false
                        }),
                        {
                            xtype: 'button',
                            ui: 'blue-button',
                            text: 'Tambah',
                            itemId: 'addJurnal',
                            margin: '0 0 0 85'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});

/* End of file groupForm.js */
/* Location: ./assets/js/app/view/group/groupForm.js */