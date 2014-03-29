/**
 * @author Isht Ae
 **/
Ext.define('Ext.ux.form.SearchField', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.searchfield',
    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',
    //hasSearch : false,
    //paramName : 'query',
    initComponent: function () {
        this.callParent(arguments);
        this.on('specialkey', function (f, e) {
            if (e.getKey() == e.ENTER) {
                this.onTrigger2Click();
            }
        }, this);
    },
    afterRender: function () {
        this.callParent();
    }
});

Ext.define('ResApp.view.divpengadaan.pilihbarangWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.pilihbarangwindow',

    id: 'pilihbarangWindow',
    width: 650,
    height: 400,
    modal: true,
    resizable: false,
    title: 'Pilih Kontak',
    border: true,
    autoScroll: true,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
//            dockedItems: [
//                {
//                    xtype: 'toolbar',
//                    dock: 'top',
//                    cls:'border-bottom',
//                    items: [
//                        {
//                            xtype: 'button',
//                            text: 'Baru',
//                            iconCls:'btn-add',
//				            listeners : {
//				                click: function() {
//				                	var win = Ext.widget('newJamaahWindow');
//
//				                    win.show();
//				                }
//				            }
//			            },
//			            {
//			            	xtype: 'tbseparator'
//			            },
//                        {
//                            xtype: 'button',
//                            text: 'Refresh',
//                            iconCls:'btn-refresh',
//				            listeners : {
//				                click: function() {
//				                	var store = Ext.StoreMgr.lookup('JamaahStore');
//
//				                    store.clearFilter(true);
//        							store.load();
//				                }
//				            }
//                        },
//                        {
//                            xtype: 'tbfill'
//                        },
//                        {
//                            xtype: 'searchfield',
//                            triggerCls: 'x-form-search-trigger',
//                            fieldLabel: 'Label',
//                            width:250,
//                            hideLabel: true,
//                            emptyText: 'Ketik nama...',
//                            onTrigger1Click:function(){
//                                var jStore = Ext.StoreMgr.lookup('JamaahStore');
//                                this.setValue('');
//                                jStore.clearFilter(true);
//                                jStore.load();
//                            },
//                            onTrigger2Click: function(){
//                                    var jStore = Ext.StoreMgr.lookup('jamaahStore');
//
//                                    jStore.clearFilter(true);
//                                    jStore.filter({
//                                        property: 'namaJamaah',
//                                        anyMatch: true,
//                                        value : this.getValue()
//                                    });
//                                    jStore.load();
//                            }
//                        }
//                    ]
//                }
//            ],
            items: [
                {
                    xtype: 'listbarang'
                }
            ],
            buttons: [
                {
                    text: 'Tutup',
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