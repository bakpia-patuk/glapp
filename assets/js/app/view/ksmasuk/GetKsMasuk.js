/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.ksmasuk.GetKsMasuk', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ksmasuk.getksmasuk',
    itemId: 'getksmasuk',
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
                            xtype: 'ksmasuk.ksmasukgrid'
                        }
                    ]
                },
                {
                    region: 'west',
                    width: 325,
                    minWidth: 325,
                    title: 'FORM KAS MASUK',
                    border: true,
                    ui: 'green-panel',
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'ksmasuk.ksmasukform'
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