/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdmssupplier.MsSupplierForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.gdmssupplier.mssupplierform',
    itemId: 'mssupplierform',
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
    initComponent: function() {
        var me = this;

        var form = me;

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    text: 'Simpan',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-save',
                    action: 'suppSave'
                },
                {
                    xtype: 'button',
                    disabled: false,
                    text: 'Baru',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-add',
                    action: 'suppNew'
                },
                {
                    xtype: 'button',
                    disabled: false,
                    text: 'Hapus',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-delete',
                    action: 'suppDelete'
                }
            ],
            items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Id Supplier ',
                    name: 'idms',
                    id: 'idms',
                    hidden: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'kode ',
                    name: 'kodems',
                    itemId: 'kodems',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'kode sub ',
                    name: 'kodesubms',
                    itemId: 'kodesubms',
                    hidden: true
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Filter ',
                    margin: '-3 0 0 0',
                    items: [
                        {
                            boxLabel: 'Baru',
                            name: 'tipe',
                            inputValue: '1',
                            width: 50,
                            checked: true,
                            listeners: {
                                change: function(rb, nv, ov, options) {
                                    if (nv) {
                                        form.down('#supplierbaru').show();
                                        form.down('#supplierlama').hide();
                                        form.down('#supplierlama').disable();
                                        form.down('#supplierbaru').enable();
                                    }
                                }
                            }
                        },
                        {
                            boxLabel: 'Lama',
                            name: 'tipe',
                            width: 60,
                            inputValue: '2',
                            listeners: {
                                change: function(rb, nv, ov, options) {
                                    if (nv) {
                                        form.down('#supplierbaru').hide();
                                        form.down('#supplierlama').show();
                                        form.down('#supplierbaru').disable();
                                        form.down('#supplierlama').enable();
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama Supplier ',
                    name: 'namams',
                    itemId: 'supplierbaru',
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Supplier Lama ',
                    name: 'namamsbaru',
//                    store: 'MasterSupplierHeaderStore',
                    emptyText: 'Pilih Supplier',
                    disabled: true,
                    hidden: true,
                    matchFieldWidth: false,
                    minChars: 2,
                    itemId: 'supplierlama',
                    displayField: 'namams',
                    valueField: 'idms',
                    triggerAction: 'all',
                    allowBlank: false,
                    listeners: {
                        select: function(cmb, rec, opt) {
                            var val = cmb.getValue(),
                                    data = cmb.findRecordByValue(val);

                            form.down('#kodems').setValue(data.get('kodems'));
                            form.down('#kodesubms').setValue(data.get('kodesubms'));
                        }
                    }
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Alamat ',
                    height: 50,
                    name: 'alamatms',
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Nama Kota ',
                    name: 'kotams',
                    triggerAction: 'all',
                    queryMode: 'remote',
                    minChars: 2,
//                    store: 'KotaKabupatenStore',
                    displayField: 'namakk',
                    valueField: 'idkk',
                    matchFieldWidth: false,
                    emptyText: 'pilih kota',
                    forceSelection: true,
                    valueNotFoundText: 'Belum ada data',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Email ',
                    name: 'emailms',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Telp. ',
                    name: 'tlpms',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Telp. (Alt) ',
                    name: 'tlp2ms'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No HP ',
                    name: 'hpms',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Contact 1 ',
                    name: 'kontakms1',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Contact 2 ',
                    name: 'kontakms2'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Fax ',
                    name: 'faxms',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama Bank ',
                    name: 'bankms',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Rekening ',
                    name: 'norekms',
                    allowBlank: true
                }
            ]
        });
        me.callParent(arguments);
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */