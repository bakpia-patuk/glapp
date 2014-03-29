/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.akbukubesar.GetAkBukuBesar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.akbukubesar.getakbukubesar',
    itemId: 'getakbukubesar',
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
                            items: [
                                {
                                    xtype: 'akbukubesar.akbukubesargrid'
                                }
                            ]
                        },
                        {
                            region: 'east',
                            xtype: 'tabpanel',
                            width: 375,
                            minWidth: 375,
                            hidden: false,
                            ui: 'blue-tab',
                            collapsible: true,
                            collapsed: true,
                            title: 'CETAK LAPORAN',
                            items: [
                                {
                                    xtype: 'akbukubesar.rlform'
                                },
                                {
                                    xtype: 'akbukubesar.nsform'
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'south',
                    height: 270,
                    minHeight: 270,
                    title: 'DETAIL BUKA BESAR',
                    border: true,
                    ui: 'blue-panel',
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'akbukubesar.akbukubesardetailgrid'
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