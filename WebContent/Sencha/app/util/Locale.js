Ext.define('SimpleCMS.util.Locale', {
    alternateClassName: 'AppLocale',
    singleton: true,

    config: {
    },

    constructor: function (config) {
        var me = this,
            culture = Ext.util.Cookies.get('_culture') || 'zh_CN',
            message = Ext.ClassManager.get('SimpleCMS.locale.' + culture).get();
        Ext.apply(me, message);
        this.initConfig(config);
        this.callParent(arguments);        
    }

});