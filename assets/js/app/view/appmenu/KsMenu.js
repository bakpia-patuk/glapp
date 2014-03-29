/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.appmenu.KsMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.appmenu.ksmenu',
    ui: 'green-panel',
    itemId: 'ksmenu',
    title: '<strong>TRANSAKSI KAS</strong>',
    iconCls: '',
    rootVisible: false,
    useArrows: true,
    border: false,
    bodyPadding: '5 0',
    store: 'appmenu.KsMenuStore',
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