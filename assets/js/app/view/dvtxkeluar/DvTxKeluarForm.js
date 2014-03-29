/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.dvtxkeluar.DvTxKeluarForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.dvtxkeluar.dvtxkeluarform',
    itemId: 'dvtxkeluarform',
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
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Simpan',
                    iconCls: 'icon-btn-save',
//                    action: 'dbkSave'
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Baru',
                    hidden: true,
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
//                {
//                    xtype: 'textfield',
//                    fieldLabel: 'Id Ruang ',
//                    name: 'idRuang',
//                    hidden: true
//                },
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
//                    store: 'DivisiStore',
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
//                            cmb.setValue(parseInt(userDivisi));
//                            cmb.setReadOnly(true);
//                        },
//                        'change': function(cmb, rec, opt){
//                            var myVal = cmb.getValue(),
//                                ruanganStore = this.up('form').getForm().findField('idRuang').getStore(), 
//                                filterCollection = [];
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
//                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Ruangan ',
                    name: 'idRuang',
                    triggerAction: 'all',
                    hideTrigger: false,
                    queryMode: 'remote',
                    minChars: 2,
                    hidden: false,
//                    store: 'DivisiRuanganStore',
                    displayField: 'ruangName',
                    valueField: 'id',
                    emptyText: 'Pilih Ruangan',
                    allowBlank: true,
                    readOnly: false,
                    matchFieldWidth: false,
                    listConfig: {
                        minWidth: 185
                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Barang ',
                    name: 'pengBarang',
                    allowBlank: false,
                    readOnly: false,
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
                    }
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Qty. Keluar ',
                    hideTrigger: true,
                    name: 'jumlah',
                    minValue: 1,
                    allowBlank: false,
//                    listeners:{
//                        'change' : function() {
//                            if(this.getValue() > 0) {
//                                this.up('form').down('#pengDivbarangKeluar').enable();
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
                            itemId: 'pengDivbarangKeluar',
                            disabled: true,
                            text: 'OK',
                            margins: '0 0 0 5',
//                            action: 'pengDivbkr'
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