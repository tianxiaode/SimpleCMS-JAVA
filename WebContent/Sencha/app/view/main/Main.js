Ext.define('SimpleCMS.view.main.Main', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.list.Tree',
        'SimpleCMS.view.main.MainContainerWrap',
        'SimpleCMS.view.main.MainController',
        'SimpleCMS.view.main.MainModel',
        'SimpleCMS.view.pages.*',
        'SimpleCMS.view.authentication.*',
        'SimpleCMS.view.article.Main',
        'SimpleCMS.view.user.Main',
        'SimpleCMS.view.media.Main'
    ],

    controller: 'main',
    viewModel: 'main',

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'onMainViewRender'
    },

    items: [
        {
            xtype: 'toolbar',
            cls: 'sencha-dash-dash-headerbar shadow',
            height: 64,
            itemId: 'headerBar',
            items: [
                {
                    xtype: 'component',
                    reference: 'senchaLogo',
                    cls: 'sencha-logo',
                    html: '<div class="main-logo"><img src="'+ AppUrl.getResource('logo') +'">'+ AppLocale.AppTitle + '</div>',
                    width: 250
                },
                {
                    margin: '0 0 0 8',
                    ui: 'header',
                    iconCls:'x-fa fa-navicon',
                    id: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize'
                },
                '->',
                {
                    iconCls: 'x-fa fa-key',
                    ui: 'header',
                    tooltip: AppLocale.PasswordResetTitle,
                    href: '#passwordreset',
                    hrefTarget: '_self'
                },
                {
                    ui: 'header',
                    iconCls: 'x-fa fa-power-off',
                    handler: 'onLogout',
                    tooltip: AppLocale.Logout
                },
                {
                    xtype: 'tbtext',
                    bind: { text: '{UserName}' },
                    cls: 'top-user-name'
                }
            ]
        },
        {
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            flex: 1,
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTreeList',
                    itemId: 'navigationTreeList',
                    ui: 'navigation',
                    store: 'NavigationTree',
                    width: 250,
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
                    reference: 'mainCardPanel',
                    cls: 'sencha-dash-right-main-container',
                    itemId: 'contentPanel',
                    layout: {
                        type: 'card',
                        anchor: '100%'
                    }
                }
            ]
        }
    ]
});
