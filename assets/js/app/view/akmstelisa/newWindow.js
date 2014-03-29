/**
 * @author Isht Ae
 **/
Ext.define('eTrav.view.mastertelisa.newWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.mastertelisa.newwindow',
    itemId: 'mastertelisa.newWindow',
    width: 415,
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