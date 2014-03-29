/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.ivtxbrkeluar.GetIvTxBrKeluar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.getivtxbrkeluar',
    itemId: 'getivtxbrkeluar',
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
                    defaults: {
                        split: true
                    },
                    items: [
                        {
                            region: 'center',
                            layout: 'fit',
                            ui: 'black-panel',
                            title: 'DAFTAR PERMINTAAN BARANG',
                            items: [
                                {
                                    xtype: 'ivtxbrkeluar.ivtxbrkeluargrid'
                                }
                            ]
                        },
                        {
                            region: 'south',
                            height: 250,
                            ui: 'black-panel',
                            layout: 'fit',
                            collapsible: true,
                            title: 'DETAIL PERMINTAAN BARANG',
                            items: [
                                {
                                    xtype: 'ivtxbrkeluar.ivtxbrkeluardetailgrid'
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'west',
                    width: 325,
                    minWidth: 325,
                    ui: 'black-panel',
                    title: 'FORM ',
                    border: true,
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'ivtxbrkeluar.ivtxbrkeluarform'
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