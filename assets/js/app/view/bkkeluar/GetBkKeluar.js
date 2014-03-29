/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.bkkeluar.GetBkKeluar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bkkeluar.getbkkeluar',
    itemID: 'getbkkeluar',
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
                            xtype: 'bkkeluar.bkkeluargrid'
                        }
                    ]
                },
                {
                    region: 'west',
                    width: 325,
                    minWidth: 325,
                    title: 'FORM TRANSAKSI BANK',
                    border: true,
                    ui: 'orange-panel',
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'bkkeluar.bkkeluarform'
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