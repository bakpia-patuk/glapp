var smGrid = Ext.create('Ext.selection.CheckboxModel', {
    mode: 'SINGLE'
});

Ext.define('eTrav.view.divpengadaan.listBarang', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.listbarang',

    border: false,
    forceFit: true,
    columnLines: true,
    //selModel : smGrid,
    flex: 1,
    store: 'JamaahStore',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    xtype: 'button',
                    text: 'Baru',
                    iconCls: 'icon-btn-add',
                    action: 'barangNew'
                }
            ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    flex: 0.3,
                    text: 'NAMA BARANG',
//                    dataIndex: 'namaAkun',
                    renderer: Ext.util.Format.uppercase
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.3,
                    text: 'MERK'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.2,
                    text: 'NO KATALOG'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.2,
                    text: 'KEMASAN'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.2,
                    text: 'JUMLAH PESANAN'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.2,
                    text: 'KETERANGAN'
                }
            ]
        });

        me.callParent(arguments);
    }
});