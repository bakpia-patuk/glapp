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
            items: [
                {
                    region: 'center',
                    border: false,
                    layout: 'border',
                    defaults: {
                        border: true,
                        ui: 'blue-panel',
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
                    ui: 'blue-panel',
                    width: 325,
                    minWidth: 325,
                    maxWidth: 325,
                    title: 'FORM DETAIL PENGADAAN',
                    border: true,
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'gdtxpengadaan.txpengadaanform'
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