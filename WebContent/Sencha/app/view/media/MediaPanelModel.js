Ext.define('SimpleCMS.view.media.MediaPanelModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.media',

    requires: [
        'SimpleCMS.model.Media'
    ],

    data: {
        selection: null,
        count: 0
    },

    stores: {
        mediae: {
            model: 'SimpleCMS.model.Media',
            //autoLoad: true,
            remoteSort: true,
            pageSize: 50,
            proxy: {
                type: 'format',
                extraParams:{type: [1,2,3]},
                url: AppUrl.get('media','read')
            },
            sorters: {
                property: 'UploadedDate',
                direction: 'DESC'
            }
        },
        datelists: {
            autoLoad: true,
            pageSize: 0,
            field: ['Id', 'Text'],
            proxy: {
                type: 'format',
                url: AppUrl.get('media', 'datelist')
            }
        }
    }
});
