Ext.define('SimpleCMS.view.tag.Main', {
    extend: 'Ext.window.Window',
    xtype: 'tagView',

    requires: [
        'Ext.grid.Panel',
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.*',
        'SimpleCMS.ux.form.field.Search',
        'SimpleCMS.view.tag.MainModel',
        'SimpleCMS.view.tag.MainController'
    ],

    controller: 'tag',
    viewModel: 'tag',
    title: AppLocale.TagManager,
    width: 700,
    height: 500,
    modal: true,
    closeAction: 'hide',
    hideMode: 'offsets',
    layout: 'fit',
    closable: true,
    resizable: false,


    items: [
        {
            xtype: 'grid',
            reference: 'TagGrid',
            emptyText: AppLocale.EmptyText,
            columns: [
                { xtype: 'rownumberer'},
                { text: AppLocale.Tag, dataIndex: 'TagName', flex: 1, renderer: 'onHighLightRenderer'}
            ],

            selModel: { selType: 'checkboxmodel', showHeaderCheckbox: false },
            cls: 'email-inbox-panel shadow',
            headerBorders: false,
            rowLines: false,

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        { iconCls: "x-fa fa-trash", ui: 'soft-red', tooltip: AppLocale.Delete, handler: 'onTagDelete', bind: { disabled: '{!selection}' }},
                        { iconCls: "x-fa fa-refresh", ui: 'soft-cyan', tooltip: AppLocale.Refresh, handler: 'onRefresh'},
                        '-',
                        { xtype: 'uxsearchfield', fieldLabel: AppLocale.Search, labelWidth: 40, width: 200, bind: { store: '{tags}' }},
                        '->',
                        { xtype: 'tbtext', bind: '共{count}条' }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        { xtype: 'tbtext', text: AppLocale.Tag + '：' },
                        { xtype: 'textfield', width: 200, maxLength: 255, reference: 'tagNameField', bind: { value: '{tagName}' } },
                        { iconCls: 'x-fa fa-plus', handler: 'onTagAdd', tooltip: AppLocale.Add, bind: { disabled: '{isDisabled}' } }
                    ]
                }
            ],

            bind: { selection: '{selection}', store: '{tags}' }
        }
    ]

})