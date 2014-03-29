Ext.define('Ext.ux.selection.CheckboxModel', {
    extend: 'Ext.selection.CheckboxModel',
    header: true,
    constructor: function(config) {

        var me = this;

        me.callParent(arguments);

        if (me.header === false) {
            me.headerWidth = me.getHeaderConfig().width;

            me.getHeaderConfig = function() {
                var me = this;


                return {
                    isCheckerHd: true,
                    text: ' ',
                    width: me.headerWidth,
                    sortable: false,
                    draggable: false,
                    resizable: false,
                    hideable: false,
                    menuDisabled: true,
                    dataIndex: '',
                    cls: Ext.baseCSSPrefix + 'column-header-checkbox y-no-checkbox-header',
                    renderer: Ext.Function.bind(me.renderer, me),
                    locked: false
                };
            };
        }
    }
});