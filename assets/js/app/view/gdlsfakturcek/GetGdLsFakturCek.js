/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.gdlsfakturcek.GetGdLsFakturCek', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.gdlsfakturcek.getgdlsfakturcek',
    itemId: 'getgdlsfakturcek',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'fit',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gdlsfakturcek.lsfakturcekform',
                    border: true,
                    ui: 'blue-panel',
                    title: 'CEK FAKTUR'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */