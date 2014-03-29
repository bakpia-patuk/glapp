/**
 * @author Isht Ae
 **/

Ext.define('GlApp.store.appmenu.AkMenuStore', {
    extend: 'Ext.data.TreeStore',
    model: 'GlApp.model.appmenu.MenuModel',
    requires: 'GlApp.model.appmenu.MenuModel',
    root: {
        text: 'root',
        id: '0',
        expanded: true
    },
    proxy: {
        type: 'ajax',
        url: BASE_PATH + 'apps/app_menu/6',
        actionMethods: 'POST',
        reader: {
            type: 'json'
        }
    }
});
/* End of file TreeMenu.js */
/* Location: ./assets/js/app/store/TreeMenu.js */