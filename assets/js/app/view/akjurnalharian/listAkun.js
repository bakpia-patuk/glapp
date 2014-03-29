Ext.define('eTrav.view.jurnalmemorial.listAkun', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.daftarAkun',
    border: false,
    forceFit: true,
    columnLines: true,
    //selModel : smGrid,
    flex: 1,
    store: 'AkunStore',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                // /autoScroll: true,
                emptyText: 'Tidak ada daftar Akun',
                deferEmptyText: false
            },
            tbar: [
                '->',
                {
                    xtype: 'lookupfield',
                    triggerCls: 'x-form-search-trigger',
                    fieldLabel: 'Label',
                    width: 200,
                    hideLabel: true,
                    emptyText: 'cari nama akun',
                    onTrigger1Click: function () {
                        var store = this.up('grid').getStore(),
                            form = Ext.getCmp('jmform').getForm(),
                            groupAkun = form.findField('groupAkun').getValue(),
                            filterCollection = [];

                        var statusFilter = new Ext.util.Filter({
                            property: 'akun_head_status',
                            value: 1
                        });

                        filterCollection.push(statusFilter);

                        var statusFilter = new Ext.util.Filter({
                            property: 'akun_group',
                            value: groupAkun
                        });

                        filterCollection.push(statusFilter);

                        store.clearFilter(true);
                        store.filter(filterCollection);

                        this.setValue('');
                    },
                    onTrigger2Click: function () {
                        var store = this.up('grid').getStore(),
                            form = Ext.getCmp('jmform').getForm(),
                            groupAkun = form.findField('groupAkun').getValue(),
                            filterCollection = [];

                        var statusFilter = new Ext.util.Filter({
                            property: 'akun_name=ll',
                            value: this.getValue()
                        });
                        filterCollection.push(statusFilter);

                        var statusFilter = new Ext.util.Filter({
                            property: 'akun_head_status=ww',
                            value: 1
                        });

                        filterCollection.push(statusFilter);

                        var statusFilter = new Ext.util.Filter({
                            property: 'akun_group=ww',
                            value: groupAkun
                        });

                        filterCollection.push(statusFilter);

                        store.clearFilter(true);
                        store.filter(filterCollection);
                    }
                }
            ],
            columns: [
                {
                    xtype: 'gridcolumn',
                    flex: 0.3,
                    text: 'Kode Akun',
                    dataIndex: 'codeAkun'
                },
                {
                    xtype: 'gridcolumn',
                    flex: 0.7,
                    text: 'NAMA AKUN',
                    dataIndex: 'namaAkun',
                    renderer: Ext.util.Format.uppercase
                }
            ]
        });

        me.callParent(arguments);
    }
});