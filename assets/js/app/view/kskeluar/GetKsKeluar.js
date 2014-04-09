/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.kskeluar.GetKsKeluar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.kskeluar.getkskeluar',
    itemId: 'getkskeluar',
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
                Ext.create(Ext.tab.Panel, {
                    region: 'center',
                    deferredRender: false,
                    plain: true,
                    ui: 'green-tab',
                    activeTab: 0,
                    itemId: 'kskeluartab',
                    items: [
                        {
                            title: 'DATA FAKTUR',
                            layout: 'fit',
                            border: false,
                            xtype: 'kskeluar.listfaktur'
                        },
                        {
                            title: 'DATA PERMINTAAN',
                            layout: 'fit',
                            border: false,
                            xtype: 'kskeluar.listmintabayar'
                        },
                        {
                            title: 'DAFTAR KAS KELUAR',
                            layout: 'fit',
                            border: false,
                            xtype: 'kskeluar.kskeluargrid'
                        },
                        {
                            title: 'DATA RUJUKAN',
                            layout: 'fit',
                            border: false,
                            xtype: 'kskeluar.datarujukangrid'
                        }
                    ]
                }),
                {
                    region: 'west',
                    width: 325,
                    minWidth: 325,
                    title: 'FORM KAS KELUAR',
                    border: true,
                    ui: 'green-panel',
                    collapsible: true,
                    layout: 'auto',
                    xtype: 'kskeluar.kskeluarform'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */