Ext.define('Simpkb.view.mastertelisa.jtGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mastertelisa.jtgrid',
    border: false,
    forceFit: true,
    columnLines: true,
    flex: 1,
    store: 'TelisaJenisStore',
    multiSelect: false,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada daftar Jenis Biaya',
                deferEmptyText: false
            },
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    header: 'JENIS BIAYA',
                    dataIndex: 'mtj_name',
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
                    width: 35
                }
            ],
            tbar: [
                {
                    text: 'Tambah',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-add',
                    handler: function() {
                        var cellEditing = this.up('grid').getPlugin('jtGrid');
                        cellEditing.cancelEdit();
                        var r = Ext.create('eTrav.model.TelisaJenisModel', {
                            id: 0,
                            banknas_name: "JENIS BIAYA",
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
                    itemId: 'removeJt',
                    disabled: true,
                    handler: function() {
                        var store = this.up('grid').getStore();
                        var sm = this.up('grid').getSelectionModel();

                        Ext.Ajax.request({
                            url: BASE_PATH + 'master/del_jenis_telisa',
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
                    clicksToEdit: 2,
                    pluginId: 'jtGrid',
                    listeners: {
                        'edit': function(editor, e, opt) {
                            if (e.record.dirty) {
                                e.record.commit();
                                Ext.Ajax.request({
                                    url: BASE_PATH + 'master/jenis_telisa',
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
                    this.down('#removeJt').setDisabled(!records.length);
                }
            }
        });

        me.callParent(arguments);
    }
});