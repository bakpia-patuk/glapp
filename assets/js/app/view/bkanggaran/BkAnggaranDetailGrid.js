/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.bkanggaran.BkAnggaranDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bkanggaran.bkanggarandetailgrid',
    itemId: 'bkanggarandetailgrid',
    autoScroll: true,
    forceFit: true,
//    store: 'KasKeluarStore',
    columnLines: true,
    flex: 1,
    border: true,
//    selModel: Ext.create('Ext.selection.CheckboxModel', {
//    }),

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    text: 'NAMA BARANG',
                    flex: 0.6,
                    dataIndex: 'namaAkun',
                    renderer: function (value, meta, record) {
                        if (record.get('akunHead') == 1) {
                            return value.toLowerCase().title();
                        }
                        else {
                            return "<b>" + value.toUpperCase().capitalize() + "</b>";
                        }
                    }
                },
                {
                    xtype: 'numbercolumn',
                    text: 'ITEM PO',
                    flex: 0.2,
                    align: 'center',
                    sortable: false,
                    dataIndex: 'akunHead',
                    renderer: function (value, meta, record) {
                        if (value == "1") {
                            return "D";
                        }
                        else {
                            return "H";
                        }
                    }
                },
                {
                    xtype: 'numbercolumn',
                    text: 'ITEM TERKIRIM',
                    flex: 0.2,
                    align: 'center',
                    sortable: false,
                    dataIndex: 'akunHead',
                    renderer: function (value, meta, record) {
                        if (value == "1") {
                            return "D";
                        }
                        else {
                            return "H";
                        }
                    }
                },
                {
                    xtype: 'numbercolumn',
                    text: 'HARGA SATUAN',
                    flex: 0.3,
                    align: 'right',
                    sortable: false,
                    dataIndex: 'akunHead',
                    renderer: function (value, meta, record) {
                        if (value == "1") {
                            return "D";
                        }
                        else {
                            return "H";
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