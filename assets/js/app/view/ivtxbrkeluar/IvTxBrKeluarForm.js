/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.ivtxbrkeluar.IvTxBrKeluarForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ivtxbrkeluar.ivtxbrkeluarform',
    itemId: 'ivtxbrkeluarform',
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
//                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Ruangan ',
                    name: 'ruangan',
                    triggerAction: 'all',
                    hideTrigger: false,
                    queryMode: 'remote',
                    minChars: 2,
                    hidden: true,
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
                    fieldLabel: 'Barang ',
                    name: 'pengBarang',
                    allowBlank: false,
                    readOnly: true,
                    triggerAction: 'query',
                    hideTrigger: true,
                    mode: 'remote',
                    minChars: 2,
//                    store: 'ItemStore',
                    displayField: 'itemName',
                    valueField: 'id',
                    forceSelection: true,
                    valueNotFoundText: 'Tidak ada barang',
                    emptyText: 'nama barang',
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
//                            if(this.getValue() !== 0) {
//                                this.up('form').down('#pengInvbarangKeluar').enable();
//                            }
//                        }
//                    }
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Qty. Check ',
                    hideTrigger: true,
                    name: 'jumlahOld',
                    allowBlank: false,
                    hidden: true
                },
                {
                    xtype: 'combobox',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    name: 'brgKeluarStat',
                    allowBlank: true,
                    fieldLabel: 'Status',
                    store: new Ext.data.SimpleStore({
                        id: 0,
                        fields: [
                            'typeCode', //numeric value is the key
                            'type' //the text value is the value
                        ],
                        data: [
                            [0, 'Hibah'],
                            [1, 'Di Pinjam']
                        ]
                    }),
//                    listeners: {
//                        select: function(cmb, e, opt) {
//                            var val = cmb.getValue();
//                            
//                            if(val === 1) {
//                                cmb.up('form').getForm().findField('pinjamEd').show();
//                                cmb.up('form').getForm().findField('pinjamEd').enable();
//
//                            } else {
//                                cmb.up('form').getForm().findField('pinjamEd').hide();
//                                cmb.up('form').getForm().findField('pinjamEd').disable();
//
//                            }
//                        }
//                    }
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tgl. ED ',
                    name: 'pinjamEd',
                    allowBlank: false,
                    hidden: true,
                    disable: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Barang ',
                    name: 'noBarang',
                    allowBlank: true,
                    hidden: false
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Keterangan ',
                    name: 'bkinvDesc',
                    height: 50,
                    allowBlank: true,
                    hidden: false
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
                            itemId: 'pengInvbarangKeluar',
                            disabled: true,
                            text: 'OK',
                            margins: '0 0 0 5',
//                            action: 'pengInvbarangKeluar'
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