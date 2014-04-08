/**
 * @author Isht Ae
 **/

Ext.define('GlApp.controller.App', {
    extend: 'GlApp.controller.Base',
    models: [
        'appmenu.MenuModel'
    ],
    stores: [
        'appmenu.GdMenuStore',
        'appmenu.DvMenuStore',
        'appmenu.IvMenuStore',
        'appmenu.BkMenuStore',
        'appmenu.KsMenuStore',
        'appmenu.AkMenuStore'
    ],
    views: [
        'layout.LayoutContainer',
        'layout.NavPanel',
        //MENU LIST
        'appmenu.GdMenu',
        'appmenu.DvMenu',
        'appmenu.IvMenu',
        'appmenu.BkMenu',
        'appmenu.KsMenu',
        'appmenu.AkMenu'
    ],
    refs: [
        {ref: 'tabs', selector: '#tabs'},
        {ref: 'MainView', selector: '#layoutcontainer'}
    ],
    init: function() {
        this.listen({
            controller: {
                '#App': {
                    tokenchange: this.dispatch
                }
            },
            component: {
                '#gdmenu': {
                    itemclick: this.addHistory
                },
                '#dvmenu': {
                    itemclick: this.addHistory
                },
                '#ivmenu': {
                    itemclick: this.addHistory
                },
                '#bkmenu': {
                    itemclick: this.addHistory
                },
                '#akmenu': {
                    itemclick: this.addHistory
                },
                '#ksmenu': {
                    itemclick: this.addHistory
                }
            },
            global: {
            },
            store: {
            },
            proxy: {
                '*': {
                    exception: function( proxy, response, operation, eOpts ) {
                        Ext.MessageBox.show({
                            title: 'INFO',
                            msg: response.responseText,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                }
            } 
        });
    },
    addHistory: function(view, rec, item, index, eventObj) {
        if (!rec.raw || !rec.raw.panel || rec.raw.panel === "none") {
            return;
        }
        var me = this,
                token = rec.raw.panel;
        Ext.util.History.add(token);
        me.fireEvent('tokenchange', token);
    },
    dispatch: function(token) {
        var me = this;
//        // switch on token to determine which content to create
        if (token !== "") {
            Ext.Ajax.request({
                url: BASE_PATH + 'apps/user_check',
                method: 'POST',
                params: {menu: token},
                scope: this,
                callback: function(options, success, response) {
                    var resp = Ext.decode(response.responseText);

                    if (resp.success === 'true') {
                        me.processId(token);
                    } else {
                        Ext.MessageBox.show({
                            title: resp.title,
                            msg: resp.msg,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });

                        return;
                    }
                }
            });
        }
    },
    processId: function(token) {
//        if (rec.raw.disabled) {
//            Ext.MessageBox.show({
//                title: 'Warning',
//                msg: 'Anda tidak memiliki akses untuk menu ini',
//                buttons: Ext.MessageBox.OK,
//                icon: Ext.MessageBox.WARNING
//            });
//            return;
//        }
//        else {
//        if (!token.raw || !token.raw.panel || token.raw.panel === "none") {
//            return;
//        }

        var id = token;
        var icon = "";
        var cls, folder;

        folder = id.substring(3);
        folder = folder.toLowerCase();

        cls = "GlApp.view." + folder + "." + id;

        var tabs = this.getTabs();
        var tab = tabs.child('#' + id);
        var tabController = this.application.controllers.get(id);

        if (!tabController) {
            tabsController = this.application.getController(id);
            //tabsController.init();
        }

        if (!tab) {
            tab = tabs.add(Ext.create(cls, {
                itemId: id,
                title: token, //rec.get('text'),
                iconCls: icon,
                border: false,
                closable: true
            }));
        }
        tabs.setActiveTab(tab);
//        }
    }
});

/* End of file Base.js */
/* Location: ./assets/js/app/controller/Base.js */