/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.kskeluar.DataRujukanGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.kskeluar.datarujukangrid',
    itemId: 'datarujukangrid',
    autoScroll: true,
    title: 'DATA RUJUKAN',
    forceFit: true,
//    store: 'MintaBayarStore',
    columnLines: true,
    flex: 1,
    border: false,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Rujukan',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'tbtext',
                    text: '<strong>Filter :</strong>'
                },
                {
                    xtype: 'datefield',
                    width: 130,
                    fieldLabel: 'Tgl. Awal',
                    emptyText: 'Tgl Awal',
                    hideLabel: true,
                    name: 'dateStart',
                    itemId: 'dateStartKk',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d'
                },
                {
                    xtype: 'tbtext',
                    text: '<small>s/d</small>'
                },
                {
                    xtype: 'datefield',
                    width: 130,
                    fieldLabel: 'Tgl. Akhir',
                    emptyText: 'Tgl Akhir',
                    hideLabel: true,
                    name: 'dateEnd',
                    itemId: 'dateEndKk',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d'
                },
                {
                    xtype: 'button',
                    cls: 'searchBtn',
                    iconCls: 'icon-btn-search'
//                    action: 'kkSearch'
                },
                '->',
                {
                    xtype: 'textfield',
                    emptyText: 'Nama Pemeriksaan',
                    itemId: 'namapemeriksa'
                },
                {
                    xtype: 'button',
                    cls: 'searchBtn',
                    iconCls: 'icon-btn-search'
//                    action: 'kkSearch'
                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'datecolumn',
                    flex: 0.17,
                    text: 'TGL RUJUKAN',
                    dataIndex: 'tglTrx',
                    renderer: Ext.util.Format.dateRenderer('d/M/Y')
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.23,
                    text: 'NAMA PASIEN',
                    dataIndex: 'namaPasien',
                    renderer: 'uppercase'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.6,
                    text: 'NAMA PEMERIKSAAN',
                    dataIndex: 'pemeriksaan'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */