/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.akmstelisa.AkMsTelisaForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.akmstelisa.akmstelisaform',
    itemId: 'akmstelisaform',
    bodyStyle: FORM_BG,
    bodyPadding: '10 5',
    buttonAlign: 'right',
    fieldDefaults: {
        width: 250,
        labelAlign: 'right',
        labelWidth: 100,
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
//                    action: 'mtSave'
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Baru',
                    iconCls: 'icon-btn-add',
//                    action: 'mtNew'
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Hapus',
                    iconCls: 'icon-btn-delete',
//                    action: 'mtDelete'
                }
            ],
            items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Id ',
                    name: 'id',
                    readOnly: true,
                    hidden: true
                },
                {
                    xtype: 'combobox',
                    emptyText: 'Pilih Cabang',
                    fieldLabel: 'Cabang ',
                    displayField: 'cabangName',
                    valueField: 'id',
                    queryMode: 'remote',
                    name: 'mt_cabang',
                    allowBlank: false,
                    triggerAction: 'all',
                    valueNotFoundText: 'Tidak ada Data',
                    forceSelection: true,
//                    store: 'CabangStore',
//                    hidden: userCabang === "14" ? false : true,
//                    listeners: {
//                        afterrender: function() {
//                            if(userCabang !== "14") {
//                                this.getStore().load();
//                                this.setValue(parseInt(userCabang));
//                            }
//                        }
//                    }
                },
                {
                    xtype: 'comboboxedit',
                    fieldLabel: 'Jenis Biaya ',
                    name: 'mt_jenis',
                    triggerAction: 'all',
//                    store: 'TelisaJenisStore',
                    displayField: 'mtj_name',
                    valueField: 'id',
                    minChars: 2,
                    allowBlank: false,
                    queryMode: 'remote',
                    forceSelection: true,
                    valueNotFoundText: 'Tidak ada data',
//                    onTrigger2Click: function() {
//                        var win = new Ext.widget('mastertelisa.newwindow', {
//                            width: 450,
//                            height: 300,
//                            buttons: [
//                                {
//                                    text: 'Simpan',
//                                    itemId: 'newMjt',
//                                    handler: function(btn, e, opt) {
//                                        btn.up('window').destroy();
//                                    }
//                                }
//                            ]
//                        });
//
//                        var grid = new Ext.widget('mastertelisa.jtgrid', {
//                            itemId: 'mtjGrid'
//                        });
//                        win.setTitle('Daftar Jenis Biaya');
//                        win.add(grid);
//                        grid.getStore().load();
//                        win.show();
//                    },
//                    listeners: {
//                        select: function() {
//                            var val = this.getValue();
//                            if(val === 4) {
//                                this.up('form').getForm().findField('mt_surat').enable();
//                                this.up('form').getForm().findField('mt_surat').show();
//
//                                this.up('form').getForm().findField('mt_rek').disable();
//                                this.up('form').getForm().findField('mt_rek').hide();
//                            } else {
//                                this.up('form').getForm().findField('mt_surat').disable();
//                                this.up('form').getForm().findField('mt_surat').hide();
//
//                                this.up('form').getForm().findField('mt_rek').enable();
//                                this.up('form').getForm().findField('mt_rek').show();
//                            }
//                        }
//                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Atas Nama ',
                    allowBlank: false,
                    name: 'mt_nama'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Rekening ',
                    allowBlank: false,
                    name: 'mt_rek'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Jenis Surat ',
                    hidden: true,
                    disabled: true,
                    allowBlank: false,
                    name: 'mt_surat'
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Alamat ',
                    name: 'mt_alamat'
                }
            ]
        });

        me.callParent(arguments);
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */