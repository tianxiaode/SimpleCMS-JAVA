Ext.define('SimpleCMS.view.article.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.article',

    requires: [
        'Ext.data.TreeStore',
        'Ext.data.BufferedStore',
        'SimpleCMS.ux.data.proxy.Format',
        'SimpleCMS.model.Category',
        'SimpleCMS.model.Content'
    ],

    data: {
        selection: null,
        categorySelection: null,
        count: 0,
        title: AppLocale.Content,
        searchValue: ''
    },

    formulas: {
        isDisabledCategoryButton: function(get) {
            var sel = get('categorySelection');
            return sel ? sel.data.CategoryId <= 10000 : true;
        },
        ieLeaf: function(get) {
            var sel = get('categorySelection');
            return sel ? sel.data.CategoryId <= 10000 || !sel.isLeaf() : true;
        },
        categoryId: function(get) {
            var sel = get('categorySelection');
            return sel ? sel.data.CategoryId : null;
        },
        categoryTitle: function(get) {
            var sel = get('categorySelection');
            return sel ? sel.data.Title : '';
        }
    },

    stores: {
        categories: {
            type: 'tree',
            model: 'SimpleCMS.model.Category',
            root: {
                CategoryId: 0,
                Title: 'root'
            },
            proxy: {
                type: 'format',
                url: AppUrl.get('category', 'read')
            }
        },
        contents: {
            type: 'buffered',
            model: 'SimpleCMS.model.Content',
            pageSize: 100,
            proxy: {
                type: 'format',
                url: AppUrl.get('content', 'read')
            },
            sorters: {
                property: 'ContentId',
                direction: 'DESC'
            },
            //filters: [
            //    { property: 'CategoryId', value: '{categoryId}' }
            //],
            listeners: {
                load: 'onContentStoreLoad'
            }
        }
    }
});
