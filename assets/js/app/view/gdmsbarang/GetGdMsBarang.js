/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.gdmsbarang.GetGdMsBarang', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.gdmsbarang.getgdmsbarang',
    itemId: 'getgdmsbarang',
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
                    xtype: 'tabpanel',
                    ui: 'blue-tab',
                    region: 'center',
                    deferredRender: false,
                    border: true,
                    plain: true,
                    items: [
                        {
                            xtype: 'gdmsbarang.msbaranggrid',
                            title: 'DAFTAR BARANG'
                        },
                        {
                            xtype: 'gdmsbarang.msbarangtree',
                            title: 'DAFTAR BARANG TREE'
                        }
                    ]
                },
                {
                    region: 'west',
                    ui: 'blue-panel',
                    width: 325,
                    minWidth: 325,
                    maxWidth: 325,
                    title: 'FORM DETAIL BARANG',
                    border: true,
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'gdmsbarang.msbarangform'
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