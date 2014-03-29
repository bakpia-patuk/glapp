/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.appmenu.BkMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.appmenu.bkmenu',
    ui: 'orange-panel',
    itemId: 'bkmenu',
    title: '<strong>TRANSAKSI BANK</strong>',
    iconCls: '',
    rootVisible: false,
    useArrows: true,
    border: false,
    bodyPadding: '5 0',
    store: 'appmenu.BkMenuStore',
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