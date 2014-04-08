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
                            xtype: 'panel',
                            title: 'DATA FAKTUR',
                            layout: 'fit',
                            itemId: 'tespanel1',
                            name: 'TesPanel1',
                            border: false,
                            xtype: 'kskeluar.listfaktur'
                        },
                        {
                            xtype: 'panel',
                            title: 'DATA PERMINTAAN',
                            layout: 'fit',
                            border: false,
                            itemId: 'tespanel2',
                            name: 'TesPanel2',
                            xtype: 'kskeluar.listmintabayar'
                        },
                        {
                            xtype: 'panel',
                            title: 'DAFTAR KAS KELUAR',
                            layout: 'fit',
                            itemId: 'tespanel3',
                            name: 'TesPanel4',
                            border: false,
                            xtype: 'kskeluar.kskeluargrid'
                        },
                        {
                            xtype: 'panel',
                            title: 'DATA RUJUKAN',
                            layout: 'fit',
                            itemId: 'tespanel4',
                            name: 'TesPanel4',
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