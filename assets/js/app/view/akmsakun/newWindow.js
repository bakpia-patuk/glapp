/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.akmsakun.newWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.akmsakun.newwindow',
    itemId: 'newwindow',
    modal: true,
    resizable: false,
    border: true,
    autoScroll: true,
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
        });

        me.callParent(arguments);
    }
});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */