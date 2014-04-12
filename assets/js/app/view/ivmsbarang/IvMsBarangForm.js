/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.ivmsbarang.IvMsBarangForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ivmsbarang.ivmsbarangform',
    itemId: 'ivmsbarangform',
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
                    ui: 'blue-button',
                    text: 'Simpan',
                    iconCls: 'icon-btn-save',
                    itemId: 'IvMbSave'
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Baru',
                    hidden: false,
                    iconCls: 'icon-btn-add',
                    itemId: 'IvMbNew'
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
                    xtype: 'combobox',
                    fieldLabel: 'Cabang ',
                    name: 'db_cabang',
                    emptyText: 'Pilih',
                    displayField: 'cabang_alias',
                    valueField: 'id',
                    queryMode: 'remote',
                    allowBlank: true,
                    triggerAction: 'all',
                    valueNotFoundText: 'Tidak ada Data',
                    store: 'ivmsbarang.CabangFormStore',
                    listeners: {
                        'afterrender': function(cmb, rec, opt) {
                            cmb.getStore().load();
                            if(CABANG_ID !== 1) {
                                cmb.setValue(parseInt(CABANG_ID));
                                cmb.setReadOnly(true);
                            } else {
                                cmb.setReadOnly(false);
                            }
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Divisi ',
                    name: 'db_divisi',
                    triggerAction: 'all',
                    hideTrigger: false,
                    queryMode: 'remote',
                    minChars: 2,
                    store: 'ivmsbarang.DivisiFormStore',
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
                            if(CABANG_ID !== 1) {
                                cmb.setValue(USER_DIVISI);
                                cmb.setReadOnly(true);
                            } else {
                                cmb.setReadOnly(false);
                            }
                        },
                        'change': function(cmb, rec, opt){
                            var myVal = cmb.getValue(),
                                ruanganStore = this.up('form').getForm().findField('db_ruang').getStore(), 
                                filterCollection = [];

                            this.up('form').getForm().findField('db_ruang').setReadOnly(false);
                            
                            var statusFilter = new Ext.util.Filter({
                                property: 'cabang_id',
                                value: CABANG_ID
                            });
                            filterCollection.push(statusFilter);

                            var statusFilter = new Ext.util.Filter({
                                property: 'divisi_id',
                                value: myVal
                            });
                            filterCollection.push(statusFilter);
                    
                            ruanganStore.clearFilter(true);
                            ruanganStore.filter(filterCollection);
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Ruangan ',
                    name: 'db_ruang',
                    triggerAction: 'all',
                    hideTrigger: false,
                    queryMode: 'remote',
                    minChars: 2,
                    hidden: false,
                    store: 'ivmsbarang.RuangFormStore',
                    displayField: 'ruangName',
                    valueField: 'id',
                    emptyText: 'Pilih Ruangan',
                    allowBlank: false,
                    readOnly: true,
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Barang ',
                    name: 'db_barangid',
                    allowBlank: false,
                    readOnly: false,
                    triggerAction: 'query',
                    hideTrigger: true,
                    mode: 'remote',
                    minChars: 2,
                    store: 'ivmsbarang.BarangStore',
                    displayField: 'mi_name',
                    valueField: 'id',
                    forceSelection: true,
                    valueNotFoundText: 'Tidak ada barang',
                    emptyText: 'ketik nama barang',
                    matchFieldWidth: false,
                    listConfig: {
                        shadow: 'side',
                        minWidth: 185
                    },
                    listeners: {
                        afterrender: function(cmb, rec, opt) {
                            var myVal = cmb.getValue(),
                                ruanganStore = cmb.getStore(), 
                                filterCollection = [];
                            
                            var statusFilter = new Ext.util.Filter({
                                property: 'mi_inv_stat',
                                value: 2
                            });
                            filterCollection.push(statusFilter);
                    
                            var statusFilter = new Ext.util.Filter({
                                property: 'mi_child_stat',
                                value: 1
                            });
                            filterCollection.push(statusFilter);
                    
                            ruanganStore.clearFilter(true);
                            ruanganStore.filter(filterCollection);
                        },
                        select: function(cmb, rec, opt) {
                            var val = cmb.getValue(),
                                record = cmb.findRecordByValue(val);
                            this.up('form').getForm().findField('db_golid').getStore();
                            if(record) {
                                this.up('form').getForm().findField('db_golid').setValue(record.get('mi_parent_id'));
                            }
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Golongan ',
                    name: 'db_golid',
                    triggerAction: 'all',
                    hideTrigger: false,
                    queryMode: 'remote',
                    minChars: 2,
                    hidden: false,
                    store: 'ivmsbarang.GolonganStore',
                    displayField: 'mi_name',
                    valueField: 'id',
                    allowBlank: false,
                    readOnly: true,
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    }
                },
                Ext.create('Ext.ux.form.NumericField', {
                    fieldLabel: 'Nilai Perolehan ',
                    name: 'db_value',
                    flex: 1,
                    decimalPrecision: 2,
                    decimalSeparator: ',',
                    alwaysDisplayDecimals: true,
                    allowNegative: false,
                    minValue: 0, //prevents negative numbers
                    value: 0,
                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    allowBlank: false
                }),
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Seri Barang ',
                    name: 'db_barangseri',
                    allowBlank: false,
                    hidden: false
                },
                {
                    xtype: 'fieldcontainer',
                    width: 300,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            width: 160,
                            fieldLabel: 'Masa Penyusutan ',
                            name: 'db_penyusutan',
                            allowBlank: true,
                            hidden: false
                        },
                        {
                            xtype: 'label',
                            text: 'Bulan',
                            margins: '3 0 0 5'
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