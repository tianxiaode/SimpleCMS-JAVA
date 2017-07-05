Ext.define('SimpleCMS.view.article.Details',{
    extend: 'Ext.panel.Panel',
    xtype: 'articleDetails',

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
    bodyPadding: 20,

    onReturn: function() {
        this.up('articleView').getController().setCurrentView('articleList');
    }
})