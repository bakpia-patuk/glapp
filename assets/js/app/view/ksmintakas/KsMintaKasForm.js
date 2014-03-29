/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.ksmintakas.KsMintaKasForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ksmintakas.ksmintakasform',
    itemId: 'ksmintakasform',
    id: 'ksmintakasform',
    border: false,
    bodyStyle: FORM_BG,
    bodyPadding: '10',
    layout: 'auto',
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 110,
        msgTarget: 'side',
        width: 300
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Simpan',
                    iconCls: 'icon-btn-save',
//                    action: 'mbSave'
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Baru',
                    iconCls: 'icon-btn-add',
//                    action: 'mbNew'
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Form Id ',
                    name: 'formId',
                    value: 'mintabayar',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'ID ',
                    name: 'id',
                    itemId: 'id',
                    hidden: true
                },
                {
                    xtype: 'datefield',
                    name: 'tglTrx',
                    fieldLabel: 'Tanggal ',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    allowBlank: false,
                    value: new Date()
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Divisi ',
                    emptyText: 'Pilih',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    name: 'divisi',
                    forceSelection: true,
                    hidden: false,
                    typeAhead: true,
                    allowBlank: false,
                    valueNotFoundText: 'Tidak ada Data',
                    store: new Ext.data.SimpleStore({
                        id: 0,
                        fields: [
                            'typeCode', //numeric value is the key
                            'type' //the text value is the value
                        ],
                        data: [
                            [0, 'PELAYANAN'],
                            [1, 'MARKETING'],
                            [2, 'KEUANGAN'],
                            [3, 'LAB'],
                            [4, 'SDM'],
                            [5, 'IT'],
                            [6, 'RUMAH TANGGA']
                        ]
                    })
                },
                {
                    xtype: 'comboboxedit',
                    fieldLabel: 'Keperluan ',
                    name: 'namaGrk',
                    hidden: false,
                    triggerAction: 'all',
                    minChars: 2,
//                    store: 'GrkStoreBkr',
                    readOnly: false,
                    displayField: 'grkName',
                    valueField: 'id',
                    emptyText: 'Pilih...',
//                    listeners: {
//                        afterrender: function(combo, rec, eOpt) {
//                            combo.getStore().clearFilter(true);
//                            combo.getStore().filter('form_id', 'mintakasdiv');
//                        },
//                        select: function(combo, rec, eOpt) {
//                            var store = this.up('form').getForm().findField('namaKd').getStore();
//                            this.up('form').getForm().findField('namaKd').show();
//                            this.up('form').getForm().findField('namaKd').setReadOnly(false);
//                            this.up('form').getForm().findField('namaKd').reset();
//                            store.clearFilter(true);
//                            store.filter('kp_id', combo.getValue());
//                            store.load();
//                        }
//                    },
//                    onTrigger2Click: function() {
//                        var mbkGrid = new Ext.widget('shared.gkmastergrid', {
//                            border: true,
//                            region: 'center'
//                        }),
//                        mbkDtGrid = new Ext.widget('shared.gkmasterdetailgrid', {
//                            region: 'east',
//                            border: true,
//                            width: 290,
//                            split: true
//                        }),
//                        store = mbkGrid.getStore();
//                        var win = new Ext.widget('shared.newwindow', {
//                            title: 'DAFTAR KEPERLUAN',
//                            width: 700,
//                            height: 300,
//                            border: false,
//                            layout: 'border',
//                            items: [
//                                mbkGrid, mbkDtGrid
//                            ],
//                            buttons: [
//                                {
//                                    text: 'Simpan',
//                                    itemId: 'dtKeperluanSave'
//                                }
//                            ]
//                        });
//
//                        var store = mbkGrid.getStore();
//
//
//                        store.clearFilter(true);
//                        store.filter('form_id', 'mintakasdiv');
//                        mbkGrid.down('#keperluanForm').setValue('mintakasdiv');
//                        win.show();
//                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Detail Keperluan ',
                    name: 'namaKd',
                    hidden: true,
                    hideTrigger: false,
                    triggerAction: 'all',
                    queryMode: 'remote',
                    minChars: 2,
//                    store: 'DetailKpStore',
                    readOnly: false,
                    displayField: 'namaAkun',
                    valueField: 'id',
                    emptyText: 'Pilih...',
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    },
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
                    xtype: 'textfield',
                    name: 'pemeriksaan',
                    itemId: 'pemeriksaan',
                    fieldLabel: 'Nama Pmriksaan ',
                    hidden: true,
                    disabled: true,
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'namaPasien',
                    itemId: 'namapasien',
                    fieldLabel: 'Nama Pasien ',
                    hidden: true,
                    disabled: true,
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'rujukan',
                    itemId: 'rujukan',
                    fieldLabel: 'Di Rujuk Ke ',
                    hidden: true,
                    disabled: true,
                    allowBlank: false
                },
                Ext.create('Ext.ux.form.NumericField', {
                    fieldLabel: 'Nominal ',
                    name: 'trxValue',
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
                    emptyText: 'nominal pembayaran'
                }),
                {
                    xtype: 'textfield',
                    name: 'namaPenerima',
                    fieldLabel: 'Penerima ',
                    allowBlank: false
                }
            ]
        });

        me.callParent(arguments);
    }
});

/* End of file groupForm.js */
/* Location: ./assets/js/app/view/group/groupForm.js */