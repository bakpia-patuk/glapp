/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.bkmsbank.GetBkMsBank', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bkmsbank.getbkmsbank',
    itemId: 'getbkmsbank',
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
                    border: false,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'bkmsbank.bkmsbankgrid',
                            border: true
                        }
                    ]
                },
                {
                    region: 'west',
                    width: 275,
                    minWidth: 275,
                    ui: 'blue-panel',
                    title: 'FORM MASTER BANK',
                    border: true,
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'bkmsbank.bkmsbankform'
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