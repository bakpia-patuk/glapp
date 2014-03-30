/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.gdtxpengadaan.GetGdTxPengadaan', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.gdtxpengadaan.getgdtxpengadaan',
    itemId: 'getgdtxpengadaan',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    defaults: {
        border: false,
        split: true
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    text: 'ADD_NEW',
                    ui: 'orange-button'
                },
                '-',
                {
                    text: 'SAVE',
                    ui: 'orange-button'
                },
                '-',
                {
                    text: 'DELETE',
                    ui: 'orange-button'
                },
                '-',
                {
                    text: 'APP_CABANG',
                    ui: 'orange-button'
                },
                '-',
                {
                    text: 'APP_PUSAT',
                    ui: 'orange-button'
                },
                '->',
                {
                    xtype: 'datefield',
                    fieldLabel: 'Filter ',
                    labelWidth: 40,
                    labelAlign: 'right',
                    emptyText: 'Tgl. Awal',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    value: new Date()
                },
                {
                    xtype: 'datefield',
                    fieldLabel: ' s.d ',
                    labelWidth: 30,
                    labelAlign: 'right',
                    emptyText: 'Tgl. Akhir',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d',
                    value: new Date()
                },
                {
                    xtype: 'combobox',
                    emptyText: 'Cabang',
                    allowBlank: false
                },
                {
                    text: 'SEARCH',
                    ui: 'orange-button'
                },
                '-',
                {
                    text: 'ALL',
                    ui: 'orange-button'
                },
                '-',
                {
                    text: 'REFRESH',
                    ui: 'orange-button'
                }
            ],
            items: [
                {
                    region: 'center',
                    border: false,
                    layout: 'border',
                    defaults: {
                        border: true,
                        ui: 'orange-panel',
                        split: true
                    },
                    items: [
                        {
                            xtype: 'gdtxpengadaan.txpengadaangrid',
                            title: 'DAFTAR PENGADAAN',
                            region: 'center'
                        },
                        {
                            xtype: 'gdtxpengadaan.txpengadaangriddt',
                            region: 'south',
                            title: 'DETAIL PENGADAAN',
                            collapsible: true,
                            height: 250,
                            minHeight: 250,
                            maxHeight: 250
                        }
                    ]
                },
                {
                    region: 'west',
                    ui: 'orange-panel',
                    width: 325,
                    minWidth: 325,
                    maxWidth: 325,
                    title: 'FORM DETAIL PENGADAAN',
                    border: true,
                    collapsible: true,
                    layout: 'auto',
                    xtype: 'gdtxpengadaan.txpengadaanform'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */