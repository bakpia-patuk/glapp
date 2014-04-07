/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.bkanggaran.GetBkAnggaran', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bkanggaran.getbkanggaran',
    itemId: 'getbkanggaran',
    id: 'getbkanggaran',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    defaults: {
        border: true,
        split: true
    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    region: 'west',
                    width: 325,
                    minWidth: 325,
                    maxWidth: 325,
                    ui: 'orange-panel',
                    title: 'FORM PEMBAYARAN',
                    collapsible: true,
                    xtype: 'bkanggaran.bkanggaranform'
                },
                Ext.create(Ext.tab.Panel, {
                    region: 'center',
                    deferredRender: false,
                    plain: true,
                    ui: 'orange-tab',
                    activeTab: 0,
                    id: 'anggaranTab',
                    itemId: 'anggaranTab',
                    items: [
                        {
                            xtype: 'bkanggaran.supplierpanel'
                        },
                        {
                            xtype: 'bkanggaran.bkanggarannongrid'
                        },
                        {
                            xtype: 'bkanggaran.bkanggaran1grid'
                        }
                    ]
                })
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */