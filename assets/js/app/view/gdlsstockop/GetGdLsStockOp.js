/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.gdlsstockop.GetGdLsStockOp', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.gdlsstockop.getgdlsstockop',
    itemId: 'getgdlsstockop',
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
                    region: 'center',
                    border: false,
                    layout: 'border',
                    defaults: {
                        border: true,
                        ui: 'blue-panel',
                        split: true
                    },
                    items: [
                        {
                            xtype: 'gdlsstockop.stockopgrid',
                            title: 'DAFTAR BARANG',
                            region: 'center'
                        },
                        {
                            xtype: 'gdlsstockop.arusstockgrid',
                            region: 'south',
                            title: 'DAFTAR ARUS BARANG',
                            collapsible: true,
                            height: 250,
                            minHeight: 250,
                            maxHeight: 250
                        }
                    ]
                },
                {
                    region: 'west',
                    ui: 'blue-panel',
                    width: 325,
                    minWidth: 325,
                    maxWidth: 325,
                    title: 'FORM PENYESUAIAN STOCK',
                    border: true,
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'gdlsstockop.stockopform'
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