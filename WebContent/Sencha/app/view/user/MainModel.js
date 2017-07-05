Ext.define('SimpleCMS.view.user.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.user',

    requires: [
        'Ext.data.BufferedStore',
        'SimpleCMS.ux.data.proxy.Format',
        'SimpleCMS.model.User'
    ],

    data: {
        selection: null,
        count: 0
    },

    stores: {
        users: {
            type: 'buffered',
            model: 'SimpleCMS.model.User',
            autoLoad:true,
            pageSize: 100,
            proxy: {
                type: 'format',
                url: AppUrl.get('user','read')
            },
            sorters: {
                property: 'UserName',
                direction: ''
            },
            listeners: {
                load: 'onUsersStoreLoad'
            }
        }
    }
});
