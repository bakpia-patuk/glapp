/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.ivlsterima.GetIvLsTerima', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ivlsterima.getivlsterima',
    itemId: 'getivlsterima',
    title: 'Daftar Penerimaan Inventaris',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'fit',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'ivlsterima.ivlsterimagrid'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */