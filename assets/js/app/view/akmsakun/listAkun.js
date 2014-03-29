Ext.define('eTrav.view.akun.listAkun', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.listakun',
    itemId: 'listakun',
    border: false,
    forceFit: true,
    height: 250,
    width: 400,
    columnLines: true,
    flex: 1,
    store: 'AkunStore',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                // /autoScroll: true,
                emptyText: 'Tidak ada daftar Item',
                deferEmptyText: false
            },
            tbar: [
                {
                    text: 'Add'
                },
                {
                    text: 'Delete'
                },
                '->',
                {
                    xtype: 'lookupfield',
                    triggerCls: 'x-form-search-trigger',
                    fieldLabel: 'Label',
                    width: 200,
                    hideLabel: true,
                    emptyText: 'cari nama akun',
                    onTrigger1Click: function () {
                        var store = this.up('window').down('grid').getStore(),
                            filterCollection = [];

                        var statusFilter = new Ext.util.Filter({
                            property: 'akun_head_status',
                            value: '0NE'
                        });
                        filterCollection.push(statusFilter);

                        store.clearFilter(true);
                        store.filter(filterCollection);

                        this.setValue('');
                    },
                    onTrigger2Click: function () {
                        var store = this.up('window').down('grid').getStore(),
                            filterCollection = [];

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

                        store.clearFilter(true);
                        store.filter(filterCollection);
                    }
                }
            ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    flex: 0.2,
                    text: 'KODE AKUN',
                    dataIndex: 'codeAkun',
                    renderer: function (value, meta, record) {
                        var n = "0",
                            j = "",
                            l = value.length,
                            n, s1, s2, sT;

                        for (var i = l; i < 10; i++) {
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
                    flex: 0.5,
                    text: 'NAMA AKUN',
                    dataIndex: 'namaAkun',
                    renderer: Ext.util.Format.uppercase
                }
            ]
        });

        me.callParent(arguments);
    }
});