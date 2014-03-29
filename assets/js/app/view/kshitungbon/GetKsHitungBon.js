/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.kshitungbon.GetKsHitungBon', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.kshitungbon.getkshitungbon',
    itemId: 'getkshitungbon',
    border: false,
    layout: 'border',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    region: 'center',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'kshitungbon.kshitungbongrid'
                        }
                    ]
                },
                {
                    region: 'west',
                    width: 325,
                    minWidth: 325,
                    title: 'FORM KAS BON',
                    border: true,
                    ui: 'green-panel',
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'kshitungbon.kshitungbonform'
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