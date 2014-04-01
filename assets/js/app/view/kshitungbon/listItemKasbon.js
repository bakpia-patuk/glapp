Ext.define('eTrav.view.hitungkasbon.listItemKasbon', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.itemkasbon',
    itemId: 'itemkasbon',
    id: 'itemkasbon',
    border: false,
    forceFit: true,
    columnLines: true,
    //selModel : smGrid,
    width: 400,
//    store: 'DetailKbStore',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                // /autoScroll: true,
                emptyText: 'Tidak ada detail kas bon',
                deferEmptyText: false
            },
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    flex: 0.3,
                    text: 'NAMA TRANSAKSI',
                    dataIndex: 'keterangan'
                },
                {
                    xtype: 'numbercolumn',
                    flex: 0.2,
                    align: 'right',
                    header: 'JUMLAH',
                    dataIndex: 'jumlahTrx'
                }
            ]
        });

        me.callParent(arguments);
    },
    listeners: {
//        afterRender: function() {
//            var store = Ext.StoreMgr.lookup('AkunStore');
//            var filterCollection = [];
//
//            var statusFilter = new Ext.util.Filter({
//                property: 'akun_head_status',
//                value: '0NE'
//            });
//            filterCollection.push(statusFilter);
//
//            var statusFilter = new Ext.util.Filter({
//                property: 'akun_fungsi',
//                value: '2'
//            });
//            filterCollection.push(statusFilter);
//
//            store.clearFilter(true);
//            store.filter(filterCollection);
//        }
    }
});