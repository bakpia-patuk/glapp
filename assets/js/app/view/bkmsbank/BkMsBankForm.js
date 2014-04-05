/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.bkmsbank.BkMsBankForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.bkmsbank.bkmsbankform',
    itemId: 'bkmsbankform',
    border: false,
    bodyStyle: FORM_BG,
    bodyPadding: 10,
    buttonAlign: 'right',
    fieldDefaults: {
        width: 250,
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
                    ui: 'blue-button',
                    text: 'Simpan',
                    iconCls: 'icon-btn-save',
                    itemId: 'MsBankSave'
                },
                '-',
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Baru',
                    iconCls: 'icon-btn-add',
                    itemId: 'MsBankNew'
                },
                '-',
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Hapus',
                    iconCls: 'icon-btn-delete',
                    itemId: 'MsBankDelete'
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'ID ',
                    name: 'id',
                    hidden: true
                },
                {
                    xtype: 'combobox',
                    emptyText: 'Pilih Cabang',
                    fieldLabel: 'Bank Cabang',
                    displayField: 'cabang_alias',
                    valueField: 'id',
                    queryMode: 'remote',
                    name: 'bank_cabang',
                    allowBlank: false,
                    triggerAction: 'all',
                    valueNotFoundText: 'Tidak ada Data',
                    forceSelection: true,
                    store: 'bkmsbank.CabangStore',
//                    hidden: userCabang === "14" ? false : true,
//                    listeners: {
//                        select: function() {
//                            this.up('form').getForm().findField('golAkun').enable();
//                            var store = this.up('form').getForm().findField('golAkun').getStore();
//                            store.getProxy().extraParams.cabang = this.getValue();
//                            var filterCollection = [];
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'akun_group',
//                                value: 1
//                            });
//
//                            filterCollection.push(statusFilter);
//
//                            var statusFilter = new Ext.util.Filter({
//                                property: 'akun_head_status',
//                                value: 0
//                            });
//
//                            filterCollection.push(statusFilter);
//
//                            store.clearFilter(true);
//                            store.filter(filterCollection);
//                        }
//                    }
                },
                {
                    xtype: 'comboboxedit',
                    fieldLabel: 'Nama Bank ',
                    name: 'bank_nama',
                    triggerAction: 'all',
                    store: 'bkmsbank.BankNasStore',
                    displayField: 'banknas_name',
                    valueField: 'id',
                    minChars: 2,
                    allowBlank: false,
                    queryMode: 'remote',
                    forceSelection: true,
                    valueNotFoundText: 'Tidak ada',
//                    onTrigger2Click: function() {
//                        var win = new Ext.widget('masterbank.newwindow', {
//                            width: 450,
//                            height: 300,
//                            buttons: [
//                                {
//                                    text: 'Simpan',
//                                    itemId: 'newKec',
//                                    handler: function(btn, e, opt) {
//                                        btn.up('window').destroy();
//                                    }
//                                }
//                            ]
//                        });
//
//                        var grid = new Ext.widget('masterbank.bngrid', {
//                            itemId: 'kecGridIden'
//                        });
//                        win.setTitle('Daftar Bank Nasional');
//                        win.add(grid);
//                        grid.getStore().load();
//                        win.show();
//                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama Alias ',
                    allowBlank: false,
                    name: 'bank_alias'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Atas Nama ',
                    allowBlank: false,
                    name: 'bank_reknama'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Rekening ',
                    allowBlank: false,
                    name: 'bank_rekno'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Alamat Bank ',
                    name: 'bank_alamat'
                },
                {
                    xtype: 'combogrid',
                    fieldLabel: 'Gol. Akun ',
                    name: 'bank_akun',
                    itemId: 'bank_akun',
                    emptyText: '',
                    matchFieldWidth: false,
                    displayField: 'namaAkun',
                    valueField: 'id',
                    renderer: 'uppercase',
                    queryMode: 'remote',
                    minChar: 2,
//                    store: 'AkunStore',
                    triggerAction: 'all',
                    allowBlank: false,
                    forceSelection: true,
                    valueNotFoundText: 'Belum Ada Data',
                    disabled: true,
                    listConfig: {
                        width: 400,
                        viewConfig: {
                            // /autoScroll: true,
                            emptyText: 'Tidak ada daftar Akun',
                            deferEmptyText: false
                        },
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                width: 100,
                                header: 'Kode',
                                dataIndex: 'bank_kodeakun'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 300,
                                header: 'Nama Akun',
                                dataIndex: 'namaAkun',
                                renderer: Ext.util.Format.uppercase
                            }
                        ]
                    }
                },
                {
                    xtype: 'fieldset',
                    collapsible: true,
                    hidden: true,
                    title: 'Set Akun',
                    itemId: 'setAkunForm',
                    fieldDefaults: {
                        width: 230,
                        labelAlign: 'right',
                        labelWidth: 95,
                        msgTarget: 'side'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Group Akun ',
                            emptyText: '',
                            displayField: 'bank_golakun',
                            valueField: 'bank_golakun',
                            queryMode: 'remote',
                            disabled: true,
                            name: 'bank_golakun',
//                            store: 'GroupAkunStore',
                            triggerAction: 'all',
                            forceSelection: true,
                            typeAhead: true,
                            allowBlank: false,
                            valueNotFoundText: 'Tidak ada Data',
//                            listeners: {
//                                change: function() {
//                                    this.up('form').getForm().findField('golAkun').enable();
//                                    var store = Ext.StoreMgr.lookup('AkunStore');
//                                    var filterCollection = [];
//
//                                    var statusFilter = new Ext.util.Filter({
//                                        property: 'akun_group',
//                                        value: this.getValue()
//                                    });
//
//                                    filterCollection.push(statusFilter);
//
//                                    var statusFilter = new Ext.util.Filter({
//                                        property: 'akun_head_status',
//                                        value: 0
//                                    });
//
//                                    filterCollection.push(statusFilter);
//
//                                    store.clearFilter(true);
//                                    store.filter(filterCollection);
//                                }
//                            }
                        }
                    ]
                },
                {
                    xtype: 'checkbox',
                    fieldLabel: 'Active ',
                    boxLabel: 'Ya',
                    hidden: true,
                    name: 'bank_active',
                    inputValue: '1',
                    uncheckedValues: '0',
                    checked: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Id Akun',
                    allowBlank: true,
                    hidden: true,
                    name: 'bankAkun'
                }
            ]
        });

        me.callParent(arguments);
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */