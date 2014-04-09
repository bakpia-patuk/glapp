/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.ksmintakas.KsGroupKpWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.ksmintakas.ksgroupkpwin',
    itemId: 'ksgroupkpwin',
    ui: 'green-window',
    title: 'DAFTAR KEPERLUAN',
    width: 700,
    height: 330,
    modal: true,
    resizable: false,
    border: false,
    autoScroll: true,
    layout: 'fit',
    autoShow: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    layout: 'border',
                    border: false,
                    bodyStyle: 'background: #F5AE45',
                    defaults: {
                        border: false,
                        ui: 'blue-panel',
                        split: true
                    },
                    items: [
                        {
                            xtype: 'grid',
                            title: 'LIST GROUP KEPERLUAN',
                            region: 'west',
                            width: 375,
                            itemId: 'gridGk',
                            forceFit: true,
                            store: 'ksmintakas.GrkBkStore',
                            tbar: [
                                {
                                    text: 'ADD',
                                    ui: 'green-button',
                                    handler: function() {
                                        var cellEditing = this.up('grid').getPlugin('daftarKpGrid');
                                        cellEditing.cancelEdit();
                                        var r = {
                                            id: 0,
                                            grk_name: "NAMA",
                                            grk_desc: "Deskripsi",
                                            grk_status: 0,
                                            form_id: "mintakasdiv",
                                            grk_active: 1
                                        };

                                        this.up('grid').getStore().insert(0, r);
                                        cellEditing.startEditByPosition({
                                            row: 0,
                                            column: 1
                                        });
                                    }
                                },
                                '-',
                                {
                                    text: 'DELETE',
                                    ui: 'green-button',
                                    itemId: 'removeGrk',
                                    disabled: true,
                                    handler: function() {
                                        var store = this.up('grid').getStore();
                                        var store2 = this.up('grid').up('window').down('#gridGkAkun').getStore();
                                        var sm = this.up('grid').getSelectionModel();

                                        Ext.Ajax.request({
                                            url: BASE_PATH + 'shared/del_group_keperluan',
                                            method: 'POST',
                                            params: {id: sm.getSelection()[0].get('id')},
                                            scope: this,
                                            callback: function(options, success, response) {
                                                var resp = Ext.decode(response.responseText);

                                                if (resp.success === 'true') {
                                                    store.load();
                                                    store2.load();
                                                    Ext.MessageBox.show({
                                                        title: 'INFO',
                                                        msg: resp.msg,
                                                        buttons: Ext.MessageBox.OK,
                                                        icon: Ext.MessageBox.INFO
                                                    });
                                                } else {
                                                    store.load();
                                                    store2.load();
                                                    Ext.MessageBox.show({
                                                        title: 'ERROR',
                                                        msg: resp.msg,
                                                        buttons: Ext.MessageBox.OK,
                                                        icon: Ext.MessageBox.ERROR
                                                    });
                                                }
                                            }
                                        });
                                    }
                                },
                                '-',
                                {
                                    text: 'SET AKUN',
                                    ui: 'green-button',
                                    itemId: 'setAkunGk'
                                }
                            ],
                            columns: [
                                Ext.create('Ext.grid.RowNumberer'),
                                {
                                    flex: 1,
                                    text: 'ALIAS KEPERLUAN',
                                    renderer: 'uppercase',
                                    dataIndex: 'grk_name',
                                    editor: {
                                        allowBlank: false
                                    }
                                }
                            ],
                            plugins: [
                                {
                                    ptype: 'cellediting',
                                    clicksToEdit: 2,
                                    pluginId: 'daftarKpGrid',
                                    listeners: {
                                        'edit': function(editor, e, opt) {
                                            if (e.record.dirty) {
                                                e.record.commit();
                                                Ext.Ajax.request({
                                                    url: BASE_PATH + 'shared/add_group_keperluan',
                                                    method: 'POST',
                                                    params: e.record.data,
                                                    scope: this,
                                                    callback: function(options, success, response) {
                                                        var resp = Ext.decode(response.responseText);

                                                        if (resp.success === 'true') {
                                                            e.grid.getStore().load();
                                                        } else {
                                                            e.grid.getStore().load();
                                                            Ext.MessageBox.show({
                                                                title: 'ERROR',
                                                                msg: resp.msg,
                                                                buttons: Ext.MessageBox.OK,
                                                                icon: Ext.MessageBox.ERROR
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }
                            ],
                            listeners: {
                                'selectionchange': function(view, records) {
                                    this.down('#removeGrk').setDisabled(!records.length);
                                }
                            }
                        },
                        {
                            xtype: 'grid',
                            title: 'LIST GROUP AKUN',
                            region: 'center',
                            itemId: 'gridGkAkun',
                            forceFit: true,
                            store: 'ksmintakas.GrkAkunStore',
                            tbar: [
                                {
                                    text: 'DELETE',
                                    ui: 'green-button',
                                    disabled: true,
                                    itemId: 'removeAkunKp',
                                    handler: function() {
                                        var store = this.up('grid').getStore();
                                        var sm = this.up('grid').getSelectionModel();

                                        Ext.Ajax.request({
                                            url: BASE_PATH + 'ks_mintakas/del_akun_gr',
                                            method: 'POST',
                                            params: {id: sm.getSelection()[0].get('id')},
                                            scope: this,
                                            callback: function(options, success, response) {
                                                var resp = Ext.decode(response.responseText);

                                                if (resp.success === 'true') {
                                                    store.load();
                                                    Ext.MessageBox.show({
                                                        title: 'INFO',
                                                        msg: resp.msg,
                                                        buttons: Ext.MessageBox.OK,
                                                        icon: Ext.MessageBox.INFO
                                                    });
                                                } else {
                                                    store.load();
                                                    Ext.MessageBox.show({
                                                        title: 'ERROR',
                                                        msg: resp.msg,
                                                        buttons: Ext.MessageBox.OK,
                                                        icon: Ext.MessageBox.ERROR
                                                    });
                                                }
                                            }
                                        });
                                    }
                                },
                                '-',
                                {
                                    text: 'REFRESH',
                                    ui: 'green-button',
                                    handler: function() {
                                        this.up('grid').load();
                                    }
                                }
                            ],
                            columns: [
                                Ext.create('Ext.grid.RowNumberer'),
                                {
                                    xtype: 'gridcolumn',
                                    flex: 1,
                                    text: 'NAMA AKUN',
                                    dataIndex: 'akun_name'
                                }
                            ],
                            listeners: {
                                'selectionchange': function(view, records) {
                                    this.down('#removeAkunKp').setDisabled(!records.length);
                                }
                            }
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Save',
                    scope: this,
                    handler: this.close
                },
                {
                    text: 'Cancel',
                    scope: this,
                    handler: this.close
                }
            ]
        });
        me.callParent(arguments);
    }
});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */