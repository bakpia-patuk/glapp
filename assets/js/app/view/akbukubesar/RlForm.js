/**
 * @author Isht Ae
 **/
//var bulanStore = new Ext.data.SimpleStore(
//        {
//            id: 0,
//            fields: [
//                'typeCode', //numeric value is the key
//                'type' //the text value is the value
//            ],
//            data: [
//                [1, 'Januari'],
//                [2, 'Februari'],
//                [3, 'Maret'],
//                [4, 'April'],
//                [5, 'Mei'],
//                [6, 'Juni'],
//                [7, 'Juli'],
//                [8, 'Agustus'],
//                [9, 'September'],
//                [10, 'Oktober'],
//                [11, 'November'],
//                [12, 'Desember']
//            ]
//        }
//);

Ext.define('GlApp.view.akbukubesar.RlForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.akbukubesar.rlform',
    itemId: 'rlform',
    title: 'RUGI LABA',
    border: false,
    preventHeader: false,
    bodyStyle: FORM_BG,
    bodyPadding: 10,
    buttonAlign: 'right',
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 80,
        msgTarget: 'side'
    },
    autoScroll: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            bbar: [
                {
                    xtype: 'button',
                    text: 'Setting',
                    ui: 'blue-button',
                    iconCls: 'btn-setting-gear',
                    disabled: false,
//                    action: 'rlSetting'
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Proses',
                    ui: 'blue-button',
                    iconCls: 'btn-save',
                    disabled: false,
//                    listeners: {
//                        click: function() {
//                            var form = this.up('form').getForm();
//
//                            if (form.isValid())
//                            {
//                                Ext.Ajax.request({
//                                    url: BASE_PATH + 'data/checkRL',
//                                    method: 'POST',
//                                    callback: function(options, success, response) {
//                                        if (Ext.decode(response.responseText).success === 'false') {
//                                            Ext.Msg.alert("Error", "Isi data setting Laporan Rugi Laba");
//                                        } else {
//                                            Ext.Ajax.request({
//                                                url: BASE_PATH + 'data/laporanRL_check',
//                                                method: 'POST',
//                                                params: form.getValues(),
//                                                callback: function(options, success, response) {
//                                                    if (Ext.decode(response.responseText).success === 'false') {
//                                                        Ext.Msg.alert("Info", "Tidak ada data");
//                                                    }
//                                                    else
//                                                    {
//                                                        var tipe = form.findField('tipe').getGroupValue(),
//                                                                isi;
//
//                                                        if (tipe === 1)
//                                                        {
//                                                            isi = Ext.Date.format(form.findField('tglAwal').getValue(), 'Y-m-d') + 'a' + Ext.Date.format(form.findField('tglAkhir').getValue(), 'Y-m-d');
//                                                        }
//                                                        else if (tipe === 2)
//                                                        {
//                                                            isi = form.findField('bulan').getValue();
//                                                        }
//                                                        else
//                                                        {
//                                                            isi = form.findField('tahun').getValue();
//                                                        }
//                                                        window.open(BASE_PATH + 'data/print_rl/' + tipe + '/' + isi, "Print Preview", "scrollbars=1,height=700,width=950");
//                                                    }
//                                                }
//                                            });
//                                        }
//                                    }
//                                });
//                            }
//                        }
//                    }
                },
                '-',
                {
                    xtype: 'button',
                    text: 'Reset',
                    ui: 'blue-button',
                    iconCls: 'btn-cancel-toolbar',
                    disabled: false,
//                    action: 'rlReset'
                }
            ],
            items: [
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Filter ',
                    items: [
                        {
                            boxLabel: 'Tanggal',
                            name: 'tipe',
                            inputValue: 1,
                            checked: true,
//                            listeners: {
//                                change: function(rb, nv, ov, options) {
//                                    if (nv) {
//                                        this.up('form').getForm().findField('tglAwal').enable();
//                                        this.up('form').getForm().findField('tglAkhir').enable();
//
//                                        this.up('form').getForm().findField('bulan').disable();
//                                        this.up('form').getForm().findField('tahun').disable();
//                                    }
//                                }
//                            }
                        },
                        {
                            boxLabel: 'Bulan',
                            name: 'tipe',
                            inputValue: 2,
//                            listeners: {
//                                change: function(rb, nv, ov, options) {
//                                    if (nv) {
//                                        this.up('form').getForm().findField('bulan').enable();
//
//                                        this.up('form').getForm().findField('tahun').disable();
//                                        this.up('form').getForm().findField('tglAwal').disable();
//                                        this.up('form').getForm().findField('tglAkhir').disable();
//                                    }
//                                }
//                            }
                        },
                        {
                            boxLabel: 'Tahun',
                            name: 'tipe',
                            inputValue: 3,
//                            listeners: {
//                                change: function(rb, nv, ov, options) {
//                                    if (nv) {
//                                        this.up('form').getForm().findField('tahun').enable();
//
//                                        this.up('form').getForm().findField('bulan').disable();
//                                        this.up('form').getForm().findField('tglAwal').disable();
//                                        this.up('form').getForm().findField('tglAkhir').disable();
//                                    }
//                                }
//                            }
                        }
                    ]
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tgl Awal ',
                    name: 'tglAwal',
                    hidden: false,
                    disabled: false,
                    format: 'd F Y',
                    submitFormat: 'Y-m-d',
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tgl Akhir ',
                    name: 'tglAkhir',
                    hidden: false,
                    disabled: false,
                    format: 'd M Y',
                    submitFormat: 'Y-m-d',
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    name: 'bulan',
                    itemId: 'bulan',
//                    store: bulanStore,
                    fieldLabel: 'Bulan',
                    emptyText: 'Pilih Bulan ',
                    hidden: false,
                    disabled: true,
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Tahun ',
                    name: 'tahun',
                    emptyText: 'isi tahun',
                    hidden: false,
                    disabled: true,
                    allowBlank: false
                }
            ]
        });

        me.callParent(arguments);
    },
    listeners: {
        afterRender: function() {
        }
    }
});

/* End of file reservasiForm.js */
/* Location: ./assets/js/app/view/reservasi/reservasiForm.js */