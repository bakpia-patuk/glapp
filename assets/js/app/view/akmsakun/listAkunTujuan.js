Ext.define('GlApp.view.akmsakun.listAkunTujuan', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.akmsakun.listakuntujuan',
    itemId: 'listakuntujuan',
    id: 'listAkunTujuan',
    border: false,
    forceFit: true,
    height: 250,
    width: 400,
    columnLines: true,
    flex: 1,
    store: 'AkunTujuanStore',
    initComponent: function () {
        var me = this;
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 2
        });

        Ext.applyIf(me, {
            plugins: [this.cellEditing],
            viewConfig: {
                // /autoScroll: true,
                emptyText: 'Tidak ada daftar Item',
                deferEmptyText: false
            },
            tbar: [
                {
                    text: 'Add',
                    handler: this.onAddClick
                },
                '-',
                {
                    text: 'Delete',
                    handler: this.onRmClick
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    flex: 0.2,
                    text: 'KODE AKUN',
                    dataIndex: 'tujuanKode',
                    renderer: function (value, meta, record) {
                        var n = "0",
                            j = "",
                            l = value.length,
                            n, s1, s2, sT;

                        for (var i = l; i < 11; i++) {
                            j = j.concat(n);
                        }
                        n = value + j;

                        s1 = n.substr(0, 1);
                        s2 = n.substr(1);
                        sT = s1 + "-" + s2;
                        return sT;
                    }
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.6,
                    text: 'NAMA AKUN',
                    dataIndex: 'tujuanName',
                    editor: {
                        xtype: 'combobox',
                        allowBlank: false,
                        emptyText: 'Ketik nama akun',
                        store: 'AkunComboStore',
                        displayField: 'codeAkunRender',
                        valueField: 'namaAkun',
                        queryMode: 'remote',
                        hidden: false,
                        triggerAction: 'all',
                        minChars: 2
                    }
                }
            ]
        });

        me.callParent(arguments);
    },
    onAddClick: function () {
        // Create a model instance
        var id = Ext.getCmp('akunform').getForm().findField('id').getValue();

        var rec = new eTrav.model.AkunTujuanModel({
            id: 0,
            akunId: id,
            tujuanId: '',
            tujuanName: '',
            simpanStatus: 0
        });

        this.up('grid').getStore().insert(0, rec);
        this.up('grid').cellEditing.startEditByPosition({
            row: 0,
            column: 2
        });
    },
    onRmClick: function () {
        var grid = this.up('grid');
        if (grid) {
            var sm = grid.getSelectionModel();
            var rs = sm.getSelection();
            if (!rs.length) {
                Ext.Msg.alert('Info', 'Pilih data yang akan di hapus');
                return;
            }
            var id = rs[0].get('id');
            Ext.Ajax.request({
                url: BASE_PATH + 'master/at_delete',
                method: 'POST',
                params: {postdata: id},
                scope: this,
                callback: function (options, success, response) {
                    grid.getStore().load();
                }
            });
        }
    }
});