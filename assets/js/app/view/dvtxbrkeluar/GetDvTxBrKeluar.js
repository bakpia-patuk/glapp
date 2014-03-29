/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.dvtxbrkeluar.GetDvTxBrKeluar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dvtxbrkeluar.getdvtxbrkeluar',
    itemId: 'getdvtxbrkeluar',
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
                            title: 'DAFTAR PERMINTAAN BARANG',
                            items: [
                                {
                                    xtype: 'dvtxbrkeluar.dvtxbrkeluargrid'
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
                                    xtype: 'dvtxbrkeluar.dvtxbrkeluardetailgrid'
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
                            xtype: 'dvtxbrkeluar.dvtxbrkeluarform'
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