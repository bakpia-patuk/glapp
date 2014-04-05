/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.ksmintakas.GetKsMintaKas', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ksmintakas.getksmintakas',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    ui: 'green-button',
                    text: 'Simpan',
                    iconCls: 'icon-btn-save',
                    itemId: 'MintaKasSave'
                },
                '-',
                {
                    xtype: 'button',
                    ui: 'green-button',
                    text: 'Baru',
                    iconCls: 'icon-btn-add',
                    itemId: 'MintaKasNew'
                },
                '-',
                {
                    xtype: 'button',
                    ui: 'green-button',
                    text: 'Hapus',
                    iconCls: 'icon-btn-delete',
                    itemId: 'MintaKasDelete'
                },
                '->',
                {
                    xtype: 'tbtext',
                    text: '<strong>Filter :</strong>'
                },
                {
                    xtype: 'datefield',
                    width: 130,
                    fieldLabel: 'Tanggal',
                    emptyText: 'Tanggal',
                    hideLabel: true,
                    itemId: 'dateMbFilter',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d'
                },
                {
                    xtype: 'datefield',
                    width: 160,
                    labelWidth: 25,
                    fieldLabel: 's.d',
                    emptyText: 'Tanggal',
                    itemId: 'dateMbFilter2',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Cabang ',
                    itemId: 'cabangMkFilter',
                    width: 220,
                    emptyText: 'Pilih',
                    labelWidth: 55,
                    displayField: 'cabang_alias',
                    valueField: 'id',
                    queryMode: 'remote',
                    allowBlank: true,
                    triggerAction: 'all',
//                    hidden: userCabang == 14 ? false : true,
//                    valueNotFoundText: 'Tidak ada Data',
                    store: 'ksmintakas.CabangStore'
                },
                {
                    xtype: 'button',
                    ui: 'green-button',
                    text: 'Search',
                    iconCls: 'icon-btn-search',
                    itemId: 'MintaKasSearch'
                },
                '-',
                {
                    xtype: 'button',
                    ui: 'green-button',
                    text: 'Approval',
                    iconCls: 'icon-btn-accept',
                    itemId: 'MintaKasApproval'
                },
                '-',
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Refresh',
                    iconCls: 'icon-btn-refresh',
                    itemId: 'MintaKasRefresh'
                }
            ],
            items: [
                {
                    region: 'center',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'ksmintakas.ksmintakasgrid'
                        }
                    ]
                },
                {
                    region: 'west',
                    width: 325,
                    minWidth: 325,
                    title: 'FORM PERMINTAAN KAS DIVISI',
                    border: true,
                    ui: 'green-panel',
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'ksmintakas.ksmintakasform'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */