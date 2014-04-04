/*
 * @author Isht Ae
 **/
Ext.define('GlApp.view.akmsakun.AkMsAkunGrid', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.akmsakun.akmsakungrid',
    itemId: 'akmsakungrid',
    //id: 'akmsakungrid',
    title: 'DAFTAR AKUN',
   store: 'akmsakun.AkunStoreTree',
     useArrows: true,
    rootVisible: false,
    multiSelect: false,
    //singleExpand: false,
    stripeRows: true,
    columnLines: true,
    cls: 'akunGrid',
    flex: 1,
    forceFit: true,
    
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                
                '->',
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    iconCls: 'icon-btn-refresh',
                   action: 'akunRefresh'
                }
            ],
            columns: [
            
                {
                    xtype: 'treecolumn',
                    flex: 0.5,
                    text: 'KODE AKUN',
                    sortable: false,
                    dataIndex: 'codeAkun'
                },
                {
                    text: 'NAMA AKUN',
                    flex: 0.5,
                    dataIndex: 'namaAkun',
                   // renderer: function(value, meta, record) {
                   // if (record.get('akunHead') === 1) {
                   //         return value.toLowerCase().title();
                   //    }
                   //     else {
                   //         return "<b>" + value.toUpperCase().capitalize() + "</b>";
                   //     }
                   //}
                },
                 {
                     text: 'TYPE',
                     flex: 0.17,
                     align: 'center',
                    sortable: false,
                     dataIndex: 'akunHead',
                     hidden: true,
                     renderer: function(value, meta, record) {
                         if (value === 1) {
                             return "D";
                         }
                         else {
                             return "H";
                         }
                     }
                 },
                 {
                     text: 'ACTIVE',
                     flex: 0.17,
                     align: 'center',
                     hidden: true,
                     sortable: false,
                     dataIndex: 'aktifStatus',
                     renderer: function(value, meta, record) {
                         var url = value === 1 ?
                                 BASE_PATH + 'assets/img/active.png' :
                                 BASE_PATH + 'assets/img/non-active.png';
                         meta.tdCls = 'td-img';

                         return Ext.String.format('<img src="{0}" />', url);
                     }
                 }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */