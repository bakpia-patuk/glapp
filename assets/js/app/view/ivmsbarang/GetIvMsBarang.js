/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.ivmsbarang.GetIvMsBarang', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.getivmsbarang',
    itemId: 'getivmsbarang',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    defaults: {
        split: true
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'ivmsbarang.ivmsbaranggrid',
                    region: 'center',
                    ui: 'blue-panel',
                    title: 'DAFTAR DATA BARANG',
                    border: true
                },
                {
                    xtype: 'ivmsbarang.ivmsbarangform',
                    region: 'west',
                    width: 325,
                    ui: 'blue-panel',
                    minWidth: 325,
                    title: 'FORM DATA BARANG',
                    border: true,
                    collapsible: true
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */