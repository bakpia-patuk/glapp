/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.bkmasuk.GetBkMasuk', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bkmasuk.getbkmasuk',
    itemId: 'getbkmasuk',
    bodyPadding: '2 0 0 0',
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
                            xtype: 'bkmasuk.bkmasukgrid'
                        }
                    ]
                },
                {
                    region: 'west',
                    width: 325,
                    minWidth: 325,
                    title: 'FORM KAS MASUK',
                    border: true,
                    ui: 'orange-panel',
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'bkmasuk.bkmasukform'
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