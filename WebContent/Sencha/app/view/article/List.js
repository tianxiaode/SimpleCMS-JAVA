Ext.define('SimpleCMS.view.article.List', {
    extend: 'SimpleCMS.ux.container.FixedHeightOfFirstItem',
    xtype: 'articleList',

    requires: [
        'Ext.tree.Panel',
        'Ext.grid.Panel',
        'Ext.grid.plugin.DragDrop',
        'Ext.tree.plugin.TreeViewDragDrop',
        'Ext.layout.container.Border',
        'SimpleCMS.view.tag.Main'
    ],

    items: [
        {
            xtype: 'container',
            layout: 'border',
            padding: 20,
            items: [
                {
                    xtype: 'treepanel', collapsible: true, region: 'west', width: 250, maxWidth: 500, minWidth: 200, split: true, reference: 'CategoryTree', useArrows: true,
                    ui: 'light', title: AppLocale.Category, iconCls: 'x-fa fa-list', rootVisible: false, displayField: 'Title', bind: { store: '{categories}', selection: '{categorySelection}' },
                    tbar: [
                        { iconCls: "x-fa fa-file", ui: 'soft-green', tooltip: AppLocale.Add, handler: 'onCategoryAdd' },
                        { iconCls: "x-fa fa-pencil", ui: 'soft-blue', tooltip: AppLocale.Edit, handler: 'onCategoryEdit', bind: { disabled: '{isDisabledCategoryButton}' } },
                        { iconCls: "x-fa fa-newspaper-o", ui: 'soft-purple', tooltip: AppLocale.Details, handler: 'onCategoryDetails', bind: { disabled: '{isDisabledCategoryButton}' } },
                        { iconCls: "x-fa fa-trash", ui: 'soft-red', tooltip: AppLocale.Delete, handler: 'onCategoryDelete', bind: { disabled: '{ieLeaf}' } },
                        { iconCls: "x-fa fa-refresh", ui: 'soft-cyan', tooltip: AppLocale.Refresh, handler: 'onCategoryRefresh' }
                    ],
                    viewConfig: {
                        plugins: [
                            {
                                ptype: 'treeviewdragdrop',
                                dropGroup: 'ContentDrag',
                                enableDrag: false,
                                containerScroll: true,
                                dropZone: {
                                    handleNodeDrop: Ext.emptyFn
                                }
                            }
                        ],
                        listeners: {
                            drop: 'onContentDrop',
                            selectionchange: 'onCategorySelectionChange'
                        }
                    }
                },
                {
                    xtype: 'grid', region: 'center', flex: 1, ui: 'light', iconCls: 'x-fa fa-file-text' ,
                    columns: [
                        { xtype: 'rownumberer' },
                        { text: AppLocale.ContentModel.ContentId, dataIndex: 'ContentId', width: 80 },
                        { text: AppLocale.ContentModel.Title, dataIndex: 'Title', flex: 1, renderer: 'onContentTitleRenderer' },
                        { text: AppLocale.ContentModel.Tags, dataIndex: 'Tags', flex: 1, sortable: false },
                        { text: AppLocale.ContentModel.Created, dataIndex: 'Created', width: 150, xtype: 'datecolumn', format: AppLocale.DefaultDatetimeFormat },
                        { text: AppLocale.ContentModel.SortOrder, dataIndex: 'SortOrder', width: 80 },
                        { text: AppLocale.ContentModel.Hits, dataIndex: 'Hits', width: 80 }
                    ],
                    reference: 'ContentGrid',
                    emptyText: AppLocale.EmptyText,
                    selModel: { selType: 'checkboxmodel', showHeaderCheckbox: false },
                    cls: 'email-inbox-panel shadow',
                    headerBorders: false,
                    rowLines: false,
                    bind: { selection: '{selection}', store: '{contents}', title: '{title} > {categoryTitle}{searchValue}'},
                    dockedItems: [
                        {
                            xtype: 'toolbar', dock: 'top', items: [
                                { iconCls: "x-fa fa-file", ui: 'soft-green', tooltip: AppLocale.Add, handler: 'onContentAdd' },
                                { iconCls: "x-fa fa-pencil", ui: 'soft-blue', tooltip: AppLocale.Edit, handler: 'onContentEdit', bind: { disabled: '{!selection}' } },
                                { iconCls: "x-fa fa-trash", ui: 'soft-red', tooltip: AppLocale.Delete, handler: 'onContentDelete', bind: { disabled: '{!selection}' } },
                                { iconCls: "x-fa fa-refresh", ui: 'soft-cyan', tooltip: AppLocale.Refresh, handler: 'onContentRefresh' },
                                '-',
                                { iconCls: 'x-fa fa-search', tooltip: AppLocale.Search, enableToggle: true, reference: 'contentSearchButton', pressed: false },
                                '-',
                                { iconCls: 'x-fa fa-tag', tooltip: AppLocale.TagManager, handler: 'onTagManager' },
                                '->',
                                { xtype: 'tbtext', bind: '共{count}条' }
                            ]
                        },
                        {
                            xtype: 'toolbar', dock: 'top', bind: { hidden: '{!contentSearchButton.pressed}' }, reference: 'searchToolbar',
                            items: [
                                { xtype: 'tbtext', text: AppLocale.SearchDate },
                                {
                                    xtype: 'datefield', name: 'StartDate', width: 150, vtype: 'daterange',
                                    parentXtype: 'toolbar', itemId: 'StartDate', endDateField: 'EndDate', format: AppLocale.DefaultDateFormat
                                },
                                { xtype: 'tbtext', text: '～'},
                                {
                                    xtype: 'datefield', name: 'EndDate', width: 150, vtype: 'daterange',
                                    parentXtype: 'toolbar', itemId: 'EndDate', startDateField: 'StartDate', format: AppLocale.DefaultDateFormat
                                },
                                { xtype: 'tbtext', text: AppLocale.SearchText },
                                { xtype: 'textfield', name: 'Query', width: 150 , itemId: 'Query'},
                                {
                                    iconCls: 'x-fa fa-play', tooltip: AppLocale.SearchStart, handler: 'onStartSearch', reference: 'startSearchButton',
                                    bind: { disabled: '{ StartDate.isValid && EndDate.isValid}' }
                                }
                            ]
                        }
                    ],
                    listeners: {
                        cellclick: 'onContentGridCellClick'
                    },
                    viewConfig: {
                        plugins: {
                            ptype: 'gridviewdragdrop',
                            dragGroup: 'ContentDrag',
                            enableDrop: false
                        }
                    }
                }
            ]
        }
    ],

    listeners: {
        activate: 'onListActivate'
    }

    
})