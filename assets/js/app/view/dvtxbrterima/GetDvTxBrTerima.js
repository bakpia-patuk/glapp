/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.dvtxbrterima.GetDvTxBrTerima', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.getdvtxbrterima',
    itemId: 'getdvtxbrterima',
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
                    xtype: 'container',
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
                            title: 'DAFTAR PENGIRIMAN BARANG',
                            items: [
                                {
                                    xtype: 'dvtxbrterima.dvtxbrterimagrid'
                                }
                            ]
                        },
                        {
                            region: 'south',
                            height: 250,
                            layout: 'fit',
                            collapsible: true,
                            title: 'DETAIL BARANG',
                            items: [
                                {
                                    xtype: 'dvtxbrterima.dvtxbrterimadetailgrid'
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'west',
                    width: 325,
                    minWidth: 325,
                    title: 'FORM PENERIMAAN',
                    border: true,
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'dvtxbrterima.dvtxbrterimaform'
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