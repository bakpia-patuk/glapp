/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdmsbarang.MsBarangGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gdmsbarang.msbaranggrid',
    itemId: 'msbaranggrid',
    border: false,
    store: 'gdmsbarang.BarangStore',
    autoScroll: true,
    forceFit: true,
    columnLines: true,
    flex: 1,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Barang',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Filter ',
                    labelWidth: 40,
                    labelAlign: 'right',
                    emptyText: 'Jenis',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    forceSelection: true,
                    typeAhead: true,
                    valueNotFoundText: 'Tidak ada Data',
                    store: new Ext.data.SimpleStore({
                        id: 0,
                        fields: [
                            'typeCode', //numeric value is the key
                            'type' //the text value is the value
                        ],
                        data: [
                            [1, 'Persediaan'],
                            [2, 'Non Persediaan'],
                            [0, 'Inventaris']
                        ]
                    })
                },
                {
                    xtype: 'combobox',
                    minChars: 2,
                    triggerAction: 'all',
//                                    store: 'GolonganStore',
                    emptyText: 'Golongan',
                    displayField: 'golNama',
                    valueField: 'golId',
                    queryMode: 'remote',
                    allowBlank: false,
                    matchFieldWidth: false,
                    hidden: false,
                    listConfig: {
                        minWidth: 185
                    }
                },
                {
                    xtype: 'combobox',
                    minChars: 2,
                    triggerAction: 'all',
//                                    store: 'GolonganStore',
                    emptyText: 'Cabang',
                    displayField: 'golNama',
                    valueField: 'golId',
                    queryMode: 'remote',
                    allowBlank: false,
                    matchFieldWidth: false,
                    hidden: false,
                    listConfig: {
                        minWidth: 185
                    }
                },
                {
                    xtype: 'textfield',
                    emptyText: 'Ketik Nama Barang',
                    allowBlank: false
                },
                {
                    text: 'Search'
                },
                '->',
                {
                    xtype: 'checkbox',
                    margins: '0 0 0 0',
                    boxLabel: 'Tidak Aktif',
                    itemId: 'bbayar',
                    inputValue: 1,
                    uncheckedValues: 0,
                    checked: false,
                    handler: function(ctl, val) {
                    }
                },
                {
                    text: 'Refresh'
                },
                {
                    text: 'All'
                }
                
            ],
            columns: [
                {
                    dataIndex: 'id',
                    hidden: true
                },
                {
                    width: 120,
                    text: 'KODE BARANG',
                    sortable: false,
                    dataIndex: 'mi_kode'
                },
                {
                    text: 'NAMA BARANG',
                    width: 200,
                    dataIndex: 'mi_name',
                    renderer: function (value, meta, record) {
//                        if (record.get('mi_child_stat') === 1) {
//                            return value.toUpperCase().capitalize();
//                        }
//                        else {
//                            return "<b>" + value.toUpperCase().capitalize() + "</b>";
//                        }
                    }
                },
                {
                    text: 'STOCK',
                    hidden: true,
                    width: 40,
                    align: 'center',
                    dataIndex: 'lastStock'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */