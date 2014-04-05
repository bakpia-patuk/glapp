/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.bkrencanaagr.BkRencanaAgrForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.bkrencanaagr.bkrencanaagrform',
    itemId: 'bkrencanaagrform',
    //id: 'akunform',
    border: false,
    bodyStyle: FORM_BG,
    bodyPadding: '10 5',
    buttonAlign: 'right',
    fieldDefaults: {
        width: 310,
        labelAlign: 'right',
        labelWidth: 100,
        msgTarget: 'side'
    },
    autoScroll: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    ui: 'orange-button',
                    text: 'ADD_NEW',
                    iconCls: 'icon-btn-add',
                    itemId: 'BkRaNew'
                },
                '-',
                {
                    xtype: 'button',
                    ui: 'orange-button',
                    text: 'SAVE',
                    iconCls: 'icon-btn-save',
                    itemId: 'BkRaSave'
                },
                '-',
                {
                    xtype: 'button',
                    ui: 'orange-button',
                    text: 'DELETE',
                    iconCls: 'icon-btn-delete',
                    itemId: 'BkRaDelete',
                    disabled: false
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    name: 'id',
                    itemId: 'id',
                    hidden: true,
                    fieldLabel: 'Id Trx'
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Jenis ',
                    width: 310,
                    hidden: true,
                    items: [
                        {
                            boxLabel: 'Supplier',
                            name: 'trsx_suppjenis',
                            inputValue: 0,
                            width: 70,
                            listeners: {
                                change: function(rb, nv, ov, options) {
                                    if (nv) {
                                        this.up('form').getForm().findField('namaSup').show();

                                        if (this.up('form').getForm().findField('namaKd')) {
                                            this.up('form').getForm().findField('namaKd').hide();
                                        }

                                        this.up('form').getForm().findField('divisi').hide();
                                        this.up('form').getForm().findField('namaGrk').hide();
                                        this.up('form').getForm().findField('caraBayar').hide();
                                        this.up('form').getForm().findField('trx_value').setReadOnly(true);
                                        this.up('form').getForm().findField('trx_value').hide();
                                    }
                                }
                            }
                        },
                        {
                            boxLabel: 'Non-Supplier',
                            name: 'trsx_suppjenis',
                            inputValue: 1,
                            width: 100,
                            margin: '0 0 0 5',
                            checked: true,
                            listeners: {
                                change: function(rb, nv, ov, options) {
                                    if (nv) {
                                        this.up('form').getForm().findField('namaSup').hide();

                                        if (this.up('form').getForm().findField('namaKd')) {
                                            this.up('form').getForm().findField('namaKd').hide();
                                        }

                                        this.up('form').getForm().findField('divisi').show();
                                        this.up('form').getForm().findField('namaGrk').show();
                                        this.up('form').getForm().findField('caraBayar').show();
                                        this.up('form').getForm().findField('trx_value').setReadOnly(false);
                                        this.up('form').getForm().findField('trx_value').show();
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
//                    fieldLabel: 'Jadwal Pembayaran ',
                    fieldLabel: '',
                    labelStyle: 'font-weight:bold;padding-bottom:5px;',
//                    bodyStyle: 'margin:15px 0px 25px 0px',
                    labelAlign: 'top',
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Dari ',
                            name: 'tglDari',
                            format: 'd/M/Y',
                            //value: new Date(),
                            submitFormat: 'Y-m-d',
                            readOnly: false,
                            hidden: false
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Sampai ',
                            name: 'tglSampai',
                            format: 'd/M/Y',
                            //value: new Date(),
                            submitFormat: 'Y-m-d',
                            readOnly: false,
                            hidden: false
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Divisi ',
//                    width: 210,
                    emptyText: 'Pilih',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    name: 'divisi',
                    forceSelection: true,
                    hidden: false,
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
                            [1, 'PELAYANAN'],
                            [2, 'MARKETING'],
                            [3, 'KEUANGAN'],
                            [4, 'LAB'],
                            [5, 'SDM'],
                            [6, 'IT'],
                            [7, 'RUMAH TANGGA']
                        ]
                    })
                },
                {
                    xtype: 'comboboxedit',
                    fieldLabel: 'Keperluan ',
                    name: 'keperluan',
                    hidden: false,
                    triggerAction: 'all',
                    minChars: 2,
                    store: 'bkrencanaagr.GrkBkStore',
                    readOnly: false,
                    displayField: 'grk_name',
                    valueField: 'id',
                    emptyText: 'Pilih...',
                    listeners: {
                        afterrender: function(combo, rec, eOpt) {
                            combo.getStore().clearFilter(true);
                            combo.getStore().filter('form_id', 'mintabayar');
                        },
//                        select: function(combo, rec, eOpt) {
//                            var store = this.up('form').getForm().findField('namaKd').getStore();
//                            this.up('form').getForm().findField('namaKd').show();
//                            this.up('form').getForm().findField('namaKd').setReadOnly(false);
//                            this.up('form').getForm().findField('namaKd').reset();
//                            store.clearFilter(true);
//                            store.filter('kp_id', combo.getValue());
//                            store.load();
//                        }
                    },
                    onTrigger2Click: function() {
                        var win = Ext.widget('bkrencanaagr.bkgroupkpwin');
                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Dtl. Keperluan ',
                    name: 'dtl_keperluan',
                    hidden: true,
                    triggerAction: 'all',
                    minChars: 2,
//                    store: 'DetailKpStore',
                    readOnly: true,
                    displayField: 'namaAkun',
                    valueField: 'id',
                    emptyText: 'Pilih...',
//                    listeners: {
//                        select: function() {
//                            var val = this.getValue(),
//                                    form = this.up('form');
//                            if (val === 980 || val === 981 || val === 982) {
//                                this.up('form').getForm().findField('noDetilKpr').show();
//                                var jenis = this.getValue(),
//                                        jenis_val = jenis === 980 ? 1 : (jenis === 981 ? 2 : 3),
//                                        store = this.up('form').getForm().findField('noDetilKpr').getStore(),
//                                        filterCollection = [];
//
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'mt_cabang',
//                                    value: userCabang
//                                });
//                                filterCollection.push(statusFilter);
//
//                                var statusFilter = new Ext.util.Filter({
//                                    property: 'mt_jenis',
//                                    value: jenis_val
//                                });
//                                filterCollection.push(statusFilter);
//
//                                store.clearFilter(true);
//                                store.filter(filterCollection);
//                                form.down('#pemeriksaan').disable();
//                                form.down('#pemeriksaan').hide();
//
//                                form.down('#namapasien').disable();
//                                form.down('#namapasien').hide();
//
//                                form.down('#rujukan').disable();
//                                form.down('#rujukan').hide();
//
//                            } else if (val === 877) {
//                                form.down('#pemeriksaan').enable();
//                                form.down('#pemeriksaan').show();
//
//                                form.down('#namapasien').enable();
//                                form.down('#namapasien').show();
//
//                                form.down('#rujukan').enable();
//                                form.down('#rujukan').show();
//                            } else {
//                                form.down('#pemeriksaan').disable();
//                                form.down('#pemeriksaan').hide();
//
//                                form.down('#namapasien').disable();
//                                form.down('#namapasien').hide();
//
//                                form.down('#rujukan').disable();
//                                form.down('#rujukan').hide();
//
//                                this.up('form').getForm().findField('noDetilKpr').hide();
//
//                            }
//                        }
//                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'No Dtl. Keperluan ',
                    name: 'noDetilKpr',
                    hidden: true,
                    hideTrigger: false,
                    triggerAction: 'all',
                    queryMode: 'remote',
                    minChars: 2,
//                    store: 'MasterTelisaStore',
                    readOnly: false,
                    displayField: 'mt_namarek',
                    valueField: 'id',
                    emptyText: 'Pilih No',
                    matchFieldWidth: false,
                    listConfig: {
                        itemTpl: '<b>{mt_nama}</b> / <span style="color:blue">{mt_rek}</span>',
                        minWidth: 185
                    }
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Keterangan ',
                    name: 'keterangan',
                    height: 50,
                    hidden: false
                },
                {
                    xtype: 'triggerfield',
                    fieldLabel: 'Nomor Faktur ',
                    name: 'trx_fakturno',
                    id: 'maFakNo',
                    triggerCls: 'x-form-search-trigger',
//                    onTriggerClick: function() {
//                        var suppName = this.up('form').getForm().findField('namaSup').getValue();
//                        if (suppName === null) {
//                            Ext.MessageBox.alert('Info', 'Pilih dahulu supplier');
//                            return;
//                        }
//                        this.setValue('');
//                        this.up('form').getForm().findField('trx_value').setValue(0);
//                        Ext.widget('fakturwindow').show();
//                    },
                    allowBlank: true,
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Id Faktur',
                    name: 'idFaktur',
                    id: 'maFakId',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    name: 'mkr_pemeriksaan',
                    itemId: 'pemeriksaan',
                    fieldLabel: 'Nama Pmriksaan ',
                    hidden: true,
                    disabled: true,
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'mkr_namapasien',
                    itemId: 'namapasien',
                    fieldLabel: 'Nama Pasien ',
                    hidden: true,
                    disabled: true,
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'mkr_rujukanke',
                    itemId: 'rujukan',
                    fieldLabel: 'Di Rujuk Ke ',
                    hidden: true,
                    disabled: true,
                    allowBlank: false
                },
                Ext.create('Ext.ux.form.NumericField', {
                    fieldLabel: 'Nom. Perkiraan ',
                    name: 'trx_value',
                    id: 'maFakTotal',
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
                    emptyText: 'nominal',
                    readOnly: false,
                    hidden: false
                }),
                {
                    xtype: 'combobox',
                    fieldLabel: 'Cara Bayar ',
//                    width: 210,
                    emptyText: 'Pilih',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    name: 'cara_bayar',
                    forceSelection: true,
                    hidden: false,
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
                            [0, 'BG'],
                            [1, 'Tunai'],
                            [2, 'Transfer']
                        ]
                    }),
                    listeners: {
                        change: function() {
                            if (this.getValue() === 2) {
                                this.up('form').getForm().findField('rek_no').show();
                                this.up('form').getForm().findField('rek_bank').show();
                                this.up('form').getForm().findField('atas_nama').show();

                                this.up('form').getForm().findField('bg_no').hide();
                                this.up('form').getForm().findField('bg_ed').hide();
                            } else if (this.getValue() === 0) {
                                this.up('form').getForm().findField('rek_no').hide();
                                this.up('form').getForm().findField('rek_bank').hide();
                                this.up('form').getForm().findField('atas_nama').hide();

                                this.up('form').getForm().findField('bg_no').show();
                                this.up('form').getForm().findField('bg_ed').show();
                            } else {
                                this.up('form').getForm().findField('rek_no').hide();
                                this.up('form').getForm().findField('rek_bank').hide();
                                this.up('form').getForm().findField('atas_nama').hide();

                                this.up('form').getForm().findField('bg_no').hide();
                                this.up('form').getForm().findField('bg_ed').hide();
                            }
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No BG ',
                    name: 'bg_no',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama Bank ',
                    name: 'rek_bank',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Rekening ',
                    name: 'rek_no',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Atas Nama ',
                    name: 'atas_nama',
                    hidden: true
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Jatuh Tempo ',
                    name: 'bg_ed',
                    format: 'd/M/Y',
                    //value: new Date(),
                    submitFormat: 'Y-m-d',
                    readOnly: false,
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'apprStatus ',
                    name: 'app_status',
                    itemId: 'app_status',
                    hidden: true
                }
            ]
        });
        me.callParent(arguments);
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */