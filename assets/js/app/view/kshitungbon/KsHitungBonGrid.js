/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.kshitungbon.KsHitungBonGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.kshitungbon.kshitungbongrid',
    itemId: 'kshitungbongrid',
    autoScroll: true,
    forceFit: true,
    store: 'kshitungbon.TrxKasStore',
    columnLines: true,
    flex: 1,
    border: false,
//    selModel: Ext.create('Ext.selection.CheckboxModel', {
//    }),

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    flex: 0.175,
                    text: 'NO. TRANS',
                    dataIndex: 'no_ref_trx',
                    renderer: function (value, meta, record) {
                        var status = record.get('statusKb');
                        if (status != 0) {
                            return value;
                        } else {
                            return '<span style="color:red;">' + value + '</span>';
                        }
                    }
                },
                {
                    xtype: 'datecolumn',
                    flex: 0.190,
                    text: 'TGL. TRANS',
                    dataIndex: 'kas_tgltrx',
                    renderer: function (value, meta, record) {
                        var status = record.get('statusKb');
                        if (status != 0) {
                            return Ext.util.Format.date(value, 'd/M/Y');
                        } else {
                            return '<span style="color:red;">' + Ext.util.Format.date(value, 'd/M/Y') + '</span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.57,
                    text: 'NAMA PEGAWAI',
                    dataIndex: 'kas_namabayar',
                    renderer: function (value, meta, record) {
                        var status = record.get('statusKb');
                        if (status != 0) {
                            return value;
                        } else {
                            return '<span style="color:red;">' + value + '</span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.5,
                    hidden: true,
                    text: 'KETERANGAN',
//                    dataIndex: 'keteranganKd',
                    renderer: function (value, meta, record) {
                        var status = record.get('statusKb');
                        if (status != 0) {
                            return value;
                        } else {
                            return '<span style="color:red;">' + value + '</span>';
                        }
                    }
                },
                {
                    flex: 0.2,
                    align: 'right',
                    header: 'JUMLAH',
                    dataIndex: 'kas_jumlah',
                    renderer: function (value, meta, record) {
                        var status = record.get('statusKb');
                        if (status != 0) {
                            return Ext.util.Format.number(value, '0.000,00/i');
                        } else {
                            return '<span style="color:red;">' + Ext.util.Format.number(value, '0.000,00/i') + '</span>';
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