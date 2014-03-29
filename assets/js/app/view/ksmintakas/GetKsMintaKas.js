/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.ksmintakas.GetKsMintaKas', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ksmintakas.getksmintakas',
    itemId: 'getksmintakas',
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
                            xtype: 'ksmintakas.ksmintakasgrid'
                        }
                    ]
                },
                {
                    region: 'west',
                    width: 325,
                    minWidth: 325,
                    title: 'FORM PERMINTAAN KAS DIVISI',
                    border: true,
                    ui: 'green-panel',
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'ksmintakas.ksmintakasform'
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