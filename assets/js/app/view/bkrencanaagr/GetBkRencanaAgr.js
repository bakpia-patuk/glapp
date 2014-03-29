/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.bkrencanaagr.GetBkRencanaAgr', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bkrencanaagr.getbkrencanaagr',
    itemId: 'getbkrencanaagr',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    defaults: {
        border: true,
        split: true
    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    region: 'center',
                    layout: 'border',
                    id: 'maCenter',
                    defaults: {
                        split: true
                    },
                    items: [
                        Ext.create(Ext.tab.Panel, {
                            region: 'center',
                            deferredRender: false,
                            plain: true,
                            ui: 'blue-tab',
                            border: false,
                            activeTab: 0,
                            id: 'bkrencanagrtab',
                            title: 'DAFTAR PERMINTAAN ANGGARAN',
                            items: [
                                {
                                    xtype: 'bkrencanaagr.bkrencanaagrgrid'
                                },
                                {
                                    xtype: 'bkrencanaagr.bkrencanaagrnongrid'
                                }
                            ]
                        })/*,
                         {
                         region: 'south',
                         height: 250,
                         minHeight: 250,
                         maxHeight: 250,
                         collapsible: true,
                         title: 'Detail Permintaan Anggaran',
                         id: 'mintaAnggaranSouth',
                         layout: 'fit',
                         xtype: 'bkrencanagrdetailgrid'
                         }*/
                    ]
                },
                {
                    region: 'west',
                    width: 325,
                    minWidth: 325,
                    ui: 'black-panel',
                    title: 'FORM ANGGARAN NON-SUPPLIER',
                    collapsible: true,
                    layout: 'fit',
                    componentCls: 'border-left',
                    items: [
                        {
                            xtype: 'bkrencanaagr.bkrencanaagrform'
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