Ext.define('SimpleCMS.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',

    fields: [{
        name: 'text'
    }],

    root: {
        expanded: true,
        children: [
            {
                text: '¿Õ°×Ò³',
                viewType: 'pageblank',
                leaf: true,
                visible: false
            },
            {
                text: '500',
                viewType: 'page500',
                leaf: true,
                visible: false
            },
            {
                text: 'µÇÂ¼',
                viewType: 'login',
                leaf: true,
                visible: false
            },
            {
                text: 'ÐÞ¸ÄÃÜÂë',
                viewType: 'passwordreset',
                leaf: true,
                visible: false
            }
        ]
    }
});
