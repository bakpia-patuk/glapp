/**
 * @author Isht Ae
 **/
Ext.define('GlApp.view.ksmasuk.GkMasterAkunGrid', {
    extend: 'Ext.window.Window',
    alias: 'widget.ksmasuk.gkmasterakungrid',
    itemId: 'gkmasterakungrid',
    autoScroll: true,
    forceFit: true,
//    store: 'KeperluanAkunStore',
    columnLines: true,
//    flex: 1,
    border: false,
    selModel: Ext.create('Ext.ux.selection.CheckboxModel', {
        header: false,
        checkOnly: false,
        mode: 'multi'
    }),

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data Akun',
                deferEmptyText: false
            },
            columns: [
                Ext.create('Ext.grid.RowNumberer', {width: 40}),
                {
                    header: 'Nama Akun',
                    dataIndex: 'namaAkun',
                    width: 150,
                    renderer: 'uppercase',
                    editor: {
                        allowBlank: false
                    }
                }
            ],
            tbar: [
                {
                    xtype: 'textfield',
                    itemId: 'keperluanForm',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'keperluanId',
                    hidden: true
                },
                '->',
                {
                    text: 'Set',
                    ui: 'blue-button',
                    itemId: 'selectAkunKeperluan'
                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */