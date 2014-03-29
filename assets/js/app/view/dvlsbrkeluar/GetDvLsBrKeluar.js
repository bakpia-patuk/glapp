/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.dvlsbrkeluar.GetDvLsBrKeluar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dvlsbrkeluar.getdvlsbrkeluar',
    itemId: 'getdvlsbrkeluar',
    title: 'Daftar Pengeluaran Divisi',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'fit',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'dvlsbrkeluar.dvlsbrkeluargrid'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */