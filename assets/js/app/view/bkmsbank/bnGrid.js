Ext.define('Simpkb.view.masterbank.bnGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.masterbank.bngrid',
    border: false,
    forceFit: true,
    columnLines: true,
    flex: 1,
    store: 'BankNasStore',
    multiSelect: false,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada daftar Bank Nasional',
                deferEmptyText: false
            },
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    header: 'KODE BANK',
                    dataIndex: 'banknas_code',
                    hidden: true,
                    width: 50,
                    renderer: 'uppercase',
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'NAMA BANK',
                    dataIndex: 'banknas_name',
                    width: 150,
                    renderer: 'uppercase',
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    xtype: 'checkcolumn',
                    header: 'ACTIVE',
                    dataIndex: 'is_active',
                    width: 35,
                    listeners: {
                        checkchange: function(column, recordIndex, checked) {
                            var grid = this.up('grid'),
                                    id = grid.getStore().getAt(recordIndex).get('id'), active;

                            if (checked === true) {
                                active = 1;
                            } else {
                                active = 0;
                            }

                            Ext.Ajax.request({
                                url: BASE_PATH + 'master/add_banknas',
                                method: 'POST',
                                params: {id: id, is_active: active},
                                scope: this,
                                callback: function(options, success, response) {
                                    var resp = Ext.decode(response.responseText);

                                    if (resp.success === 'true') {
                                        grid.getStore().load();
                                        Ext.MessageBox.show({
                                            title: 'INFO',
                                            msg: resp.message,
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.INFO
                                        });
                                    } else {
                                        Ext.MessageBox.show({
                                            title: 'ERROR',
                                            msg: resp.message,
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.ERROR
                                        });
                                    }
                                }
                            });
                        }
                    }
                }
            ],
            tbar: [
                {
                    text: 'Tambah',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-add',
                    handler: function() {
                        var cellEditing = this.up('grid').getPlugin('bbmGrid');
                        cellEditing.cancelEdit();
                        var r = Ext.create('eTrav.model.BankNasModel', {
                            id: 0,
                            banknas_code: "99",
                            banknas_name: "NAMA BANK",
                            is_active: true
                        });

                        this.up('grid').getStore().insert(0, r);
                        cellEditing.startEditByPosition({
                            row: 0,
                            column: 1
                        });
                    }
                },
                {
                    text: 'Hapus',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-delete',
                    itemId: 'removeBbm',
                    disabled: true,
                    handler: function() {
                        var store = this.up('grid').getStore();
                        var sm = this.up('grid').getSelectionModel();

                        Ext.Ajax.request({
                            url: BASE_PATH + 'master/del_banknas',
                            method: 'POST',
                            params: {id: sm.getSelection()[0].get('id')},
                            scope: this,
                            callback: function(options, success, response) {
                                var resp = Ext.decode(response.responseText);

                                if (resp.success === 'true') {
                                    store.load();
                                    Ext.MessageBox.show({
                                        title: 'INFO',
                                        msg: resp.message,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.INFO
                                    });
                                }
                            }
                        });

                        if (store.getCount() > 0) {
                            sm.select(0);
                        }
                    }
                }
            ],
            plugins: [
                {
                    ptype: 'cellediting',
                    clicksToEdit: 1,
                    pluginId: 'bbmGrid',
                    listeners: {
                        'edit': function(editor, e, opt) {
                            if (e.record.dirty) {
                                console.log('edited');
                                e.record.commit();
                                Ext.Ajax.request({
                                    url: BASE_PATH + 'master/add_banknas',
                                    method: 'POST',
                                    params: e.record.data,
                                    scope: this,
                                    callback: function(options, success, response) {
                                        var resp = Ext.decode(response.responseText);

                                        if (resp.success === 'true') {
                                            e.grid.getStore().load();
                                            Ext.MessageBox.show({
                                                title: 'INFO',
                                                msg: resp.message,
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.INFO
                                            });
                                        } else {
                                            Ext.MessageBox.show({
                                                title: 'ERROR',
                                                msg: resp.message,
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
                    this.down('#removeBbm').setDisabled(!records.length);
                }
            }
        });

        me.callParent(arguments);
    }
});