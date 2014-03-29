/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.gdmsbarang.MsBarangTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.gdmsbarang.msbarangtree',
    itemId: 'msbarangtree',
    border: false,
    store: 'gdmsbarang.BarangTreeStore',
    useArrows: true,
    rootVisible: false,
    multiSelect: false,
    //singleExpand: false,
    stripeRows: true,
    columnLines: true,
    cls: 'akunGrid',
    flex: 1,
    forceFit: true,
    //FILTERING TREE USING THIS MIXINS GROWHAHAHAHAHAHA......
//    mixins: {
//        treeFilter: 'Ext.ux.TreeFilter'
//    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
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
                    xtype: 'treecolumn',
                    width: 100,
                    text: 'KODE BARANG',
                    sortable: false,
                    dataIndex: 'mi_kode'
                },
                {
                    text: 'NAMA BARANG',
                    width: 250,
                    dataIndex: 'mi_name',
                    renderer: 'uppercase'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */