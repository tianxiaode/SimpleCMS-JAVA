Ext.define('SimpleCMS.util.Url', {
    alternateClassName: 'AppUrl',
    singleton: true,

    config: {
    },

    constructor: function (config) {
        this.initConfig(config);
        this.callParent(arguments);
    },

    defaultActions: {
        create: 'create',
        read: 'list',
        update: 'update',
        destroy: 'delete',
        details: 'details'
    },

    actions: {},

    crud: {
        c: 'create',
        r: 'read',
        u: 'update',
        d: 'destroy'
    },

    urlFormat: '{0}/{1}/{2}',

    DEBUG: true,

    resources: {
        logo: 'resources/images/company-logo.png'
    },

    get: function (controller, action) {
        var me = this;
        if (!Ext.isString(controller) || Ext.isEmpty(controller)) Ext.raise('非法的控制器名称');
        if (!Ext.isString(action)) Ext.raise('非法的操作名称');
        return Ext.String.format(me.urlFormat, ROOTPATH, controller, me.defaultActions[action] || me.actions[action] || action);
    },

    getApi: function (controller, action) {
        var me = this, act, ln, i, result = {};
        action = Ext.isString(action) ? action.toLowerCase() : '';
        ln = action.length;
        for (i = 0; i < ln; i++) {
            act = me.crud[action[i]];
            if (act) {
                result[act] = me.get(controller, act);
            }
        }
        return result;
    },

    getResource: function (res) {
        var me = this;
        return ROOTPATH + (me.DEBUG ? '/Sencha/' : '/') + me.resources[res];
    }
});