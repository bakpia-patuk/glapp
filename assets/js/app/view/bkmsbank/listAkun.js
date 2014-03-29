Ext.define('eTrav.view.masterbank.listAkun', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.listakun',
    itemId: 'mblistakun',
    border: false,
    forceFit: true,
    columnLines: true,
    height: 300,
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
                    width: 125,
                    text: 'KODE AKUN',
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
                    width: 290,
                    text: 'NAMA AKUN',
                    dataIndex: 'namaAkun',
                    renderer: Ext.util.Format.uppercase
                }
            ]
        });

        me.callParent(arguments);
    }
});