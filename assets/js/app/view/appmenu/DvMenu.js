/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.appmenu.DvMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.appmenu.dvmenu',
    ui: 'green-panel',
    itemId: 'dvmenu',
    title: '<strong>DIVISI</strong>',
    iconCls: '',
    rootVisible: false,
    useArrows: true,
    border: false,
    bodyPadding: '5 0',
    store: 'appmenu.DvMenuStore',
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