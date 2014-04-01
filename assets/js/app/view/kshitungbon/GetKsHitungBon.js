/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.kshitungbon.GetKsHitungBon', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.kshitungbon.getkshitungbon',
    itemId: 'getkshitungbon',
    border: false,
    bodyPadding: '2 0 0 0',
    layout: 'border',
    defaults: {
        border: true,
        split: true
    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    text: 'Detail',
                    iconCls: 'icon-btn-detail',
                    itemId: 'RincianKasBon'
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Refresh',
                    iconCls: 'icon-btn-refresh',
                    itemId: 'HitungBonRefresh'
                }
            ],
            items: [
                {
                    region: 'center',
                    layout: 'fit',
                    title: 'DAFTAR KAS BON',
                    items: [
                        {
                            xtype: 'kshitungbon.kshitungbongrid'
                        }
                    ]
                },
                {
                    region: 'south',
                    height: 230,
                    minHeight: 230,
                    title: 'FORM DETAIL KAS BON',
                    collapsible: true,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'kshitungbon.kshitungbondetailgrid'
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