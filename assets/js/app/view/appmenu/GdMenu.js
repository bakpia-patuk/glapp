/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.appmenu.GdMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.appmenu.gdmenu',
    ui: 'orange-panel',
    itemId: 'gdmenu',
    title: '<strong>GUDANG PERSEDIAAN</strong>',
    iconCls: '',
    rootVisible: false,
    useArrows: true,
    border: false,
    bodyPadding: '5 0',
    store: 'appmenu.GdMenuStore',
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