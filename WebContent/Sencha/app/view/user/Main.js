Ext.define('SimpleCMS.view.user.Main', {
    extend: 'SimpleCMS.ux.container.FixedHeightOfFirstItem',
    xtype: 'userView',

    requires: [
        'Ext.grid.Panel',
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.*',
        'SimpleCMS.ux.form.field.Search',
        'SimpleCMS.view.user.MainModel',
        'SimpleCMS.view.user.MainController',
        'SimpleCMS.view.user.Edit'
    ],

    controller: 'user',
    viewModel: 'user',

    items: [
        {
            xtype: 'grid',
            reference: 'UserGrid',
            emptyText: AppLocale.EmptyText,
            columns: [
                { xtype: 'rownumberer'},
                { text: AppLocale.UserModel.UserName, dataIndex: 'UserName', flex: 1, renderer: 'onHighLightRenderer'},
                { text: AppLocale.UserModel.Roles, dataIndex: 'Roles', width: 100 },
                { xtype: 'datecolumn', text: AppLocale.UserModel.CreatedDate, dataIndex: 'CreatedDate', format: AppLocale.DefaultDatetimeFormat, width: 150 },
                { xtype: 'datecolumn', text: AppLocale.UserModel.LastLoginDate, dataIndex: 'LastLoginDate', format: AppLocale.DefaultDatetimeFormat, width: 150 },
                {
                    xtype: 'checkcolumn', text: AppLocale.UserModel.Lockout, dataIndex: 'Lockout', width: 100,
                    listeners: { checkchange: 'onUserCheckChange' }
                },
                {
                    xtype: 'checkcolumn', text: AppLocale.UserModel.IsApprove, dataIndex: 'IsApprove', width: 100 ,
                    listeners: { checkchange: 'onUserCheckChange'}
                }
            ],

            selModel: { selType: 'checkboxmodel', showHeaderCheckbox: false },
            cls: 'email-inbox-panel shadow',
            headerBorders: false,
            rowLines: false,

            padding: 20,

            tbar: [
                { iconCls: "x-fa fa-file", ui: 'soft-green', tooltip: AppLocale.Add, handler: 'onUserAdd' },
                { iconCls: "x-fa fa-pencil", ui: 'soft-blue', tooltip: AppLocale.Edit, handler: 'onUserEdit', bind: { disabled: '{!selection}' } },
                { iconCls: "x-fa fa-trash", ui: 'soft-red', tooltip: AppLocale.Delete, handler: 'onUserDelete', bind: { disabled: '{!selection}' }},
                { iconCls: "x-fa fa-refresh", ui: 'soft-cyan', tooltip: AppLocale.Refresh, handler: 'onRefresh' },
                '-',
                { xtype: 'uxsearchfield', fieldLabel: AppLocale.Search, labelWidth:40, width: 260, bind: { store: '{users}' }},
                '->',
                { xtype: 'tbtext', bind: '共{count}条' }
            ],

            bind: { selection: '{selection}', store: '{users}' }
        }
    ]

})