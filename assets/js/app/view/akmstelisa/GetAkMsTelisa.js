/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.akmstelisa.GetAkMsTelisa', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.akmstelisa.getakmstelisa',
    itemId: 'getakmstelisa',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    defaults: {
        border: true,
        split: true
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    region: 'center',
                    xtype: 'akmstelisa.akmstelisagrid',
                    layout: 'fit'
                },
                {
                    region: 'west',
                    xtype: 'akmstelisa.akmstelisaform',
                    width: 275,
                    minWidth: 275,
                    ui: 'blue-panel',
                    title: 'FORM MASTER TELISA',
                    collapsible: true
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */