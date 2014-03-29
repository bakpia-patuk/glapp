/**
 * @author Isht Ae
 **/

Ext.define('GlApp.model.appmenu.MenuModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'text', type: 'string'},
        {name: 'leaf', type: 'boolean'},
        {name: 'iconCls', type: 'string'},
        {name: 'panel', type: 'string'},
        {name: 'expanded', defaultValue: true}
//        {name: 'disabled', type: 'bool', defaultValue: false}
    ]
});
/* End of file TreeMenu.js */
/* Location: ./assets/js/app/model/TreeMenu.js */