/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdmsbarang.MsBarangMerkWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.gdmsbarang.msbarangmerkwin',
    itemId: 'msbarangmerkwin',
    title: 'MASTER MERK',
    width: 300,
    height: 350,
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
                    xtype: 'grid',
                    store: 'gdmsbarang.MerkStore',
                    forceFit: true,
                    columnLines: true,
                    flex: 1,
                    multiSelect: false,
                    plugins: [
                        {
                            ptype: 'cellediting',
                            clicksToEdit: 2,
                            pluginId: 'merkEditorMi',
                            listeners: {
                                'edit': function(editor, e, opt) {
                                    if (e.record.dirty) {
                                        e.record.commit();
                                        Ext.Ajax.request({
                                            url: BASE_PATH + 'shared/add_merk',
                                            method: 'POST',
                                            params: e.record.data,
                                            scope: this,
                                            callback: function(options, success, response) {
                                                var resp = Ext.decode(response.responseText);

                                                if (resp.success === 'true') {
                                                    e.grid.getStore().load();
                                                    Ext.MessageBox.show({
                                                        title: 'INFO',
                                                        msg: resp.msg,
                                                        buttons: Ext.MessageBox.OK,
                                                        icon: Ext.MessageBox.INFO
                                                    });
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
                    tbar: [
                        {
                            text: 'TAMBAH',
                            handler: function() {
                                var cellEditing = this.up('grid').getPlugin('merkEditorMi');
                                cellEditing.cancelEdit();
                                var r = {
                                    id: 0,
                                    merk_name: 'MERK NAME',
                                    simpan_status: 1
                                };

                                this.up('grid').getStore().insert(0, r);
                                cellEditing.startEditByPosition({
                                    row: 0,
                                    column: 1
                                });
                            }
                        },
                        {
                            text: 'HAPUS',
                            itemId: 'delMerk',
                            disabled: true,
                            handler: function() {
                                var store = this.up('grid').getStore();
                                var sm = this.up('grid').getSelectionModel();

                                Ext.Ajax.request({
                                    url: BASE_PATH + 'shared/del_merk',
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

                                if (store.getCount() > 0) {
                                    sm.select(0);
                                }
                            }
                        },
                        {
                            text: 'REFRESH',
                            handler: function() {
                                this.up('grid').getStore().load();
                            }
                        }
                    ],
                    columns: [
                        Ext.create('Ext.grid.RowNumberer', {width: 35}),
                        {
                            header: 'NAMA MERK',
                            dataIndex: 'merk_name',
                            flex: 0.3,
                            renderer: 'uppercase',
                            editor: {
                                allowBlank: false
                            }
                        }
                    ],
                    listeners: {
                        'selectionchange': function(view, records) {
                            this.down('#delMerk').setDisabled(!records.length);
                        }
                    }
                }
            ],
            buttons: [
                {
                    text: 'Save',
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