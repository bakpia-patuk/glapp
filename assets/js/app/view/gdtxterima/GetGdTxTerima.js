/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.gdtxterima.GetGdTxTerima', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.gdtxterima.getgdtxterima',
    bodyPadding: '2 0 0 0',
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
                    itemId: 'pottTab',
                    items: [
                        {
                            xtype: 'panel',
                            title: 'TANDA TERIMA',
                            layout: 'border',
                            border: false,
                            bodyPadding: '2 0 0 0',
                            itemId: 'newttpanel',
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
                                    action: 'ttNew'
                                },
                                '-',
                                {
                                    xtype: 'button',
                                    text: 'SAVE',
                                    ui: 'orange-button',
                                    action: 'ttSave'
                                },
                                '-',
                                {
                                    xtype: 'button',
                                    text: 'PRINT_TT',
                                    ui: 'orange-button',
                                    action: 'ttPrintWindow'
                                },
                                {
                                    xtype: 'button',
                                    text: 'SENT_PDF',
                                    ui: 'orange-button',
                                    hidden: true,
                                    action: 'poSavePdf'
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
                                    itemId: 'ttTgl1',
                                    hidden: true,
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
                                    itemId: 'ttTgl2',
                                    hidden: true,
                                    value: new Date()
                                },
                                {
                                    xtype: 'combobox',
                                    emptyText: 'Supplier',
                                    width: 180,
                                    itemId: 'ttSupplier',
                                    triggerAction: 'all',
                                    hideTrigger: false,
                                    mode: 'remote',
                                    minChars: 2,
                                    store: 'gdtxterima.SupplierStore',
                                    displayField: 'ms_name',
                                    valueField: 'id'
                                },
                                {
                                    text: 'SEARCH',
                                    ui: 'orange-button',
                                    action: 'searchTt',
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
                                    title: 'FORM PENERIMAAN BARANG',
                                    items: [
                                        {
                                            xtype: 'gdtxterima.txttform'
                                        }
                                    ]
                                },
                                {
                                    region: 'center',
//                                    xtype: 'gdtxpo.txpogrid',
                                    layout: 'border',
                                    border: false,
                                    defaults: {
                                        border: true,
                                        ui: 'orange-panel',
                                        split: true
                                    },
                                    items: [
                                        {
                                            region: 'south',
                                            height: 220,
                                            minHeight: 220,
                                            maxHeight: 220,
                                            collapsible: true,
                                            title: 'DAFTAR LOT BARANG',
                                            xtype: 'gdtxterima.txttgriddt'
                                        },
                                        {
                                            region: 'center',
                                            xtype: 'gdtxterima.txttgrid',
                                            title: 'DAFTAR PO BARANG',
                                            layout: 'fit'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: 'DAFTAR TT BARANG',
                            layout: 'fit',
                            border: false,
                            bodyPadding: '2 0 0 0',
                            items: [
                                {
                                    xtype: 'gdtxterima.tsxttlistgrid',
                                    border: true
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