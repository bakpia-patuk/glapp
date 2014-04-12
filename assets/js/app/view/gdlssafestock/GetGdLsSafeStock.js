/**
 * @author Isht Ae
 **/

Ext.define('GlApp.view.gdlssafestock.GetGdLsSafeStock', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.gdlssafestock.getgdlsSafestock',
    itemId: 'getgdlsSafestock',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'fit',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'grid',
                    border: true,
                    ui: 'orange-panel',
                    title: 'DAFTAR SAFETY STOCK',
                    forceFit: true,
                    columnLines: true,
                    viewConfig: {
                        autoScroll: true,
                        emptyText: 'Tidak ada data Arus Barang',
                        deferEmptyText: false
                    },
                    tbar: [
                        {
                            xtype: 'combobox',
                            itemId: 'golTypeSs',
                            fieldLabel: 'Filter ',
                            labelWidth: 40,
                            labelAlign: 'right',
                            emptyText: 'Pilih...',
                            margins: '0 0 0 3',
                            displayField: 'type',
                            valueField: 'typeCode',
                            queryMode: 'local',
                            forceSelection: true,
                            typeAhead: true,
                            allowBlank: true,
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
                            emptyText: 'Pilih Filter',
                            itemId: 'miGridSs',
                            displayField: 'type',
                            valueField: 'typeCode',
                            readOnly: true,
                            queryMode: 'local',
                            forceSelection: true,
                            typeAhead: true,
                            allowBlank: true,
                            valueNotFoundText: 'Tidak ada Data',
                            store: new Ext.data.SimpleStore({
                                id: 0,
                                fields: [
                                    'typeCode', //numeric value is the key
                                    'type' //the text value is the value
                                ],
                                data: [
                                    [1, 'Golongan'],
                                    [2, 'Barang']
                                ]
                            })
                        },
                        {
                            xtype: 'combobox',
                            emptyText: 'Cabang',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            emptyText: 'Query String'
                        },
                        {
                            text: 'SEARCH',
                            ui: 'orange-button'
                        },
                        '->',
                        {
                            text: 'CETAK',
                            ui: 'orange-button'
                        },
                        {
                            text: 'REFRESH',
                            ui: 'orange-button'
                        },
                        {
                            text: 'ALL',
                            ui: 'orange-button'
                        }

                    ],
                    columns: [
                        Ext.create('Ext.grid.RowNumberer'),
                        {
                            text: 'NAMA BARANG',
                            width: 200,
                            dataIndex: 'itemName'
                        },
                        {
                            width: 100,
                            header: 'KEMASAN',
                            dataIndex: 'itemKemDef',
                            hidden: false
                        },
                        {
                            width: 70,
                            xtype: 'numbercolumn',
                            align: 'center',
                            header: 'MIN',
                            dataIndex: 'minStock',
                            format: '0000'
                        },
                        {
                            width: 70,
                            xtype: 'numbercolumn',
                            align: 'center',
                            header: 'MAX',
                            dataIndex: 'maxStock',
                            format: '0000'
                        },
                        {
                            width: 70,
                            xtype: 'numbercolumn',
                            align: 'center',
                            header: 'STOCK AKHIR',
                            dataIndex: 'lastStock',
                            format: '0000'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */