Ext.define('SimpleCMS.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    //TODO: implement central Facebook OATH handling here
    onLoginButton: function() {
        var me = this,
            f = me.getView().getForm();
        if (f.isValid()) {
            f.submit({
                url: AppUrl.get('account', 'login'),
                waitMsg: AppLocale.LoginSubmitWaitMsg,
                waitTitle: AppLocale.LoginSubmitWaitTitle,
                success: function (form, action) {
                    window.location.reload();
                },
                failure: AppFP.form,
                scope: me
            });
        }
    },

    onResetClick:  function() {
        var me = this,
            view = me.getView(),
            f = view.getForm();
        if (f.isValid()) {
            f.submit({
                url: AppUrl.get('account', 'passwordreset'),
                waitMsg: AppLocale.SaveWaitMsg,
                waitTitle: AppLocale.PasswordResetTitle,
                success: function (form, action) {
                    AppToast.toast(AppLocale.PasswordResetSuccess, view.el, null, function () {
                        window.history.back();
                        window.location.reload(); 
                        
                    });
                },
                failure: AppFP.form,
                scope: me
            });
        }
    },

    onReturnClick: function () {
        window.history.back();
    },

    verifyCodeUrl: AppUrl.get('VerifyCode', ''),

    onRefrestVcode: function () {
        var me = this,
            view = me.getView(),
            img = view.down('image');
        img.setSrc(me.verifyCodeUrl + '?_dc=' + (new Date().getTime()));
    },

    onLoginViewShow: function () {
        this.onRefrestVcode();
    }

});