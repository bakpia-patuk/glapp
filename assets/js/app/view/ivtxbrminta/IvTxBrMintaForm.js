/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.ivtxbrminta.IvTxBrMintaForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ivtxbrminta.ivtxbrmintaform',
    itemId: 'ivtxbrmintaform',
    border: false,
    preventHeader: false,
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
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    text: 'Simpan',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-save',
//                    action: 'dmbSave'
                },
                {
                    xtype: 'button',
                    text: 'Baru',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-add',
//                    action: 'dmbNew'
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Id ',
                    name: 'id',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Id Detail ',
                    name: 'idDetail',
                    hidden: true
                },
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
                    fieldLabel: 'Divisi ',
                    name: 'divisi',
                    triggerAction: 'all',
                    hideTrigger: false,
                    queryMode: 'remote',
                    minChars: 2,
                    store: 'ivtxbrminta.DivisiFormStore',
                    displayField: 'divisi_name',
                    valueField: 'id',
                    emptyText: 'Pilih Divisi',
                    allowBlank: false,
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    },
                    listeners: {
                        'afterrender': function(cmb, rec, opt) {
                            cmb.getStore().load();
                            cmb.setValue(USER_DIVISI);
                            cmb.setReadOnly(true);
                        },
//                        'change': function(cmb, rec, opt){
//                            var myVal = cmb.getValue(),
//                                ruanganStore = this.up('form').getForm().findField('ruangan').getStore(), 
//                                filterCollection = [];
//
//                            this.up('form').getForm().findField('ruangan').setReadOnly(false);
//                            
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'cabang_id',
//                                value: userCabang
//                            });
//                            filterCollection.push(statusFilter);
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'divisi_code',
//                                value: myVal
//                            });
//                            filterCollection.push(statusFilter);
//                    
//                            ruanganStore.clearFilter(true);
//                            ruanganStore.filter(filterCollection);
//                        }
                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Ruangan ',
                    name: 'ruangan',
                    triggerAction: 'all',
                    hideTrigger: false,
                    queryMode: 'remote',
                    minChars: 2,
//                    store: 'DivisiRuanganStore',
                    displayField: 'ruangName',
                    valueField: 'id',
                    emptyText: 'Pilih Ruangan',
                    allowBlank: true,
                    readOnly: true,
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Cabang Tujuan ',
                    margin: '10 0 5 0',
                    name: 'invtjCabang',
                    triggerAction: 'all',
                    //triggerCls: 'x-form-search-trigger',
                    hideTrigger: false,
                    queryMode: 'remote',
                    minChars: 3,
//                    store: 'CabangStore',
                    displayField: 'cabangName',
                    valueField: 'id',
                    emptyText: 'pilih cabang',
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    },
                    allowBlank: false,
//                    listeners: {
//                        'afterrender': function(cmb, rec, opt) {
//                            cmb.getStore().load();
//                        },
//                        'select': function() {
//                            this.up('form').getForm().findField('divisiTujuan').setReadOnly(false);
//                        }
//                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Divisi Tujuan ',
                    name: 'divisiTujuan',
                    triggerAction: 'all',
                    hideTrigger: false,
                    queryMode: 'remote',
                    minChars: 2,
                    readOnly: true,
//                    store: 'DivisiStore1',
                    displayField: 'divisiName',
                    valueField: 'divisiId',
                    emptyText: 'Pilih Divisi',
                    allowBlank: false,
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    },
//                    listeners: {
//                        'afterrender': function(cmb, rec, opt) {
//                            cmb.getStore().load();
//                        },
//                        'select': function(cmb, rec, opt){
//                            var myVal = cmb.getValue(),
//                                cabang = this.up('form').getForm().findField('invtjCabang').getValue(), 
//                                tujuanStore = this.up('form').getForm().findField('tujuan').getStore(), 
//                                filterCollection = [];
//
//                            this.up('form').getForm().findField('tujuan').setReadOnly(false);
//                            
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'cabang_id',
//                                value: cabang
//                            });
//                            filterCollection.push(statusFilter);
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'divisi_code',
//                                value: myVal
//                            });
//                            filterCollection.push(statusFilter);
//                    
//                            tujuanStore.clearFilter(true);
//                            tujuanStore.filter(filterCollection);
//                        }
//                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Ditujukan ',
                    name: 'tujuan',
                    triggerAction: 'all',
                    hideTrigger: false,
                    queryMode: 'remote',
                    minChars: 2,
//                    store: 'DivisiRuanganStore1',
                    displayField: 'ruangName',
                    valueField: 'id',
                    emptyText: 'Pilih Ruangan',
                    allowBlank: true,
                    readOnly: true,
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    },
//                    listeners: {
//                        'afterrender': function(cmb, rec, opt) {
//                            cmb.getStore().load();
//                        }
//                    }

                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Barang ',
                    name: 'pengBarang',
                    allowBlank: false,
                    triggerAction: 'query',
                    hideTrigger: true,
                    mode: 'remote',
                    minChars: 2,
//                    store: 'ItemStore',
                    displayField: 'itemName',
                    valueField: 'id',
                    forceSelection: true,
                    valueNotFoundText: 'Tidak ada barang',
                    emptyText: 'ketik nama barang',
                    matchFieldWidth: false,
                    listConfig: {
                        shadow: 'side',
                        minWidth: 185
                    },
//                    listeners: {
//                        'afterrender': function(cmb, rec, opt) {
//                            var myVal = cmb.getValue(),
//                                ruanganStore = this.up('form').getForm().findField('pengBarang').getStore(), 
//                                filterCollection = [];
//                            
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'mi_inv_stat',
//                                value: 0
//                            });
//                            filterCollection.push(statusFilter);
//                    
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'mi_child_stat',
//                                value: 1
//                            });
//                            filterCollection.push(statusFilter);
//                    
//                            ruanganStore.clearFilter(true);
//                            ruanganStore.filter(filterCollection);
//                        }
//                    }
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Qty. ',
                    hideTrigger: true,
                    name: 'jumlah',
                    allowBlank: false,
//                    listeners:{
//                        'change' : function() {
//                            if(this.getValue() !== 0) {
//                                this.up('form').down('#pengInvMintaBarang').enable();
//                            }
//                        }
//                    }
                },
                {
                    xtype: 'fieldcontainer',
                    width: 300,
                    layout: 'hbox',
                    items: [
                        {
                            html: '',
                            border: false,
                            width: 110,
                            bodyStyle: FORM_BG,
                            padding: '3 0 0 23',
                            align: 'right'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'icon-btn-add',
                            ui: 'blue-button',
                            itemId: 'pengInvMintaBarang',
                            disabled: true,
                            text: 'Tambah',
                            margins: '0 0 0 5',
//                            action: 'pengInvMintaBarang'
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