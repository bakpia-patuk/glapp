/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.akmsakun.AkMsAkunForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.akmsakun.akmsakunform',
    itemId: 'akmsakunform',
    id: 'akmsakunform',
    border: false,
    bodyStyle: FORM_BG,
    bodyPadding: 5,
    buttonAlign: 'right',
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 110,
        msgTarget: 'side'
    },
    autoScroll: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Simpan',
                    iconCls: 'icon-btn-save',
//                    disabled: userCabang === '14' ? false : true,
//                    action: 'akunSave'
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Baru',
                    iconCls: 'icon-btn-add',
//                    disabled: userCabang === '14' ? false : true,
//                    action: 'akunNew'
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Hapus',
                    iconCls: 'icon-btn-delete',
//                    disabled: userCabang === '14' ? false : true,
//                    action: 'akunDelete'
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    width: 350,
                    name: 'id',
                    fieldLabel: 'ID Field ',
                    hidden: true
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Berlaku ',
                    itemId: 'statusAkunBerlaku',
                    items: [
                        {
                            boxLabel: 'Nasional',
                            name: 'statusCabang',
                            inputValue: 0,
                            checked: true,
//                            listeners: {
//                                change: function(rb, nv, ov, options) {
//                                    var store = this.up('form').getForm().findField('codeAkunchild').getStore();
//                                    if (nv) {
//                                        store.getProxy().extraParams.cabang = 14;
//                                        store.load();
//                                        this.up('form').getForm().findField('lokasiCabang').hide();
//                                        this.up('form').getForm().findField('groupAkun').clearValue();
//                                        this.up('form').getForm().findField('codeAkunchild').clearValue();
//                                        this.up('form').down('#customFieldBtn').disable();
//                                    }
//                                }
//                            }
                        },
                        {
                            boxLabel: 'Cabang',
                            name: 'statusCabang',
                            inputValue: 1,
//                            listeners: {
//                                change: function(rb, nv, ov, options) {
//                                    var store = this.up('form').getForm().findField('codeAkunchild').getStore();
//                                    if (nv) {
//                                        store.load();
//                                        this.up('form').getForm().findField('lokasiCabang').enable();
//                                        this.up('form').getForm().findField('lokasiCabang').show();
//                                        this.up('form').getForm().findField('groupAkun').clearValue();
//                                        this.up('form').getForm().findField('codeAkunchild').clearValue();
//                                        this.up('form').down('#customFieldBtn').enable();
//                                    }
//                                }
//                            }
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    width: 350,
                    fieldLabel: 'Cabang ',
                    emptyText: 'Pilih Cabang',
                    displayField: 'cabangName',
                    valueField: 'id',
                    queryMode: 'remote',
                    name: 'lokasiCabang',
                    hidden: true,
                    triggerAction: 'all',
                    minChars: 2,
//                    store: 'CabangStore',
//                    forceSelection: true,
//                    valueNotFoundText: 'tidak ada data',
//                    listeners: {
//                        change: function() {
//                            var store = this.up('form').getForm().findField('codeAkunchild').getStore();
//                            store.getProxy().extraParams.cabang = this.getValue();
//                            store.load();
//                        }
//                    }
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Tipe Pekiraan ',
                    columns: 1,
                    items: [
                        {
                            boxLabel: 'Header (Perkiraan tidak dapat diposting)',
                            name: 'akunHead',
                            inputValue: 0,
//                            listeners: {
//                                change: function(rb, nv, ov, options) {
//                                    if (nv) {
//                                        this.up('form').getForm().findField('akunCurr').hide();
//                                        this.up('form').getForm().findField('akunCurr').setValue("1");
//
//                                        this.up('form').getForm().findField('akunBall').hide();
//                                        this.up('form').getForm().findField('akunBall').setValue(0);
//
//                                        this.up('form').getForm().findField('isAkunKas').hide();
//                                        this.up('form').getForm().findField('isAkunKas').setValue(0);
//
//                                        this.up('form').getForm().findField('fungsiAkun').hide();
//                                    }
//                                }
//                            }
                        },
                        {
                            boxLabel: 'Detail (Perkiraan dapat diposting)',
                            name: 'akunHead',
                            inputValue: 1,
                            checked: true,
//                            listeners: {
//                                change: function(rb, nv, ov, options) {
//                                    if (nv) {
//                                        this.up('form').getForm().findField('akunCurr').show();
//                                        this.up('form').getForm().findField('akunCurr').setValue("1");
//
//                                        this.up('form').getForm().findField('akunBall').show();
//                                        this.up('form').getForm().findField('akunBall').setValue(0);
//
//                                        this.up('form').getForm().findField('isAkunKas').show();
//                                        this.up('form').getForm().findField('isAkunKas').setValue(0);
//
//                                        this.up('form').getForm().findField('fungsiAkun').show();
//                                    }
//                                }
//                            }
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    width: 350,
                    fieldLabel: 'Group Akun ',
                    emptyText: '',
                    displayField: 'namaGroupAkun',
                    valueField: 'kodeGroupAkun',
                    queryMode: 'remote',
                    name: 'groupAkun',
//                    store: 'GroupAkunStore',
                    triggerAction: 'all',
                    forceSelection: true,
                    typeAhead: true,
                    allowBlank: false,
                    valueNotFoundText: 'Tidak ada Data',
//                    listeners: {
//                        change: function() {
//                            this.up('form').getForm().findField('codeAkunchild').enable();
//                            var store = Ext.StoreMgr.lookup('AkunStore');
//                            var filterCollection = [];
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'akun_group',
//                                value: this.getValue()
//                            });
//
//                            filterCollection.push(statusFilter);
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'akun_head_status',
//                                value: 0
//                            });
//
//                            filterCollection.push(statusFilter);
//
//                            store.clearFilter(true);
//                            store.filter(filterCollection);
//                        }
//                    }
                },
                {
                    xtype: 'combogrid',
                    flex: 1,
                    fieldLabel: 'Posisi di Bawah ',
                    name: 'codeAkunchild',
                    itemId: 'codeAkunchild',
                    emptyText: '',
                    width: 350,
                    matchFieldWidth: false,
                    displayField: 'codeAkunRender',
                    valueField: 'id',
                    renderer: 'uppercase',
                    queryMode: 'remote',
                    minChar: 2,
//                    store: 'AkunStore',
                    triggerAction: 'all',
                    allowBlank: false,
                    disabled: true,
                    listConfig: {
                        width: 400,
                        viewConfig: {
                            // /autoScroll: true,
                            emptyText: 'Tidak ada daftar Akun',
                            deferEmptyText: false
                        },
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                width: 100,
                                header: 'Kode',
                                dataIndex: 'codeAkun'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 300,
                                header: 'Nama Akun',
                                dataIndex: 'namaAkun',
                                renderer: Ext.util.Format.uppercase
                            }
                        ]
                    },
//                    listeners: {
//                        select: function(cmb, e, opt) {
//                            var code = cmb.getValue(),
//                                    berlaku = cmb.up('form').getForm().findField('statusCabang').getGroupValue(),
//                                    cmbCabang= cmb.up('form').getForm().findField('lokasiCabang').getValue(),
//                                    cabang;
//                            
//                            if(berlaku === 0) {
//                                cabang = 1;
//                            } else {
//                                if(cmbCabang !== null) {
//                                    cabang = cmbCabang;
//                                } else {
//                                    Ext.Msg.alert('Error', 'Pilih cabang dahulu');
//                                    cmb.clearValue();
//                                    return false;
//                                }
//                            }
//
//                            Ext.Ajax.request({
//                                url: BASE_PATH + 'master/generate_akun_code',
//                                method: 'POST',
//                                params: {id: code, cabang: cabang},
//                                scope: this,
//                                callback: function(options, success, response) {
//                                    var resp = Ext.decode(response.responseText);
//
//                                    if (resp.success === 'true') {
//                                        this.up('form').getForm().findField('parentAkun').setValue(resp.data.parentAkun);
//                                        this.up('form').getForm().findField('codeAkunPure').setValue(resp.data.codeAkun);
//                                    }
//                                }
//                            });
//                        }
//                    }
                },
                {
                    xtype: 'fieldcontainer',
                    width: 350,
                    layout: 'hbox',
                    defaultType: 'textfield',
                    items: [
                        {
                            width: 230,
                            name: 'parentAkun',
                            fieldLabel: 'Kode Akun ',
                            id: 'parentAkun',
                            readOnly: true,
                            fieldCls: 'x-item-readonly'
                        },
                        {
                            xtype: 'label',
                            forId: 'kodeAkun1',
                            text: ' - ',
                            margins: '0 0 0 5'
                        },
                        {
                            width: 105,
                            name: 'codeAkunPure',
                            fieldLabel: '',
                            allowBlank: false,
                            margins: '0 0 0 5',
                            readOnly: true,
                            fieldCls: 'x-item-readonly'
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    width: 350,
                    name: 'namaAkun',
                    fieldLabel: 'Nama Akun ',
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    width: 350,
                    fieldLabel: 'Mata Uang ',
                    emptyText: '',
                    displayField: 'nama_mu',
                    valueField: 'id',
                    queryMode: 'remote',
                    name: 'akunCurr',
//                    store: 'MataUangStore',
                    triggerAction: 'all',
                    forceSelection: true,
                    typeAhead: true,
                    allowBlank: false,
                    valueNotFoundText: 'Tidak ada Data'
                },
                Ext.create('Ext.ux.form.NumericField', {
                    fieldLabel: 'Saldo Awal ',
                    name: 'akunBall',
                    value: '0',
                    width: 350,
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
                    disabled: true
                }),
                {
                    xtype: 'fieldcontainer',
                    width: 350,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'checkbox',
                            margins: '0 7 0 0',
                            fieldLabel: 'Akun Kas/Bank ',
                            boxLabel: 'Ya',
                            name: 'isAkunKas',
                            inputValue: 1,
                            uncheckedValues: 0,
//                            handler: function(ctl, val) {
//                                if (val === true) {
//                                    this.up('form').getForm().findField('fungsiAkun').enable();
////                                    this.up('form').getForm().findField('fungsiAkun').setValue('');
//
////                                    this.up('form').down('#akunTujuan').show();
//                                } else {
//                                    this.up('form').getForm().findField('fungsiAkun').disable();
////                                    this.up('form').getForm().findField('fungsiAkun').clearValue();
//                                    this.up('form').getForm().findField('noRek').hide();
//
////                                    this.up('form').down('#akunTujuan').hide();
//                                }
//                            }
                        },
                        {
                            xtype: 'combobox',
                            width: 194,
                            emptyText: 'Pilih Fungsi Kas',
                            displayField: 'fungsiName',
                            valueField: 'funsiCode',
                            queryMode: 'local',
                            mode: 'local',
                            name: 'fungsiAkun',
                            disabled: true,
                            store: new Ext.data.SimpleStore({
                                id: 0, fields: [
                                    'funsiCode', //numeric value is the key
                                    'fungsiName' //the text value is the value
                                ], data: [
                                    [0, 'Normal'],
                                    [1, 'Kas Bon'],
                                    [2, 'Bank']
                                ]
                            }),
                            listeners: {
                                select: function() {
//                                    if (this.getValue() == 2) {
//                                        this.up('form').getForm().findField('noRek').show();
//                                        this.up('form').getForm().findField('noRek').enable();
//                                    } else {
//                                        this.up('form').getForm().findField('noRek').hide();
//                                        this.up('form').getForm().findField('noRek').disable();
//                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    width: 350,
                    name: 'noRek',
                    fieldLabel: 'No Rek. ',
                    hidden: true,
                    disabled: true,
                    allowBlank: false
                },
                {
                    xtype: 'fieldcontainer',
                    width: 350,
                    itemId: 'akunTujuan',
                    hidden: true,
                    layout: 'hbox',
                    items: [
                        {
                            html: 'Akun Tujuan :',
                            border: false,
                            bodyStyle: FORM_BG,
                            padding: '3 0 0 36',
                            align: 'right'
                        },
                        {
                            xtype: 'button',
                            ui: 'blue-button',
                            iconCls: 'icon-btn-edit',
                            itemId: 'akunTujuanBtn',
                            text: 'Edit',
                            margins: '0 0 0 5'
                        }
                    ]
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Debet/ Kredit ',
                    items: [
                        {boxLabel: 'Debet', name: 'debetKredit', inputValue: 0, checked: true},
                        {boxLabel: 'Kredit', name: 'debetKredit', inputValue: 1}
                    ]
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Tampil di Neraca ',
                    items: [
                        {boxLabel: 'Ya', name: 'akunStatusTampil', inputValue: 0, checked: true},
                        {boxLabel: 'Tidak', name: 'akunStatusTampil', inputValue: 1}
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    width: 350,
                    itemId: 'customField',
                    hidden: true,
                    layout: 'hbox',
                    items: [
                        {
                            html: 'Custom Params :',
                            border: false,
                            bodyStyle: FORM_BG,
                            padding: '3 0 0 20',
                            align: 'right'
                        },
                        {
                            xtype: 'button',
                            ui: 'blue-button',
                            iconCls: 'icon-btn-edit',
                            itemId: 'customFieldBtn',
                            disabled: true,
                            text: 'Customize',
                            margins: '0 0 0 5'
                        }
                    ]
                },
                {
                    xtype: 'textareafield',
                    width: 350,
                    height: 50,
                    fieldLabel: 'Catatan ',
                    name: 'akunDesc',
                    allowBlank: true
                },
                {
                    xtype: 'checkbox',
                    fieldLabel: 'Active ',
                    boxLabel: 'Ya',
                    name: 'aktifStatus',
                    inputValue: '1',
                    uncheckedValues: '0',
                    checked: true
                },
                {
                    xtype: 'textfield',
                    width: 350,
                    name: 'akunCodeOld',
                    fieldLabel: 'Old Code ',
                    hidden: true
                },
                {
                    xtype: 'numberfield',
                    width: 160,
                    fieldLabel: 'Urutan ',
                    hideTrigger: true,
                    name: 'golSort',
                    hidden: true
                }
            ]
        });
        me.callParent(arguments);
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */