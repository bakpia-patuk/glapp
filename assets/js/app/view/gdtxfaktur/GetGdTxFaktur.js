/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.gdtxfaktur.GetGdTxFaktur', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.gdtxfaktur.getgdtxfaktur',
    itemId: 'getgdtxfaktur',
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
                    ui: 'blue-tab',
                    border: false,
                    itemId: 'poTab',
                    items: [
                        {
                            xtype: 'panel',
                            title: 'TANDA TERIMA FAKTUR',
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
                                    region: 'west',
                                    width: 325,
                                    minWidth: 325,
                                    maxWidth: 325,
                                    collapsible: true,
                                    title: 'FORM TUKAR FAKTUR',
                                    items: [
                                        {
                                            xtype: 'gdtxfaktur.txfakturform'
                                        }
                                    ]
                                },
                                {
                                    region: 'center',
                                    layout: 'border',
                                    border: false,
                                    defaults: {
                                        border: true,
                                        ui: 'blue-panel',
                                        split: true
                                    },
                                    items: [
                                        {
                                            region: 'south',
                                            height: 220,
                                            minHeight: 220,
                                            maxHeight: 220,
                                            collapsible: true,
                                            title: 'DAFTAR DETAIL BARANG',
                                            xtype: 'gdtxfaktur.txfakturgriddt'
                                        },
                                        {
                                            region: 'center',
                                            xtype: 'gdtxfaktur.txfakturgrid',
                                            title: 'DAFTAR PENERIMAAN BARANG',
                                            layout: 'fit'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: 'TUKAR TT BG',
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
                                    region: 'west',
                                    width: 325,
                                    minWidth: 325,
                                    maxWidth: 325,
                                    collapsible: true,
                                    title: 'FORM BG FAKTUR',
                                    items: [
                                        {
                                            xtype: 'gdtxfaktur.txbgfakturform'
                                        }
                                    ]
                                },
                                {
                                    region: 'center',
                                    xtype: 'gdtxfaktur.txbgfakturgrid',
                                    title: 'DAFTAR BG FAKTUR',
                                    layout: 'fit',
                                    border: true
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: 'DAFTAR FAKTUR',
                            layout: 'fit',
                            border: false,
                            bodyPadding: '2 0 0 0',
                            items: [
                                {
                                    xtype: 'gdtxfaktur.txlistfakturgrid',
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