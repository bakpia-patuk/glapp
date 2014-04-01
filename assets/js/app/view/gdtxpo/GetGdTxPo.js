/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.gdtxpo.GetGdTxPo', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.gdtxpo.getgdtxpo',
    border: false,
    layout: 'fit',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tabpanel',
                    deferredRender: false,
                    plain: true,
                    ui: 'orange-tab',
                    border: false,
                    itemId: 'poTab',
                    items: [
                        {
                            xtype: 'panel',
                            title: 'PEMBUATAN PO',
                            layout: 'border',
                            itemId: 'popanelform',
                            border: false,
                            bodyPadding: '2 0 0 0',
                            defaults: {
                                border: true,
                                ui: 'orange-panel',
                                split: true
                            },
                            tbar: [
                                {
                                    xtype: 'button',
                                    text: 'ADD_NEW',
                                    ui: 'orange-button',
                                    action: 'poNew'
                                },
                                '-',
                                {
                                    xtype: 'button',
                                    text: 'SAVE',
                                    ui: 'orange-button',
                                    itemId: 'poSave'
                                },
                                '-',
                                {
                                    xtype: 'button',
                                    text: 'PRINT_PO',
                                    ui: 'orange-button',
                                    itemId: 'poPrint'
                                },
                                '-',
                                {
                                    xtype: 'button',
                                    text: 'SENT_PDF',
                                    ui: 'orange-button',
                                    itemId: 'poPdf'
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
                                    itemId: 'poTgl1',
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
                                    itemId: 'poTgl2',
                                    value: new Date()
                                },
                                {
                                    xtype: 'combobox',
                                    emptyText: 'Cabang',
                                    width: 150,
                                    itemId: 'poCabang',
                                    triggerAction: 'all',
                                    hideTrigger: false,
                                    mode: 'remote',
                                    minChars: 2,
                                    store: 'gdtxpo.CabangStore',
                                    displayField: 'cabang_alias',
                                    valueField: 'id'
                                },
                                {
                                    text: 'SEARCH',
                                    ui: 'orange-button',
                                    action: 'searchPo',
                                    itemId: 'searchPo'
                                },
                                '-',
                                {
                                    text: 'REFRESH',
                                    ui: 'orange-button',
                                    action: 'refreshPo'
                                }
                            ],
                            items: [
                                {
                                    region: 'west',
                                    width: 325,
                                    minWidth: 325,
                                    maxWidth: 325,
                                    collapsible: true,
                                    title: 'FORM PEMBUATAN PO',
                                    items: [
                                        {
                                            xtype: 'gdtxpo.txpoform'
                                        }
                                    ]
                                },
                                {
                                    region: 'center',
                                    xtype: 'gdtxpo.txpogrid',
                                    title: 'DAFTAR PENGADAAN'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: 'DAFTAR PO',
                            layout: 'border',
                            border: false,
                            bodyPadding: '2 0 0 0',
                            defaults: {
                                border: true,
                                ui: 'blue-panel',
                                split: true
                            },
                            items: [
                                {
                                    region: 'south',
                                    xtype: 'gdtxpo.txpolistgriddt',
                                    height: 220,
                                    minHeight: 220,
                                    maxHeight: 220,
                                    collapsible: true,
                                    title: 'DETAIL BARANG PO'
                                },
                                {
                                    region: 'center',
                                    xtype: 'gdtxpo.txpolistgrid'
                                }
                            ]
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