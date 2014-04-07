/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.bkanggaran.SupplierPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bkanggaran.supplierpanel',
    itemId: 'supplierpanel',
    border: true,
    title: 'SUPPLIER',
    layout: 'border',
    defaults: {
        border: false,
        split: true
    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    region: 'center',
                    xtype: 'bkanggaran.bkanggarangrid'
                },
                {
                    region: 'south',
                    height: 180,
                    minHeight: 180,
                    maxHeight: 200,
                    title: 'FORM DETAIL ANGGARAN',
                    collapsible: true,
                    collapsed: true,
                    ui: 'orange-panel',
                    layout: 'fit',
                    xtype: 'bkanggaran.bkanggarandetailgrid'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */