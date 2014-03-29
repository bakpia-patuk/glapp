/**
 * @author Isht Ae
 **/
Ext.define('eTrav.view.anggaran.detailbayarGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.detailbayargrid',
    itemId: 'detailbayargrid',
    autoScroll: true,
//    title: 'Daftar Kas Masuk',
    forceFit: true,
//    store: 'KasMasukStore',
    columnLines: true,
    flex: 1,
    border: false,
    selModel: Ext.create('Ext.selection.CheckboxModel', {
    }),

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Kas Masuk',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'tbtext',
                    text: '<strong>Filter :</strong>'
                },
                {
                    xtype: 'combobox',
                    width: 100,
                    emptyText: 'Supplier',
                    name: 'supplier'
                },
                {
                    xtype: 'combobox',
                    width: 100,
                    emptyText: 'Cabang',
                    name: 'cabang'
                },
                ,
                {
                    xtype: 'datefield',
                    width: 130,
                    fieldLabel: 'Tgl. Awal',
                    emptyText: 'Tgl Awal',
                    hideLabel: true,
                    name: 'dateStart',
                    itemId: 'dateStartKm',
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
                    itemId: 'dateEndKm',
                    format: 'd/M/Y',
                    submitFormat: 'Y-m-d'
                },
                {
                    xtype: 'button',
                    cls: 'searchBtn',
                    iconCls: 'icon-btn-search',
                    action: 'kmSearch'
                }
//                '->',
//                {
//                    xtype: 'button',
//                    iconCls: 'icon-btn-refresh',
//                    action: 'kmRefresh'
//                },
//                {
//                    iconCls: 'icon-btn-print',
//                    action: 'kmPrint'
//                },
//                {
//                    xtype: 'button',
//                    iconCls: 'icon-btn-clear',
//                    action: 'kmToday'
//                }
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    flex: 0.175,
                    text: 'NO FAKTUR'
//                    dataIndex: 'idTrans'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.2,
                    text: 'TGL FAKTUR'
//                    dataIndex: 'namaAkun'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.2,
                    hidden: false,
                    text: 'CABANG'
//                    dataIndex: 'keterangan',
//                    summaryRenderer: function(value, summaryData, dataIndex) {
//                        return '<span style="font-weight:bold;font-size:12px"> Total</span>';
//                    }
                },
                {
                    flex: 0.2,
                    header: 'TOTAL',
                    align: 'right',
                    //text: 'Jumlah',
                    dataIndex: 'jumlahTrx'
//                    summaryType: 'sum',
//                    renderer: function(value, meta, record) {
//                        return Ext.util.Format.number(value, '0.000,00/i');
//                    },
//                    summaryRenderer: function(value, summaryData, dataIndex) {
//                        return '<span style="font-weight:bold;font-size:12px">' + Ext.util.Format.number(value, '0.000,00/i') + '</span>';
//                    }
                }
//                {
//                    xtype: 'gridcolumn',
//                    flex: 0.2,
////                    hidden: true,
//                    text: 'STATUS'
////                    dataIndex: 'userBuat',
////                    renderer: 'uppercase'
//                },
//                {
//                    xtype: 'datecolumn',
//                    flex: 0.2,
//                    text: 'TGL LUNAS'
//                },
//                {
//                    xtype: 'gridcolumn',
//                    flex: 0.2,
//                    text: 'CARA BAYAR'
//                }
            ]
        });

        me.callParent(arguments);
    },
    listeners: {
        afterRender: function () {
            /* var today = new Date();
             var dd = today.getDate();
             var mm = today.getMonth()+1; //January is 0!

             var yyyy = today.getFullYear();
             if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = yyyy+'-'+mm+'-'+dd;

             var startDate = new Ext.util.Filter({
             filterFn: function(item) {
             return item.data.tglTransaksi == today ? true : false;
             }
             });

             var store = Ext.StoreMgr.lookup('KasMasukStore');
             store.filter(startDate);
             store.load({
             scope   : this,
             callback: function(records, operation, success) {
             //here the store has been loaded so you can use what functions you like.
             //This code sum numbers in certain column
             sum = 0; 
             store.each(function (rec) {
             money = parseInt (rec.get('jumlahTrx')); 
             sum += money;
             });

             sum = Ext.util.Format.number(sum, '0.000,00/i')
             Ext.getCmp('totalSumMasuk').setText('JUMLAH TOTAL : Rp. '+ sum);
             }
             });*/
        }
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */