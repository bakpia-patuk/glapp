/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.appmenu.AkMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.appmenu.akmenu',
    ui: 'blue-panel',
    itemId: 'akmenu',
    title: '<strong>AKUNTANSI</strong>',
    iconCls: '',
    rootVisible: false,
    useArrows: true,
    border: false,
    bodyPadding: '5 0',
    store: 'appmenu.AkMenuStore',
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