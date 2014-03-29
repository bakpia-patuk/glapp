/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.akmsakun.GetAkMsAkun', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.akmsakun.getakmsakun',
    itemId: 'getakmsakun',
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
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'akmsakun.akmsakungrid'
                        }
                    ]
                },
                {
                    region: 'west',
                    width: 401,
                    minWidth: 401,
                    title: 'FORM DETAIL AKUN',
                    collapsible: true,
                    layout: 'fit',
                    ui: 'blue-panel',
                    componentCls: 'border-left',
                    items: [
                        {
                            xtype: 'akmsakun.akmsakunform'
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