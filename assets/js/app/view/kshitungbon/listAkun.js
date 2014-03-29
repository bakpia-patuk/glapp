Ext.define('eTrav.view.kasmasuk.listAkun', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.daftarAkun',
    border: false,
    forceFit: true,
    columnLines: true,
    //selModel : smGrid,
    flex: 1,
    store: 'AkunStore',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                // /autoScroll: true,
                emptyText: 'Tidak ada daftar Akun',
                deferEmptyText: false
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    flex: 0.3,
                    text: 'KODE AkUN',
                    dataIndex: 'codeAkun',
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
                    dataIndex: 'namaAkun',
                    renderer: Ext.util.Format.uppercase
                }
            ]
        });

        me.callParent(arguments);
    },
    listeners: {
        afterRender: function () {
            var store = Ext.StoreMgr.lookup('AkunStore');
            var filterCollection = [];

            var statusFilter = new Ext.util.Filter({
                property: 'akun_head_status',
                value: '0NE'
            });
            filterCollection.push(statusFilter);

            var statusFilter = new Ext.util.Filter({
                property: 'akun_fungsi',
                value: '0'
            });
            filterCollection.push(statusFilter);

            var statusFilter = new Ext.util.Filter({
                property: 'akun_fungsi=ow',
                value: '1'
            });
            filterCollection.push(statusFilter);

            store.clearFilter(true);
            store.filter(filterCollection);
        }
    }
});