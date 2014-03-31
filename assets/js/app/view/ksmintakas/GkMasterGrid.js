/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.ksmintakas.GkMasterGrid', {
    extend: 'Ext.window.Window',
    alias: 'widget.ksmintakas.gkmastergrid',
    itemId: 'gkmastergrid',
    autoScroll: true,
    forceFit: true,
    store: 'GkMasterStore',
    columnLines: true,
//    flex: 1,
    border: false,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Master Keperluan',
                deferEmptyText: false
            },
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    header: 'ALIAS KEPERLUAN',
                    dataIndex: 'grkName',
                    width: 150,
                    renderer: 'uppercase',
                    editor: {
                        allowBlank: false
                    }
                }
            ],
            tbar: [
                {
                    text: 'Tambah',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-add',
                    handler: function() {
                        var cellEditing = this.up('grid').getPlugin('daftarKpGrid'),
                                formId = this.up('grid').down('#keperluanForm').getValue();
                        cellEditing.cancelEdit();
                        var r = Ext.create('eTrav.model.GkMasterModel', {
                            id: 0,
                            grkName: "NAMA",
                            grkDesc: "Deskripsi",
                            grkStatus: 0,
                            grkFormId: formId,
                            isActive: 1
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
                    itemId: 'removeSatuanMi',
                    disabled: true,
                    handler: function() {
                        var store = this.up('grid').getStore();
                        var store2 = this.up('grid').up('window').down('#gkmasterdetailgrid').getStore();
                        var sm = this.up('grid').getSelectionModel();

                        Ext.Ajax.request({
                            url: BASE_PATH + 'master/del_keperluan',
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

//                        if (store.getCount() > 0) {
//                            sm.select(0);
//                        }
                    }
                },
                {
                    xtype: 'textfield',
                    itemId: 'keperluanForm',
                    hidden: true
                },
                '->',
                {
                    text: 'Set Akun',
                    ui: 'blue-button',
                    itemId: 'setAkunKeperluan'
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
                                    url: BASE_PATH + 'master/add_keperluan',
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
                    this.down('#removeSatuanMi').setDisabled(!records.length);
                }
            }
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */