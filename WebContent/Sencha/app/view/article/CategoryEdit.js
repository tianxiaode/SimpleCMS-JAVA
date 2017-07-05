Ext.define('SimpleCMS.view.article.CategoryEdit', {
    extend: 'SimpleCMS.ux.form.BaseForm',
    xtype: 'categoryEdit',

    requires: [
        'Ext.layout.container.Column',
        'Ext.form.FieldContainer',
        'SimpleCMS.ux.form.field.TinymcePlus',
        'SimpleCMS.model.Category',
        'SimpleCMS.ux.form.field.combobox.Category',
        'SimpleCMS.ux.form.field.ImageSelect',
        'SimpleCMS.view.media.Win'
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
    defaultFocus:'textfield[name=Title]',
    titleCmp: 'self',
    objectName: AppLocale.Category,
    editUrl: AppUrl.get('category', 'update'),
    addUrl: AppUrl.get('category', 'create'),
    baseModel: 'SimpleCMS.model.Category',
    layout: 'column',
    defaults: {
        columnWidth: .5,
        padding:5
    },
    items: [
        { xtype: 'hidden', name: 'CategoryId'},
        { xtype: 'hidden', name: 'ParentTitle' },
        { fieldLabel: AppLocale.CategoryModel.Title, name: 'Title', allowBlank: false, maxLength: 255 },
        {
            xtype: 'categorySelect', fieldLabel: AppLocale.CategoryModel.ParentId, name: 'ParentId', listeners: { change: 'onParentIdChage' }
        },
        { xtype: 'imageselectfield', fieldLabel: AppLocale.CategoryModel.Image, maxLength: 255, name: 'Image'},
        /*
        {
            xtype: 'fieldcontainer', fieldLabel: AppLocale.CategoryModel.Image, layout: 'hbox', items: [
                { xtype: 'textfield', name: 'Image', maxLength: 255 , flex:1},
                { xtype: 'button', iconCls: 'x-fa fa-image', tooltip: AppLocale.InsertImage, handler: 'onInsertImage' }
            ]
        },
        */
        { xtype: 'numberfield', fieldLabel: AppLocale.CategoryModel.SortOrder, minValue: 0, name: 'SortOrder', hideTrigger: true },
        { xtype: 'tinymceplusfield', name: 'Content', fieldLabel: AppLocale.CategoryModel.Content, labelAlign:'top', columnWidth: 1, maxLength: 4000, height:Ext.Element.getViewportHeight()- 350 }
    ],
    fbar: {
        layout: { pack: 'center' },
        items:[
        {
            width: 120, disabled: true, formBind: true, ui: 'blue',
            xtype: 'saveandnewbutton', saveMenuStateId: 'categoryEdit-savemenu', saveAndNewMenuStateId: 'categoryEdit-saveandnewmenu',
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
        store = me.down('categorySelect').getStore();
        reader = store.getProxy().getReader();
        reader.setTransform(Ext.bind(me.onReaderTransform, me));
    },

    onReturn: function() {
        this.up('articleView').getController().setCurrentView('articleList');
    },

    onReaderTransform: function (response) {
        var me = this,
            isEdit = me.getViewModel().get('isEdit'),
            record = me.getRecord(),
            pid = record.data.ParentId,
            title = record.data.ParentTitle,
            data = response.data || [],
            exist = false,
            ln = data.length,
            i;
        if (pid>10000) {
            for (i = 0; i < ln; i++) {
                if (data[i].CategoryId === pid) {
                    exist = true;
                    break;
                }
            }
            if (!exist) {
                data.push({ CategoryId: pid, Title: title });
                response['data'] = data;
            }
        }
        return response;
    },

    loadRecord: function (record) {
        var me = this,
            store = me.down('categorySelect').getStore(),
            proxy = store.getProxy(),
            params = proxy.extraParams;
        params['id'] = record.data.CategoryId > 10000 ? record.data.CategoryId : null;
        store.load();
        this.callParent(arguments);

    },

    onParentIdChage: function (field, newValue, oldValue) {
        var me = this;
        if (newValue !== oldValue) {
            me.down('hiddenfield[name=ParentTitle]').setValue(field.getRawValue());
        }
    }

});