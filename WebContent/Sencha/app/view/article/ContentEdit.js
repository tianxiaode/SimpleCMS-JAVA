Ext.define('SimpleCMS.view.article.ContentEdit', {
    extend: 'SimpleCMS.ux.form.BaseForm',
    xtype: 'contentEdit',

    requires: [
        'Ext.layout.container.Column',
        'Ext.form.FieldContainer',
        'Ext.form.field.Tag',
        'SimpleCMS.ux.form.field.TinymcePlus',
        'SimpleCMS.model.Category',
        'SimpleCMS.ux.form.field.combobox.Category',
        'SimpleCMS.ux.form.field.ImageSelect',
        'SimpleCMS.view.media.Win',
        'SimpleCMS.model.Category',
        'SimpleCMS.model.Tag'
    ],

    ui: 'light',
    defaultListenerScope: true,
    header: {
        titlePosition: 1,
        items: [
            {
                xtype: 'button',
                iconCls: 'x-fa fa-arrow-left',
                tooltip: AppLocale.Return,
                ui: 'facebook',
                margin: '0 10px 0 0',
                handler: 'onReturn'
            }
        ]
    },
    padding: 20,
    defaultFocus: 'textfield[name=Title]',
    titleCmp: 'self',
    objectName: AppLocale.Content,
    editUrl: AppUrl.get('content', 'update'),
    addUrl: AppUrl.get('content', 'create'),
    baseModel: 'SimpleCMS.model.Content',
    layout: 'column',
    defaults: {
        columnWidth: .5,
        padding: 5
    },
    height:1300,
    items: [
        { xtype: 'hidden', name: 'ContentId' },
        { fieldLabel: AppLocale.ContentModel.Title, name: 'Title', allowBlank: false, maxLength: 255 },
        { xtype: 'imageselectfield', fieldLabel: AppLocale.ContentModel.Image, maxLength: 255, name: 'Image' },
        {
            xtype: 'combo', fieldLabel: AppLocale.ContentModel.CategoryId, name: 'CategoryId', listeners: { change: 'onCategoryIdChage' },
            displayField: 'CategoryId',valueField: 'CategoryId',queryModel:'remote', minChars: 2,
            tpl: [
                '<ul class="x-list-plain" style="display:table;width:100%;">',
                '<tpl for=".">',
                '<li class="x-boundlist-item">',
                '<span style="width:80px;display:table-cell;">{CategoryId}</span>',
                '<span style="display:table-cell;">{Title}</span>',
                '</li>',
                '</tpl>',
                '</ul>'
            ],
            store: {
                model: 'SimpleCMS.model.Category',
                pageSize: 100,
                proxy: {
                    type: 'format',
                    url: AppUrl.get('category', 'select')
                }
            }
        },
        { fieldLabel: AppLocale.ContentModel.CategoryTitle, name: 'CategoryTitle', readOnly: true },
        { xtype: 'numberfield', fieldLabel: AppLocale.ContentModel.SortOrder, minValue: 0, name: 'SortOrder', hideTrigger: true, allowBlank: false },
        {
            xtype: 'tagfield', fieldLabel: AppLocale.ContentModel.Tags, name: 'Tags',
            displayField: 'TagName', valueField: 'TagName', queryModel: 'remote', minChars: 2,
            store: {
                model: 'SimpleCMS.model.Tag',
                pageSize: 100,
                proxy: {
                    type: 'format',
                    url: AppUrl.get('tag', 'read')
                }
            },
            triggers: {
                plus: {
                    cls: 'x-fa fa-plus',
                    handler: 'onTagAdd'
                }
            }
        },
        { xtype: 'tinymceplusfield', name: 'Summary', fieldLabel: AppLocale.ContentModel.Summary, labelAlign: 'top', columnWidth: 1, maxLength: 500, height:100 },
        { xtype: 'tinymceplusfield', name: 'Body', fieldLabel: AppLocale.ContentModel.Body, labelAlign: 'top', columnWidth: 1, maxLength: 4000, allowBlank: false, height:600 }
    ],
    fbar: {
        layout: { pack: 'center' },
        items: [
            {
                width: 120, disabled: true, formBind: true, ui: 'blue',
                xtype: 'saveandnewbutton', saveMenuStateId: 'contentEdit-savemenu', saveAndNewMenuStateId: 'contentEdit-saveandnewmenu',
                saveMenuSaved: 'custom'
            },
            { text: AppLocale.Reset, width: 120, itemId: 'resetButton', ui: 'soft-purple' }
        ]
    },

    initComponent: function () {
        var me = this,
            store,
            reader;
        me.callParent(arguments);
    },

    onReturn: function () {
        var me = this,
            controller = me.up('articleView').getController();
        if (me.hasNew) {
            controller.getStore('contents').load();
        }
        controller.setCurrentView('articleList');
    },

    onCategoryIdChage: function (field, newValue, oldValue) {
        var me = this,
            store = field.getStore(),
            record;
        if (newValue !== oldValue) {
            record = store.getById(newValue);
            me.down('textfield[name=CategoryTitle]').setValue( record ? record.data.Title : '');
        }
    },

    loadRecord: function(record) {
        var me = this,
            field = me.down('tagfield'),
            store = field.getStore(),
            params = store.getProxy().extraParams,
            id = record.data.ContentId;
        params["cid"] = id > 0 ? id : null;
        store.load();
        me.callParent(arguments);
    },

    onTagAdd: function() {
        var me = this,
            win = AppCfg.getDialog('tagView');
        win.on('close', me.onTagViewClose, me, {single: true});
        win.show();
    },

    onTagViewClose: function() {
        var me = this,
            field = me.down('tagfield'),
            store = field.getStore();
        store.load();
    }


});