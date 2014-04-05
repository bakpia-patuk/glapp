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
        ui: 'orange-panel',
        border: true,
        split: true
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    region: 'center',
                    layout: 'border',
                    id: 'maCenter',
                    title: 'DAFTAR PERMINTAAN ANGGARAN',
                    defaults: {
                        split: true
                    },
                    items: [
                        Ext.create(Ext.tab.Panel, {
                            region: 'center',
                            deferredRender: false,
                            plain: true,
                            ui: 'orange-tab',
                            border: false,
                            activeTab: 0,
                            id: 'bkrencanagrtab',
//                            plugins: {
//                                ptype: 'tabclosemenu'
//                            },
                            items: [
                                {
                                    xtype: 'bkrencanaagr.bkrencanaagrgrid'
                                },
                                {
                                    xtype: 'bkrencanaagr.bkrencanaagrnongrid'
                                }
                            ]
                        })
                    ]
                },
                {
                    region: 'west',
                    width: 325,
                    minWidth: 325,
                    title: 'FORM ANGGARAN NON-SUPPLIER',
                    collapsible: true,
                    layout: 'auto',
                    xtype: 'bkrencanaagr.bkrencanaagrform'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */