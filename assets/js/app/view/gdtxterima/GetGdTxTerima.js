/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.gdtxterima.GetGdTxTerima', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.gdtxterima.getgdtxterima',
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
                    ui: 'orange-tab',
                    border: false,
                    itemId: 'poTab',
                    items: [
                        {
                            xtype: 'panel',
                            title: 'TANDA TERIMA',
                            layout: 'border',
                            border: false,
                            bodyPadding: '2 0 0 0',
                            defaults: {
                                border: true,
                                ui: 'orange-panel',
                                split: true
                            },
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