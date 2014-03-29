/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.dvtxbrminta.GetDvTxBrMinta', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dvtxbrminta.getdvtxbrminta',
    itemId: 'getdvtxbrminta',
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
                            title: 'DAFTAR PERMINTAAN BARANG',
                            items: [
                                {
                                    xtype: 'dvtxbrminta.dvtxbrmintagrid'
                                }
                            ]
                        },
                        {
                            region: 'south',
                            height: 250,
                            layout: 'fit',
                            collapsible: true,
                            title: 'DETAIL PERMINTAAN BARANG',
                            items: [
                                {
                                    xtype: 'dvtxbrminta.dvtxbrmintadetailgrid'
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'west',
                    width: 325,
                    minWidth: 325,
                    title: 'FORM ',
                    border: true,
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'dvtxbrminta.dvtxbrmintaform'
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