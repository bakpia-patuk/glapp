/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.ivtxbrterima.GetIvTxBrTerima', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ivtxbrterima.getivtxbrterima',
    itemId: 'getivtxbrterima',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    defaults: {
        split: true
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    region: 'center',
                    layout: 'border',
                    border: false,
                    defaults: {
                        split: true
                    },
                    items: [
                        {
                            region: 'center',
                            layout: 'fit',
                            ui: 'red-panel',
                            title: 'DAFTAR PENGIRIMAN BARANG',
                            items: [
                                {
                                    xtype: 'ivtxbrterima.ivtxbrterimagrid'
                                }
                            ]
                        },
                        {
                            region: 'south',
                            height: 250,
                            layout: 'fit',
                            ui: 'red-panel',
                            collapsible: true,
                            title: 'DETAIL BARANG',
                            items: [
                                {
                                    xtype: 'ivtxbrterima.ivtxbrterimadetailgrid'
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'west',
                    width: 325,
                    minWidth: 325,
                    ui: 'red-panel',
                    title: 'FORM PENERIMAAN',
                    border: true,
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'ivtxbrterima.ivtxbrterimaform'
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