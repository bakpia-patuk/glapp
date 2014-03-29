/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.layout.NavPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.layout.navpanel',
    region: 'west',
    title: 'Navigasi',
    split: true,
    width: 220,
    minWidth: 220,
    maxWidth: 220,
    collapsible: true,
    frame: false,
    layout: 'accordion',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            tools: [
                {
                    type: 'help',
                    handler: function(event, toolEl, panel) {
                        Ext.MessageBox.alert('Help', 'Help and Manual window goes here');
                    }
                },
                {
                    type: 'gear',
                    handler: function(event, toolEl, panel) {
                        Ext.MessageBox.alert('About', 'About window goes here');
                    }
                }
            ],
            items: [
                {
                    xtype: 'appmenu.bkmenu'
                },
                {
                    xtype: 'appmenu.ksmenu'
                },
                {
                    xtype: 'appmenu.akmenu'
                },
                {
                    xtype: 'appmenu.gdmenu'
                },
                {
                    xtype: 'appmenu.dvmenu'
                },
                {
                    xtype: 'appmenu.ivmenu'
                }
            ]
        });
        me.callParent(arguments);
    }
});
/* End of file LayoutContainer.js */
/* Location: ./assets/js/app/view/layout/LayoutContainer.js */