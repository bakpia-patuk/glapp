/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.kshitungbon.KsHitungBonForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.kshitungbon.kshitungbonform',
    itemId: 'kshitungbonform',
    border: false,
    preventHeader: false,
    bodyStyle: FORM_BG,
    bodyPadding: 10,
    buttonAlign: 'right',
    fieldDefaults: {
        width: 300,
        labelAlign: 'right',
        labelWidth: 115,
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
                    iconCls: 'icon-btn-save',
//                    action: 'kkSave'
                },
                {
                    xtype: 'button',
                    text: 'Cetak',
                    iconCls: 'icon-btn-print',
//                    action: 'kkSavePrint'
                },
                {
                    xtype: 'button',
                    text: 'Baru',
                    iconCls: 'icon-btn-add',
//                    action: 'kkNew'
                },
                {
                    xtype: 'button',
                    text: 'Hapus',
                    iconCls: 'icon-btn-delete',
//                    action: 'kkDelete'
                }
            ],
            items: [
                {
                    xtype: 'fieldcontainer',
                    width: 300,
                    layout: 'hbox',
                    items: [
//                        {
//                            html: 'Permintaan Bayar :',
//                            border: false,
//                            width: 115,
//                            bodyStyle: bg,
//                            padding: '3 0 0 3',
//                            align: 'right'
//                        },
//                        {
//                            xtype: 'button',
//                            iconCls: 'icon-btn-search',
//                            text: 'Ambil Data',
//                            margins: '0 0 0 5',
//                            handler: function () {
//                                var win = new Ext.widget('newwindow',{
//                                    title : 'Daftar Permintaan Pembayaran',
//                                    width: 600,
//                                    height: 350,
//                                    buttons:[
//                                        {
//                                            text: 'Simpan',
//                                            handler: function() {
//                                                this.up('window').destroy();
//                                            }
//                                        }
//                                    ]
//                                });
//
//                                var grid = new Ext.widget('listmintabayar');
//                                win.add(grid);
//                                win.show();
//                            }
//                        }
                    ]
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
                    xtype: 'textfield',
                    fieldLabel: 'Jam',
                    name: 'jam',
                    readOnly: true,
                    fieldCls: 'fieldReadOnly',
                    hidden: true
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Akun Asal ',
                    labelStyle: 'font-weight:bold;padding-bottom:10px;',
                    margins: '15 0 -10 0',
                    labelAlign: 'top',
                    items: [
                        {
                            xtype: 'triggerfield',
                            fieldLabel: 'Nama Akun ',
                            name: 'codeAkunRender',
                            triggerCls: 'x-form-search-trigger',
//                            onTriggerClick: function () {
//                                Ext.widget('windowakun').show();
//                            },
                            allowBlank: true,
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Nama Akun ',
                            name: 'namaAkun',
                            hidden: true,
                            readOnly: true,
                            fieldCls: 'fieldReadOnly'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Id Akun ',
                            name: 'id',
                            hidden: true,
                            readOnly: true,
                            fieldCls: 'fieldReadOnly',
                            value: '5'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Mata Uang',
                            name: 'symbol',
                            readOnly: true,
                            hidden: true,
                            fieldCls: 'fieldReadOnly'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Mata Uang',
                            name: 'akunCurr',
                            hidden: true,
                            value: '1'
                        },
//                        {
//                            xtype: 'combobox',
//                            fieldLabel: 'Nama Cabang',
//                            emptyText: 'Pilih Cabang',
//                            displayField: 'cabangName',
//                            valueField: 'cabangId',
//                            queryMode: 'local',
//                            name: 'namaCabang',
////                            store: 'CabangStore',
//                            forceSelection: true,
//                            typeAhead: true,
//                            hidden: true,
//                            listeners: {
//                                select: function (combo, record, index) {
//                                }
//                            }
//                        },
//                        {
//                            xtype: 'fieldcontainer',
//                            layout: 'vbox',
//                            itemId: 'containerCustom',
//                            items: [
//                                {
//                                    xtype: 'combobox',
//                                    fieldLabel: 'Akun Tujuan ',
//                                    emptyText: 'pilih akun tujuan',
//                                    displayField: 'tujuanName',
//                                    valueField: 'tujuanId',
//                                    mode: 'remote',
//                                    name: 'akunTujuan',
//                                    triggerAction: 'all',
////                                    store: 'AkunTujuanStore',
//                                    hidden: true,
//                                    listeners: {
//                                        select: function (combo, record, index) {
//                                            var form = this.up('form').down('#containerCustom');
//                                            Ext.Ajax.request({
//                                                url: BASE_PATH + 'akun/check_status_custom',
//                                                method: 'POST',
//                                                params: {data: combo.getValue()},
//                                                scope: this,
//                                                callback: function(options, success, response) {
//                                                    var resp = Ext.decode(response.responseText);
//
//                                                    if (resp.success === 'true') {
//                                                        for(var i in resp.data){
//                                                            var field = new Ext.form.TextField({
//                                                                width: 350,
//                                                                id: 'akun'+i,
//                                                                fieldLabel: resp.data[i].fieldLabel+' ',
//                                                                name: resp.data[i].fieldName
//                                                            });
//                                                            form.add(field);
//                                                            form.doLayout();
//                                                            console.log(i);
//                                                        }
//                                                    } else {
//                                                        for(var i = 0;i < 10; i++){
//                                                            if(Ext.getCmp('akun'+i)){
//                                                                form.remove(Ext.getCmp('akun'+i));
//                                                                form.doLayout();
//                                                            }
//                                                        }
//                                                    }
//                                                }
//                                            });
//                                        }
//                                    }
//                                }
//                            ]
//                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Nama Pegawai ',
                            emptyText: 'Pilih Pegawai',
                            displayField: 'pegName',
                            valueField: 'pegId',
                            queryMode: 'local',
                            mode: 'local',
                            name: 'pegName',
//                            store: 'PegStore',
                            hidden: false,
                            forceSelection: true,
                            typeAhead: true,
//                            listeners: {
                        }
                    ]
                },
                Ext.create('Ext.ux.form.NumericField',
                    {
                        fieldLabel: 'Jumlah ',
                        name: 'jumlahTrx',
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
                        readOnly: false
                    }),
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Keterangan ',
                    name: 'keterangan',
                    itemId: 'keterangan',
                    allowBlank: false,
                    readOnly: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Jenis Kas',
                    name: 'tipe_kas',
                    value: '0',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'ID',
                    name: 'idKk',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'ID Minta Bayar',
                    name: 'idMintaBayar',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Ref. Trans',
                    name: 'no_refTrx',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'isKasBank',
                    name: 'kasBank',
                    hidden: true,
                    value: 1
                }
            ]
        });

        me.callParent(arguments);
    },
    listeners: {
        afterRender: function () {
            /*var jam = function(){
             Ext.getCmp('jam').setValue(Ext.Date.format(new Date(),'H:i:s'));
             }
             //Configuration object for the task
             var tugas = {
             run: jam, //the function to run
             interval: 1000 //every second
             }
             //creates a new manager
             var jalan = new Ext.util.TaskRunner();
             jalan.start(tugas); //start runing the task every one second
             //Clock funtion End*/
        }
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */