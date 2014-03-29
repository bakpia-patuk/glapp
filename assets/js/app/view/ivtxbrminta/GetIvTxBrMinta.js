/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.ivtxbrminta.GetIvTxBrMinta', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ivtxbrminta.getivtxbrminta',
    itemId: 'getivtxbrminta',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    defaults: {
        split: true
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    region: 'center',
                    layout: 'border',
                    border: false,
                    componentCls: 'border-left',
                    defaults: {
                        split: true
                    },
                    items: [
                        {
                            region: 'center',
                            layout: 'fit',
                            ui: 'blue-panel',
                            title: 'DAFTAR PERMINTAAN BARANG',
                            items: [
                                {
                                    xtype: 'ivtxbrminta.ivtxbrmintagrid'
                                }
                            ]
                        },
                        {
                            region: 'south',
                            height: 250,
                            layout: 'fit',
                            ui: 'blue-panel',
                            collapsible: true,
                            title: 'DETAIL PERMINTAAN BARANG',
                            items: [
                                {
                                    xtype: 'ivtxbrminta.ivtxbrmintadetailgrid'
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'west',
                    width: 325,
                    ui: 'blue-panel',
                    minWidth: 325,
                    title: 'FORM ',
                    border: true,
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'ivtxbrminta.ivtxbrmintaform'
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