/**
 * @author Isht Ae
 **/
Ext.define('eTrav.view.divstockopname.divsoItemTreeGrid', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.divsoitemtreegrid',
    itemId: 'divsoitemtreegrid',
    id: 'divsoitemtreegrid',
    border: false,
    store: 'ItemStoreTree',
    useArrows: true,
    rootVisible: false,
    multiSelect: false,
    singleExpand: false,
    stripeRows: true,
    columnLines: true,
    cls: 'akunGrid',
    flex: 1,
    forceFit: true,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Daftar Barang',
                deferEmptyText: false
            },
            columns: [
                {
                    xtype: 'treecolumn',
                    text: 'NAMA BARANG',
                    width: 200,
                    dataIndex: 'itemName',
                    renderer: function (value, meta, record) {
                        if (record.get('isChild') == 1) {
                            return value.toUpperCase().capitalize();
                        }
                        else {
                            return "<b>" + value.toUpperCase().capitalize() + "</b>";
                        }
                    }
                },
                {
                    width: 120,
                    xtype: 'numbercolumn',
                    align: 'center',
                    header: 'Stock Akhir',
                    dataIndex: 'lastStock',
                    renderer: function (value, meta, record) {
                        if (record.get('isChild') == 1) {
                            return value;
                        }
                        else {
                            return Ext.util.Format.number('000', value);
                        }
                    }
                },
                {
                    width: 100,
                    header: 'Kemasan',
                    dataIndex: 'itemName',
                    hidden: false
                },
                {
                    width: 100,
                    header: 'Merk',
                    dataIndex: 'itemMerkName',
                    renderer: function (value, meta, record) {
                        if (record.get('isChild') == 1) {
                            return value;
                        }
                        else {
                            return "";
                        }
                    }
                },
                {
                    width: 100,
                    header: 'No Katalog',
                    dataIndex: 'itemCatalog',
                    renderer: function (value, meta, record) {
                        if (record.get('isChild') == 1) {
                            return value;
                        }
                        else {
                            return "";
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */