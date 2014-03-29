/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.appmenu.IvMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.appmenu.ivmenu',
    ui: 'blue-panel',
    itemId: 'ivmenu',
    title: '<strong>INVENTARIS</strong>',
    iconCls: '',
    rootVisible: false,
    useArrows: true,
    border: false,
    bodyPadding: '5 0',
    store: 'appmenu.IvMenuStore',
    initComponent: function () {

        this.store = Ext.data.StoreManager.lookup(this.store);
        this.callParent(arguments);
    }
//    plugins: [
//        {ptype: 'dvp_nodedisabled'}
//    ]
});

/* End of file TreeMenu.js */
/* Location: ./assets/js/app/view/ui/TreeMenu.js */