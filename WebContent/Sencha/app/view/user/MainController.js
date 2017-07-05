Ext.define('SimpleCMS.view.user.MainController',{
    extend: 'SimpleCMS.ux.app.BaseViewController',
    alias: 'controller.user',

    onUsersStoreLoad: function (store, records, successful, operation, eOpts) {
        this.getViewModel().set('count', store.getTotalCount());
    },

    onRefresh: function() {
        this.getStore('users').load();
    },

    userCheckChangeUrl: AppUrl.get('user', 'checkchange'),
    onUserCheckChange: function (column, rowIndex, checked, record, e, eOpts) {
        var me = this;
        me.onColumnCheckChange(me.userCheckChangeUrl, record, column.dataIndex);
    },

    userDeleteUrl: AppUrl.get('user', 'destroy'),
    onUserDelete: function() {
        var me = this;
        me.onDelete(me.lookupReference('UserGrid').getSelection(),
            me.userDeleteUrl,
            "UserName",
            AppLocale.User,
            function (response, opts) {
                var me = this,
                    obj = Ext.decode(response.responseText);
                Ext.Msg.hide();
                if (obj.success) {
                    me.getStore('users').load();
                    me.lookupReference('UserGrid').getSelectionModel().deselectAll();
                }
                AppToast.toast(obj.msg, null, 'b');

            });
    },


    onUserAdd: function () {
        var me = this,
            view = AppCfg.getDialog('userEditView'),
            form = view.down('baseform');
        view.show();
        form.addRecord(true);
    },

    init: function() {
        var me = this,
            view = AppCfg.getDialog('userEditView');
        view.on('close', me.onDialogClose, me);
    },

    onDialogClose: function(dialog) {
        var me = this,
            store = me.getStore('users'),
            form = dialog.down('baseform');
        if (form.hasNew && !form.getViewModel().get('isEdit')) {
            store.sort('CreatedDate', 'DESC');
        }
    },

    onUserEdit: function() {
        var me = this,
            selection = me.lookupReference('UserGrid').getSelection()[0],
            view = AppCfg.getDialog('userEditView'),
            form = view.down('baseform');
        if (!selection) {
            Ext.Msg.alert(AppLocale.DefaultMessageTitle, Ext.String.format(AppLocale.NoSelection, AppLocale.User, AppLocale.Edit));
            return;
        }
        view.show();
        form.loadRecord(selection);
        form.editRecord(true);
    }

});