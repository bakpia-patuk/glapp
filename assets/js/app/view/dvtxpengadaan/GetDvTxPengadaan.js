/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.dvtxpengadaan.GetDvTxPengadaan', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dvtxpengadaan.getdvtxpengadaan',
    itemId: 'getdvtxpengadaan',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    defaults: {
        border: false,
        split: true
    },
    initComponent: function () {
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
                            title: 'DAFTAR PENGADAAN',
                            items: [
                                {
                                    xtype: 'dvtxpengadaan.dvtxpengadaangrid'
                                }
                            ]
                        },
                        {
                            region: 'south',
                            height: 270,
                            layout: 'fit',
                            collapsible: true,
                            title: 'DETAIL ITEM',
                            items: [
                                {
                                    xtype: 'dvtxpengadaan.dvtxdetailpengadaangrid'
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'west',
                    ui: 'blue-panel',
                    width: 325,
                    minWidth: 325,
                    title: 'FORM PENGADAAN',
                    border: true,
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'dvtxpengadaan.dvtxpengadaanform'
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