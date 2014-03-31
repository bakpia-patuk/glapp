/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.ksmintakas.KsMintaKasGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ksmintakas.ksmintakasgrid',
    title: 'DAFTAR PERMINTAAN KAS DIVISI',
    itemId: 'ksmintakasgrid',
    autoScroll: true,
    forceFit: true,
    ui: 'green-panel',
    store: 'ksmintakas.MintaKasStore',
    columnLines: true,
//    flex: 1,
    border: false,
    selModel: Ext.create('Ext.ux.selection.CheckboxModel', {
        header: false
    }),

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Permintaan',
                deferEmptyText: false
            },
            columns: [
                {
                    xtype: 'datecolumn',
                    width: 100,
                    text: 'TGL. TRANS',
                    dataIndex: 'tgl_trx',
                    renderer: function (value, meta, record) {
                        var status = record.get('apprStatus');
                        
                        if (status === 0) {
                            return '<span style="color:#FF0000;">' + Ext.util.Format.date(value, 'd/M/Y') + '</span>';
                        } else {
                            return Ext.util.Format.date(value, 'd/M/Y');
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 130,
                    text: 'DIVISI',
                    dataIndex: 'nama_divisi',
                    renderer: function (value, meta, record) {
                        var status = record.get('apprStatus');
                        
                        if (status === 0) {
                            return '<span style="color:#FF0000;">' + value + '</span>';
                        } else {
                            return value;
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    hidden: false,
                    width: 300,
                    text: 'KEPERLUAN',
                    dataIndex: 'trx_desc',
                    renderer: function (value, meta, record) {
                        var status = record.get('apprStatus');
                        
                        if (status === 0) {
                            return '<span style="color:#FF0000;">' + value + '</span>';
                        } else {
                            return value;
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 60,
                    text: 'APPR.',
                    dataIndex: 'trx_appr_status',
                    align: 'center',
                    renderer: function (value) {
                        var returnValue = "";

                        if (value === 0) {
                            returnValue = '<span style="color:#FF0000;">T</span>';
                        } else {
                            returnValue = "Y";
                        }

                        return returnValue;
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */