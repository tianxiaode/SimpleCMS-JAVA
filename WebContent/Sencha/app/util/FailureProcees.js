Ext.define('SimpleCMS.util.FailureProcess', {
    singleton: true,
    alternateClassName: 'AppFP',

    requires: [
        'SimpleCMS.util.Locale'
    ],

    ajax: function (response, options) {
        var title = AppLocale.FailureProcessTitle;
        if(response.status === 404) {
            Ext.Msg.alert(title, AppLocale.FailureProcess404);
        } else if (response.status === 500) {
            Ext.Msg.alert(title, AppLocale.FailureProcess500);
        } else if (!Ext.isEmpty(response.responseText)) {
            Ext.Msg.alert(title, Ext.String.format(AppLocale.FailureProcessOther, response.status, response.responseText));
        }
    },

    proxy: function (proxy, response, options, epots) {
        var status = response.status;
        if ((status >= 200 && status < 300) || status === 304) {
            if (options.error) Ext.Msg.alert(AppLocale.FailureProcessTitle, options.error);
        } else {
            AppFP.ajax(response, options);
        }
    },

    form: function (form, action) {
        var status = action.response.status;
        if ((status >= 200 && status < 300) || status === 304) {
            if (action.result.errors === undefined) {
                Ext.Msg.alert(AppLocale.FailureProcessTitle, action.result.msg);
            }
        } else {
            AppFP.ajax(action.response);
        }
    }


});
