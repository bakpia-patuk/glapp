/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.gdtxpengadaan.GetGdTxPengadaan', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.gdtxpengadaan.getgdtxpengadaan',
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
                    ui: 'orange-button',
                    itemId: 'pengNew'
                },
                '-',
                {
                    text: 'SAVE',
                    ui: 'orange-button',
                    itemId: 'pengSave'
                },
                '-',
                {
                    text: 'DELETE',
                    ui: 'orange-button',
                    itemId: 'pengDelete'
                },
                '-',
                {
                    text: 'APP_CABANG',
                    ui: 'orange-button',
                    itemId: 'pengAppCb'
                },
                '-',
                {
                    text: 'APP_PUSAT',
                    ui: 'orange-button',
                    itemId: 'pengAppPs'
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
                    itemId: 'pengTgl1',
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
                    itemId: 'pengTgl2',
                    value: new Date()
                },
                {
                    xtype: 'combobox',
                    emptyText: 'Cabang',
                    width: 150,
                    itemId: 'pengCabang',
                    triggerAction: 'all',
                    hideTrigger: false,
                    mode: 'remote',
                    minChars: 2,
                    store: 'gdtxpengadaan.CabangStore',
                    displayField: 'cabang_alias',
                    valueField: 'id',
                    value: parseInt(CABANG_ID)
                },
                {
                    text: 'SEARCH',
                    ui: 'orange-button',
                    itemId: 'searchPeng'
                },
                '-',
                {
                    text: 'ALL',
                    ui: 'orange-button',
                    disabled: CABANG_ID ===  1 ? false : true,
                    itemId: 'allPeng'
                },
                '-',
                {
                    text: 'REFRESH',
                    ui: 'orange-button',
                    itemId: 'refreshPeng'
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
                            height: 220,
                            minHeight: 220,
                            maxHeight: 220
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