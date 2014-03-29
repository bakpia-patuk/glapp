/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.akjurnalharian.GetAkJurnalHarian', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.akjurnalharian.getakjurnalharian',
    itemID: 'getakjurnalharian',
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
                            xtype: 'akjurnalharian.akjurnalhariangrid'
                        }
                    ]
                },
                {
                    region: 'west',
                    width: 350,
                    minWidth: 350,
                    title: 'FORM JURNAL HARIAN',
                    border: true,
                    collapsible: true,
                    ui: 'blue-panel',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'akjurnalharian.akjurnalharianform'
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