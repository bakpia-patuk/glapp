/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.ksmintakas.GkMasterDetailGrid', {
    extend: 'Ext.window.Window',
    alias: 'widget.ksmintakas.gkmasterdetailgrid',
    itemId: 'gkmasterdetailgrid',
    autoScroll: false,
    forceFit: true,
    store: 'KeperluanAkunMemberStore',
    columnLines: true,
//    flex: 1,
    border: false,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Akun Keperluan',
                deferEmptyText: false
            },
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    header: 'Nama Akun',
                    dataIndex: 'akun_name',
                    width: 150,
                    renderer: 'uppercase',
                    editor: {
                        allowBlank: false
                    }
                }
            ],
            tbar: [
                {
                    text: 'Hapus',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-delete',
                    itemId: 'removeAkunKp',
                    disabled: true,
                    handler: function() {
                        var store = this.up('grid').getStore();
                        var sm = this.up('grid').getSelectionModel();

                        Ext.Ajax.request({
                            url: BASE_PATH + 'master/del_akun_keperluan',
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

//                        if (store.getCount() > 0) {
//                            sm.select(0);
//                        }
                    }
                },
                '->',
                {
                    text: 'Refresh',
                    ui: 'blue-button',
                    handler: function() {
                        this.up('grid').getStore().load();
                    }
                }
            ],
            listeners: {
                'selectionchange': function(view, records) {
                    this.down('#removeAkunKp').setDisabled(!records.length);
                }
            }
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */