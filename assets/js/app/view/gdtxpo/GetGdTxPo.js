/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.gdtxpo.GetGdTxPo', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.gdtxpo.getgdtxpo',
    itemId: 'getgdtxpo',
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
                            title: 'PEMBUATAN PO',
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