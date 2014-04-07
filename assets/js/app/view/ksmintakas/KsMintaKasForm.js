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
                    name: 'tgl_trx',
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
                    name: 'trx_divisi',
                    forceSelection: true,
                    hidden: false,
                    typeAhead: true,
                    allowBlank: false,
                    valueNotFoundText: 'Tidak ada Data',
                    store: new Ext.data.SimpleStore({
                        id: 1,
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
                    name: 'mk_keperluan',
                    hidden: false,
                    triggerAction: 'all',
                    minChars: 2,
                    store: 'ksmintakas.GrkBkStore',
                    readOnly: false,
                    displayField: 'grk_name',
                    valueField: 'id',
                    emptyText: 'Pilih...',
                    listeners: {
                        afterrender: function(combo, rec, eOpt) {
                            combo.getStore().clearFilter(true);
                            combo.getStore().filter('form_id', 'mintakasdiv');
                        },
                        select: function(combo, rec, eOpt) {
                            var store = this.up('form').getForm().findField('mk_detail').getStore();
                            this.up('form').getForm().findField('mk_detail').show();
                            this.up('form').getForm().findField('mk_detail').setReadOnly(false);
                            this.up('form').getForm().findField('mk_detail').reset();
                            store.clearFilter(true);
                            store.filter('kp_id', combo.getValue());
                            store.load();
                        }
                    },
                    onTrigger2Click: function() {
                        var win = Ext.widget('ksmintakas.ksgroupkpwin');
                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Detail Keperluan ',
                    name: 'mk_detail',
                    hidden: true,
                    hideTrigger: false,
                    triggerAction: 'all',
                    queryMode: 'remote',
                    minChars: 2,
                    store: 'ksmintakas.ListAkunGkStore',
                    readOnly: false,
                    displayField: 'akun_name',
                    valueField: 'id',
                    emptyText: 'Pilih...',
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    },
                    listeners: {
                        select: function() {
                            var val = this.getValue(),
                                    form = this.up('form');
                            if (val === 980 || val === 981 || val === 982) {
                                this.up('form').getForm().findField('mk_detailext').show();
                                var jenis = this.getValue(),
                                        jenis_val = jenis === 980 ? 1 : (jenis === 981 ? 2 : 3),
                                        store = this.up('form').getForm().findField('mk_detailext').getStore(),
                                        filterCollection = [];

                                var statusFilter = new Ext.util.Filter({
                                    property: 'mt_cabang',
                                    value: CABANG_ID
                                });
                                filterCollection.push(statusFilter);

                                var statusFilter = new Ext.util.Filter({
                                    property: 'mt_jenis',
                                    value: jenis_val
                                });
                                filterCollection.push(statusFilter);

                                store.clearFilter(true);
                                store.filter(filterCollection);
                                form.down('#mkr_pemeriksaan').disable();
                                form.down('#mkr_pemeriksaan').hide();

                                form.down('#mkr_namapasien').disable();
                                form.down('#mkr_namapasien').hide();

                                form.down('#mkr_rujukanke').disable();
                                form.down('#mkr_rujukanke').hide();
                                
                            } else if (val === 877) {
                                form.down('#mkr_pemeriksaan').enable();
                                form.down('#mkr_pemeriksaan').show();

                                form.down('#mkr_namapasien').enable();
                                form.down('#mkr_namapasien').show();

                                form.down('#mkr_rujukanke').enable();
                                form.down('#mkr_rujukanke').show();
                            } else {
                                form.down('#mkr_pemeriksaan').disable();
                                form.down('#mkr_pemeriksaan').hide();

                                form.down('#mkr_namapasien').disable();
                                form.down('#mkr_namapasien').hide();

                                form.down('#mkr_rujukanke').disable();
                                form.down('#mkr_rujukanke').hide();
                                
                                this.up('form').getForm().findField('mk_detailext').hide();

                            }
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'No Dtl. Keperluan ',
                    name: 'mk_detailext',
                    hidden: true,
                    hideTrigger: false,
                    triggerAction: 'all',
                    queryMode: 'remote',
                    minChars: 2,
                    store: 'ksmintakas.MasterTelisaStore',
                    readOnly: false,
                    displayField: 'mt_rek',
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
                    name: 'mkr_pemeriksaan',
                    itemId: 'mkr_pemeriksaan',
                    fieldLabel: 'Nama Pmriksaan ',
                    hidden: true,
                    disabled: true,
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'mkr_namapasien',
                    itemId: 'mkr_namapasien',
                    fieldLabel: 'Nama Pasien ',
                    hidden: true,
                    disabled: true,
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'mkr_rujukanke',
                    itemId: 'mkr_rujukanke',
                    fieldLabel: 'Di Rujuk Ke ',
                    hidden: true,
                    disabled: true,
                    allowBlank: false
                },
                Ext.create('Ext.ux.form.NumericField', {
                    fieldLabel: 'Nominal ',
                    name: 'trx_value',
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
                    name: 'trx_penerima',
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