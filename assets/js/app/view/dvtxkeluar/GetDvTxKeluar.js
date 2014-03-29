/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.dvtxkeluar.GetDvTxKeluar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dvtxkeluar.getdvtxkeluar',
    itemId: 'getdvtxkeluar',
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
                            title: 'DAFTAR PENGELUARAN BARANG RUANG',
                            items: [
                                {
                                    xtype: 'dvtxkeluar.dvtxkeluargrid'
                                }
                            ]
                        },
                        {
                            region: 'south',
                            height: 250,
                            layout: 'fit',
                            collapsible: true,
                            title: 'DETAIL PENGELUARAN BARANG',
                            items: [
                                {
                                    xtype: 'dvtxkeluar.dvtxkeluardetailgrid'
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
                            xtype: 'dvtxkeluar.dvtxkeluarform'
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