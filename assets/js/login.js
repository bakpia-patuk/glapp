Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath('Ext.ux', BASE_URL + 'assets/js/ux');
Ext.require(['Ext.ux.statusbar.StatusBar']);
Ext.onReady(function() {
    var formLogin = new Ext.FormPanel({
        frame: false,
        border: false,
        buttonAlign: 'center',
        url: BASE_URL + 'auth/login',
        method: 'POST',
        id: 'frmLogin',
        bodyStyle: 'background-color:#F8F9F9',
        bodyPadding: '10 15 25 15',
        width: 400,
        labelWidth: 150,
        items: [{
                xtype: 'displayfield',
                name: 'img',
                padding: '0px 0px 5px 0px',
                value: 'Access to this location is restricted to authorized users only.<br />Please type your username and password'
            }, {
                xtype: 'textfield',
                fieldLabel: 'SDM ID ',
                labelAlign: 'right',
                name: 'username',
                itemId: 'username',
                id: 'logUsername',
                allowBlank: false,
                msgTarget: 'side',
                tabIndex: 1,
                anchor: '100%',
                listeners: {
                    scope: this,
                    specialkey: function(f, e) {
                        if (e.getKey() === e.ENTER) {
                            f.up('form').down('#logPassword').focus();
                        }
                    }
                }
            }, {
                xtype: 'textfield',
                fieldLabel: 'Password ',
                name: 'password',
                labelAlign: 'right',
                itemId: 'logPassword',
                allowBlank: false,
                msgTarget: 'side',
                inputType: 'password',
                anchor: '100%',
                listeners: {
                    scope: this,
                    specialkey: function(f, e) {
                        if (e.getKey() === e.ENTER) {
                            fnLogin();
                        }
                    }
                }
            }
        ],
        buttons: [{
                text: 'Login',
                margin: '0px 10px 10px 10px',
                iconCls: 'icon-btn-check',
                handler: fnLogin
            }, {
                text: 'Reset',
                iconCls: 'icon-btn-delete',
                handler: function() {
                    formLogin.getForm().reset();
                    Ext.getCmp('sbWinLogin').setStatus({
                        text: 'Ready',
                        iconCls: 'x-status-ready'
                    });
                }
            }
        ]
    });
    function fnLogin() {
        Ext.getCmp('frmLogin').on({
            beforeaction: function() {
                if (formLogin.getForm().isValid()) {
                    Ext.getCmp('winLogin').body.mask();
                    Ext.getCmp('sbWinLogin').showBusy('Checking Account...');
                }
            }
        });
        formLogin.getForm().submit({
            success: function() {
                window.location = BASE_URL;
            },
            failure: function(form, action) {
                Ext.getCmp('winLogin').body.unmask();
                if (formLogin.getForm().isValid()) {
                    Ext.getCmp('sbWinLogin').setStatus({
                        text: '<div class="status-error">'+ action.result.msg +'</div>'
                    });
                } else {
                    Ext.getCmp('sbWinLogin').setStatus({
                        text: '<div class="status-error">Something error in form !</div>',
                        iconCls: 'x-status-error'
                    });
                }
            }
        });
    }
    var winLogin = new Ext.Window({
        title: 'General Ledger - Login',
        ui: 'blue-window',
        id: 'winLogin',
        layout: 'fit',
        iconCls: 'icon-login-window',
        width: 410,
        height: 210,
        closable: false,
        resizable: false,
        draggable: false,
        items: [formLogin],
        bbar: Ext.create('Ext.ux.StatusBar', {
            id: 'sbWinLogin',
            defaultText: 'Ready',
            iconCls: 'x-status-ready'
        })
    });
    winLogin.show();
});