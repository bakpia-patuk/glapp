/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.layout.LayoutContainer', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.layout.layoutcontainer',
    itemId: 'tabs',
    id: 'tabs',
    region: 'center',
    ui: 'blue-tab',
    border: false,
    layout: 'fit',
    deferredRender: false,
    plain: true,
    activeTab: 0,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            plugins: {
                ptype: 'tabclosemenu'
            },
            items: [
                {
                    xtype: 'panel',
                    title: 'HOME',
                    border: true,
                    itemId: 'getHomePanel',
                    iconCls: 'icon-panel-home',
                    autoLoad: {
                        url: BASE_PATH + 'apps/dashboard'
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file LayoutContainer.js */
/* Location: ./assets/js/app/view/layout/LayoutContainer.js */