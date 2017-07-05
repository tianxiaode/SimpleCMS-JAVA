Ext.define('SimpleCMS.view.media.MediaPanel',{
    extend: 'Ext.panel.Panel',
    xtype: 'mediaPanel',

    requires: [
        'Ext.view.View',
        'Ext.toolbar.Paging',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.TextItem',
        'Ext.ProgressBar',
        'Ext.button.Segmented',
        'Ext.ux.DataView.LabelEditor',
        'Ext.ux.DataView.DragSelector',
        'SimpleCMS.view.media.MediaPanelModel',
        'SimpleCMS.view.media.MediaPanelController',
        'SimpleCMS.ux.button.Upload'
    ],

    controller: 'media',
    viewModel: 'media',

    layout: 'fit',
    items: [
        {
            xtype: 'dataview',
            reference: 'mediaDataView',
            scrollable: 'y',
            bind: { store: '{mediae}', selection: '{selection}' },
            tpl: [
                '<tpl for=".">',
                '<div class="thumb-wrap">',
                '<div class="thumb">',
                '<tpl if="Type &gt; 1">',
                '<span class="{Type:this.icon}" title="文件名：{FileName:htmlEncode}\\n文件大小：{Size:fileSize}\\n上传时间：{UploadedDate:date(\'Y-m-d H:i:s\')}"></span>',
                '<tpl else>',
                '<img src="./Thumbnail/{Path}/{FileName}?width=160&height=160" title="文件名：{FileName:htmlEncode}\\n文件大小：{Size:fileSize}\\n上传时间：{UploadedDate:date(\'Y-m-d H:i:s\')}">',
                '</tpl>',
                '</div>',
                '<p class="x-editable">{Description:this.highLight}</p>',
                '</div>',
                '</tpl>',
                '<div class="x-clear"></div>',
                {
                    icon: function (v) {
                        return v === 2 ? 'x-fa fa-file-audio-o' : v === 3 ? 'x-fa fa-file-video-o' : '';
                    },
                    highLight: function (v) {
                        var dv = this.owner,
                            store = dv.getStore(),
                            proxy = store.getProxy(),
                            query = proxy.extraParams['query'];
                        v = Ext.util.Format.htmlEncode(v);
                        return query
                            ? v.replace(new RegExp('(' + query + ')', "gi"),
                                '<span style="color:red;">$1</span>')
                            : v;
                    }
                }
            ],
            itemSelector: 'div.thumb-wrap',
            selectionModel: { mode: 'MULTI' },
            selectedItemCls: 'thumb-item-selected',
            overItemCls: 'thumb-item-overItem',
            emptyText: AppLocale.EmptyText,
            plugins: [
                { xclass: 'Ext.ux.DataView.LabelEditor', dataIndex: 'Description' },
                { xclass: 'Ext.ux.DataView.DragSelector' }
            ],
            listeners: { itemdblclick: 'onMediaShow' }
        }
    ],
    dockedItems: [
        {
            xtype: 'pagingtoolbar', dock: 'top', displayInfo: true, bind: { store: '{mediae}' },
            items: [
                '-',
                {
                    iconCls: 'x-fa fa-upload', tooltip: AppLocale.Upload, ui: 'soft-blue', xtype: 'uploadbutton',
                    uploader:
                    {
                        runtimes: 'html5,flash,silverlight,html4',
                        flash_swf_url: 'resources/js/Moxie.swf',
                        silverlight_xap_url: 'resources/js/Moxie.xap',
                        filters: {
                            max_file_size: '10mb',
                            mime_types: [
                                { title: AppLocale.Image, extensions: 'jpg,gif,png,jpeg' },
                                { title: AppLocale.Aduio, extensions: 'mp3,flac,wav' },
                                { title: AppLocale.Video, extensions: 'mp4,m4v,flv,mov' }
                            ]
                        },
                        url: AppUrl.get("media", 'create'),
                        autoStart: true
                    },
                    listeners:
                    {
                        beforeupload: 'onBeforeUpload',
                        uploadProgress: 'onUploadProgress',
                        fileuploaded: 'onFileUploaded',
                        uploadcomplete: 'onUploadComplete',
                        uploaderror: 'onUploadError'
                    }
                },
                { iconCls: "x-fa fa-trash", ui: 'soft-red', tooltip: AppLocale.Delete, handler: 'onMediaDelete', bind: { disabled: '{!selection}' } }
            ]
        },
        {
            xtype: 'toolbar', dock: 'top',
            items: [
                {
                    xtype: 'segmentedbutton',
                    allowMultiple: true,
                    items: [
                        { text: AppLocale.Image, pressed: true, fileType: 1 },
                        { text: AppLocale.Audio, pressed: true, fileType: 2 },
                        { text: AppLocale.Video, pressed: true, fileType: 3 }
                    ],
                    listeners: {
                        toggle: 'onFileTypeToggle'
                    }
                },
                {
                    xtype: 'combobox', queryMode: "local", displayField: 'Text', valueField: 'Id',
                    forceSelection: true, bind: { store: '{datelists}' }, value: 'all',
                    listeners: {
                        change: 'onDateQueryChange'
                    }
                },
                { xtype: 'uxsearchfield', bind: { store: '{mediae}' } },
                '->',
                { xtype: 'tbtext', text: AppLocale.Sorter + '：' },
                {
                    xtype: 'segmentedbutton',
                    items: [
                        {
                            text: AppLocale.MediaModel.UploadedDate, pressed: true, iconCls: 'x-fa fa-long-arrow-down', iconAlign: 'right',
                            dataIndex: 'UploadedDate', switch: false, handler: 'onSorterButtonClick'
                        },
                        {
                            text: AppLocale.MediaModel.Description, pressed: false, iconCls: 'x-fa fa-long-arrow-up', iconAlign: 'right',
                            dataIndex: 'Description', switch: false, handler: 'onSorterButtonClick'
                        },
                        {
                            text: AppLocale.MediaModel.Size, pressed: false, iconCls: 'x-fa fa-long-arrow-up', iconAlign: 'right',
                            dataIndex: 'Size', switch: false, handler: 'onSorterButtonClick'
                        }
                    ],
                    listeners: {
                        toggle: 'onSorterToggle'
                    }
                }
            ]
        },
        {
            xtype: 'toolbar', dock: 'top', hidden: true, reference: 'progressToolBar', items: [
                { xtype: 'progressbar', flex: 1 }
            ]
        }
    ]

})