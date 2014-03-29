/**
 * @author Isht Ae
 **/
Ext.define('eTrav.view.kasmasuk.akunWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowakun',
    id: 'akunWindow',
    width: 375,
    height: 420,
    modal: true,
    resizable: false,
    title: 'DAFTAR AKUN',
    border: true,
    autoScroll: true,
    layout: 'fit',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    cls: 'border-bottom',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Refresh',
                            iconCls: 'btn-refresh',
                            listeners: {
                                click: function () {
                                    var store = Ext.StoreMgr.lookup('AkunStore');
                                    var filterCollection = [];

                                    var statusFilter = new Ext.util.Filter({
                                        property: 'akun_head_status',
                                        value: '0NE'
                                    });

                                    filterCollection.push(statusFilter);

                                    var statusFilter = new Ext.util.Filter({
                                        property: 'akun_fungsi',
                                        value: '9NE'
                                    });

                                    filterCollection.push(statusFilter);

                                    store.clearFilter(true);
                                    store.filter(filterCollection);

                                    store.load();
                                }
                            }
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'lookupfield',
                            triggerCls: 'x-form-search-trigger',
                            fieldLabel: 'Label',
                            width: 200,
                            hideLabel: true,
                            emptyText: 'cari nama akun',
                            onTrigger1Click: function () {
                                var store = Ext.StoreMgr.lookup('AkunStore');
                                var filterCollection = [];

                                var statusFilter = new Ext.util.Filter({
                                    property: 'akun_head_status',
                                    value: '0NE'
                                });

                                filterCollection.push(statusFilter);

                                var statusFilter = new Ext.util.Filter({
                                    property: 'akun_fungsi',
                                    value: '9NE'
                                });

                                filterCollection.push(statusFilter);

                                store.clearFilter(true);
                                store.filter(filterCollection);

                                store.load();
                                this.setValue('');
                            },
                            onTrigger2Click: function () {
                                var store = Ext.StoreMgr.lookup('AkunStore');
                                var filterCollection = [];

                                var statusFilter = new Ext.util.Filter({
                                    property: 'akun_name=ll',
                                    value: this.getValue()
                                });
                                filterCollection.push(statusFilter);

                                var statusFilter = new Ext.util.Filter({
                                    property: 'akun_head_status',
                                    value: '0NE'
                                });

                                filterCollection.push(statusFilter);

                                var statusFilter = new Ext.util.Filter({
                                    property: 'akun_fungsi',
                                    value: '9NE'
                                });

                                filterCollection.push(statusFilter);

                                store.clearFilter(true);
                                store.filter(filterCollection);

                                store.load();
                            }
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'daftarAkun'
                }
            ],
            buttons: [
                {
                    text: 'Pilih',
                    listeners: {
                        click: function () {
                            this.up('window').destroy();
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */