Ext.define('GlApp.view.akmsakun.listAkunCustom', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.akmsakun.listakuncustom',
    itemId: 'listakuncustom',
    border: false,
    forceFit: true,
    height: 250,
    width: 400,
    columnLines: true,
    flex: 1,
    store: 'AkunCustomStore',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            viewConfig: {
                emptyText: 'Tidak ada daftar Item',
                deferEmptyText: false
            },
            columns: [
                Ext.create(Ext.grid.RowNumberer),
                {
                    xtype: 'gridcolumn',
                    flex: 0.5,
                    text: 'NAMA PARAMS',
                    dataIndex: 'customName',
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.5,
                    text: 'FIELD LABEL',
                    dataIndex: 'customLabel'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.12,
                    text: 'DEFAULT',
                    align: 'center',
                    dataIndex: 'status',
                    renderer: function (value, meta, record) {
                        var url = value == 1 ?
                            BASE_URL + 'assets/img/active.png' :
                            BASE_URL + 'assets/img/non-active.png';
                        meta.tdCls = 'td-img';

                        return Ext.String.format('<img src="{0}" />', url);
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});