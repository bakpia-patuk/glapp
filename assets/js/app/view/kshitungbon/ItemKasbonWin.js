/**
 * @author coepoe
 **/
Ext.define('GlApp.view.kshitungbon.ItemKasbonWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.kshitungbon.itemkasbonwin',
    itemId: 'itemkasbonwin',
    title: 'ITEM KAS BON',
    width: 800,
    height: 300,
    modal: true,
    resizable: false,
    border: false,
    autoScroll: true,
    layout: 'fit',
    autoShow: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items:[
                {
                    xtype: 'panel',
                    itemId: 'kasbonpanel',
                    border: false,
                    bodyPadding: '2 2 2 2',
                    layout: 'border',
                    defaults: {
                        border: true,
                        split: true
                    },
                    bbar:[
                        '->',
                        {
                            text: 'Cetak',
                            iconCls: 'icon-btn-print',
                            itemId: 'savePrintKbDetail'
                        },
                        {
                            text: 'Simpan',
                            iconCls: 'icon-btn-save',
                            itemId: 'saveKbDetail'
                        },
                        {
                            text: 'Batal',
                            iconCls: 'icon-btn-cross',
                            itemId: 'batalKbDetail'
                        }
                    ],
                    items:[
                        {
                            region: 'west',
                            layout: 'fit',
                            width: 380,
                            items:[
                                {
                                    xtype: 'form',
                                    itemId: 'kasbonform',
                                    bodyPadding: 10,
                                    fieldDefaults: {
                                        width: 350,
                                        labelAlign: 'right',
                                        labelWidth: 80,
                                        msgTarget: 'side'
                                    },
                                    bbar: [
                                        '->',
                                        {
                                            text: 'Baru',
                                            iconCls: 'icon-btn-add',
                                            itemId: 'windowNewForm'
                                        },
                                        '-',
                                        {
                                            text: 'Tambah',
                                            iconCls: 'icon-btn-save',
                                            itemId: 'windowSaveDetailKasbon'
                                        }
                                    ],
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Tanggal ',
                                            name: 'tgl_trx',
                                            format: 'd/M/Y',
                                            submitFormat: 'Y-m-d',
                                            value: new Date(),
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Jam',
                                            name: 'jam',
                                            readOnly: true,
                                            fieldCls: 'fieldReadOnly',
                                            hidden: true
                                        },
                                        {
                                            xtype: 'textareafield',
                                            fieldLabel: 'Transakasi ',
                                            name: 'keterangan',
                                            height: 50,
                                            itemId: 'keterangan',
                                            allowBlank: false
                                        },
                                        Ext.create('Ext.ux.form.NumericField', {
                                            fieldLabel: 'Jumlah ',
                                            name: 'jumlah_trx',
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
                                            readOnly: false,
                                            listeners: {
                                                blur: function() {
                                                    var val = this.getValue(),
                                                        totalKb = this.up('window').down('#kasbonpanel').down('#kasbonform').getForm().findField('kas_jumlah').getValue(),
                                                        sisa = this.up('window').down('#kasbonpanel').down('#kasbonform').getForm().findField('selisih'),
                                                        store = this.up('window').down('#kasbonpanel').down('#kasbongrid').getStore(),
                                                        total = 0;

                                                        store.each(function (rec) {
                                                            money = rec.get('jumlah_trx');
                                                            total += money;
                                                        });

                                                        sisa.setValue(totalKb - (val + total));
                                                }
                                            }
                                        }),
                                        Ext.create('Ext.ux.form.NumericField', {
                                            fieldLabel: 'Jumlah Kasbon ',
                                            name: 'kas_jumlah',
                                            decimalPrecision: 2,
                                            decimalSeparator: ',',
                                            alwaysDisplayDecimals: true,
                                            allowNegative: false,
                                            minValue: 0, //prevents negative numbers
                                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                                            hideTrigger: true,
                                            keyNavEnabled: false,
                                            mouseWheelEnabled: false,
                                            readOnly: true,
                                            hidden: true
                                        }),
                                        Ext.create('Ext.ux.form.NumericField', {
                                            fieldLabel: 'Selisih ',
                                            name: 'selisih',
                                            decimalPrecision: 2,
                                            decimalSeparator: ',',
                                            alwaysDisplayDecimals: true,
                                            allowNegative: false,
                        //                    minValue: 0, //prevents negative numbers
                                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                                            hideTrigger: true,
                                            keyNavEnabled: false,
                                            mouseWheelEnabled: false,
                                            allowBlank: true,
                                            readOnly: false
                                        }),
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'ID',
                                            name: 'kasbon_id',
                                            hidden: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'ID Trx',
                                            name: 'id',
                                            hidden: true
                                        }
                                    ]
                                },
                                {

                                }
                            ]
                        },
                        {
                            region: 'center',
                            width: 300,
                            forceFit: true,
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'grid',
                                    store: 'kshitungbon.DetailKbStore',
                                    itemId: 'kasbongrid',
                                    columns: [
                                        Ext.create('Ext.grid.RowNumberer'),
                                        {
                                            xtype: 'gridcolumn',
                                            flex: 0.3,
                                            text: 'NAMA TRANSAKSI',
                                            dataIndex: 'keterangan'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            flex: 0.2,
                                            align: 'right',
                                            header: 'JUMLAH',
                                            dataIndex: 'jumlah_trx'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                        
            ]
        });

        me.callParent(arguments);
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */