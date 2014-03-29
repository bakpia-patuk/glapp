/**
 * @author Isht Ae
 **/
Ext.define('eTrav.view.mintaanggaran.fakturWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.fakturwindow',
    id: 'fakturWindow',
    width: 400,
    height: 300,
    modal: true,
    resizable: false,
    title: 'DAFTAR FAKTUR',
    border: true,
    autoScroll: true,
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'daftarFaktur'
                }
            ],
            buttons: [
                {
                    text: 'Pilih',
                    listeners: {
                        click: function () {
                            this.up('window').destroy();
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */