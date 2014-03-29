/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.gdmssupplier.GetGdMsSupplier', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.gdmssupplier.getgdmssupplier',
    itemId: 'getgdmssupplier',
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
                    xtype: 'gdmssupplier.mssuppliergrid',
                    ui: 'blue-panel',
                    title: 'DAFTAR SUPPLIER',
                    border: true,
                    region: 'center'
                },
                {
                    region: 'west',
                    ui: 'blue-panel',
                    width: 325,
                    minWidth: 325,
                    maxWidth: 325,
                    title: 'FORM DETAIL SUPPLIER',
                    border: true,
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'gdmssupplier.mssupplierform'
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