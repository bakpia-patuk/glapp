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
        var me = this,
                form = me;

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
                    value: '0',
                    fieldLabel: 'Id Trx'
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'apprStatus ',
                    name: 'app_status',
                    itemId: 'app_status',
                    value: 0,
                    hidden: true
                },
                {
                    xtype: 'fieldcontainer',
                    margin: 0,
                    labelAlign: 'top',
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Dari ',
                            name: 'agrplan_from',
                            itemId: 'agrplan_from',
                            format: 'd/M/Y',
                            submitFormat: 'Y-m-d',
                            value: new Date(),
                            readOnly: false,
                            hidden: false
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Sampai ',
                            name: 'agrplan_to',
                            itemId: 'agrplan_to',
                            format: 'd/M/Y',
                            submitFormat: 'Y-m-d',
                            value: new Date(),
                            readOnly: false,
                            hidden: false
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Divisi ',
                    name: 'agrplan_divisi',
                    itemId: 'agrplan_divisi',
                    emptyText: 'Pilih',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
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
                    name: 'agrplan_kpr',
                    itemId: 'agrplan_kpr',
                    hidden: false,
                    triggerAction: 'all',
                    minChars: 2,
                    store: 'bkrencanaagr.GrkBkStore',
                    readOnly: false,
                    allowBlank: false,
                    displayField: 'grk_name',
                    valueField: 'id',
                    emptyText: 'Pilih...',
                    listeners: {
                        afterrender: function(combo, rec, eOpt) {
                            combo.getStore().clearFilter(true);
                            combo.getStore().filter('form_id', 'mintabayar');
                        },
                        select: function(combo, rec, eOpt) {
                            var store = form.down('#agrplan_kprdetail').getStore();
                            form.down('#agrplan_kprdetail').setReadOnly(false);
                            form.down('#agrplan_kprdetail').reset();

                            store.clearFilter(true);
                            store.filter('kp_id', combo.getValue());
                            store.load();
                        }
                    },
                    onTrigger2Click: function() {
                        var win = Ext.widget('bkrencanaagr.bkgroupkpwin');
                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Dtl. Keperluan ',
                    name: 'agrplan_kprdetail',
                    itemId: 'agrplan_kprdetail',
                    hidden: false,
                    triggerAction: 'all',
                    minChars: 2,
//                    store: 'DetailKpStore',
                    readOnly: true,
                    allowBlank: false,
                    displayField: 'namaAkun',
                    valueField: 'id',
                    emptyText: 'Pilih...',
                    listeners: {
                        select: function() {
                            var val = this.getValue();
                            
                            if (val === 980 || val === 981 || val === 982) {
                                form.down('#agrplan_idtelisa').show();
                                var jenis = this.getValue(),
                                        jenis_val = jenis === 980 ? 1 : (jenis === 981 ? 2 : 3),
                                        store = form.down('#agrplan_idtelisa').getStore(),
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

                                form.down('#isRujukan').disable();
                                form.down('#isRujukan').hide();

                            } else if (val === 877) {
                                form.down('#isRujukan').enable();
                                form.down('#isRujukan').show();
                                form.down('#agrplan_idtelisa').hide();
                            } else {
                                form.down('#isRujukan').disable();
                                form.down('#isRujukan').hide();

                                form.down('#agrplan_idtelisa').hide();
                            }
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'No Dtl. Keperluan ',
                    name: 'agrplan_idtelisa',
                    itemId: 'agrplan_idtelisa',
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
                    name: 'agrplan_desc',
                    height: 50,
                    hidden: false
                },
                {
                    xtype: 'fieldcontainer',
                    margin: 0,
                    labelAlign: 'top',
                    itemId: 'isRujukan',
                    hidden: true,
                    disabled: true,
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'agrplan_periksa',
                            itemId: 'agrplan_periksa',
                            fieldLabel: 'Nama Pmriksaan ',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            name: 'agrplan_pasien',
                            itemId: 'agrplan_pasien',
                            fieldLabel: 'Nama Pasien ',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            name: 'agrplan_rujuk',
                            itemId: 'agrplan_rujuk',
                            fieldLabel: 'Di Rujuk Ke ',
                            allowBlank: false
                        }
                    ]
                },
                Ext.create('Ext.ux.form.NumericField', {
                    fieldLabel: 'Nom. Perkiraan ',
                    name: 'trx_nilai',
                    itemId: 'trx_nilai',
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
                    name: 'trx_carabayar',
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
                            [1, 'BG'],
                            [2, 'Tunai'],
                            [3, 'Transfer']
                        ]
                    }),
                    listeners: {
                        change: function() {
                            if (this.getValue() === 1) {
                                form.down('#trx_no').show();
                                form.down('#trx_no').enable();
                                form.down('#trx_no').setFieldLabel('No BG ');

                                form.down('#trx_bged').show();
                                form.down('#trx_bged').enable();
                               
                                form.down('#trx_trfbank').disable();
                                form.down('#trx_trfnama').disable();
                                form.down('#trx_trfbank').hide();
                                form.down('#trx_trfnama').hide();
                            } else if (this.getValue() === 2) {
                                form.down('#trx_no').hide();
                                form.down('#trx_no').disable();
                                form.down('#trx_trfbank').disable();
                                form.down('#trx_trfnama').disable();
                                form.down('#trx_trfbank').hide();
                                form.down('#trx_trfnama').hide();
                            } else {
                                form.down('#trx_no').show();
                                form.down('#trx_no').enable();
                                form.down('#trx_no').setFieldLabel('No Rekening ');

                                form.down('#trx_bged').hide();
                                form.down('#trx_bged').disable();
                               
                                form.down('#trx_trfbank').enable();
                                form.down('#trx_trfnama').enable();
                                form.down('#trx_trfbank').show();
                                form.down('#trx_trfnama').show();
                            }
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No BG ',
                    name: 'trx_no',
                    itemId: 'trx_no',
                    hidden: true,
                    disabled: true,
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Jatuh Tempo ',
                    name: 'trx_bged',
                    itemId: 'trx_bged',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    hidden: true,
                    disabled: true,
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama Bank ',
                    name: 'trx_trfbank',
                    itemId: 'trx_trfbank',
                    hidden: true,
                    disabled: true,
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Atas Nama ',
                    name: 'trx_trfnama',
                    itemId: 'trx_trfnama',
                    hidden: true,
                    disabled: true,
                    allowBlank: false
                }
            ]
        });
        me.callParent(arguments);
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */