Ext.define('SimpleCMS.ux.app.BaseViewController', {
    extend: 'Ext.app.ViewController',

    messageList: '<div class="message-tips"><ul class="message-tips-list">{0}</ul></div>',
    messageListItem: '<li class="{0}">{1}</li>',


    onHighLightRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var me = this,
            proxy = store.getProxy(),
            query = proxy.extraParams['query'];
        return Ext.isEmpty(query) ? value : value.replace(new RegExp('(' +query+ ')', "gi"), '<span style="color:red;">$1</span>');
    },

    send: function (config, waitMsg) {
        var me = this,
            cfg = Ext.apply({
                scope: me,
                failure: function (response, opts) {
                    Ext.Msg.hide();
                    AppFP.ajax(response, opts);
                } 
            }, config);
        if (!Ext.isEmpty(waitMsg)) Ext.Msg.wait(waitMsg);
        Ext.Ajax.request(cfg);
    },

    onColumnCheckChange: function (url,record, field) {
        var me = this,
            id = record.getId();
        me.send({
            url: url,
            record: record,
            params: { id: id, field: field },
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                Ext.Msg.hide();
                if (obj.success) {
                    opts.record.commit();
                } else {
                    opts.record.reject();
                    AppToast.toast(obj.msg, null, 'b');
                }
            }
        });
    },

    onDelete: function (selections, url, msgField, objectName, success) {
        var me = this,
            fm = Ext.String.format,
            ln = selections.length,
            ids = [], contents = [], i,record;
        if (ln === 0) {
            Ext.Msg.alert(AppLocale.DefaultMessageTitle, fm(AppLocale.DeleteNoSelection, objectName));
            return;
        }
        for (i = 0; i < ln; i++) {
            record = selections[i];
            ids.push(record.getId());
            contents.push(fm(me.messageListItem, 'pointthree', record.get(msgField)));
        }
        Ext.Msg.confirm(AppLocale.DeleteConfirmMessageTitle, fm(AppLocale.DeleteConfirmMessage, objectName, fm(me.messageList,contents.join(''))),
            function (btn) {
                if (btn === "yes") {
                    me.send({
                        url: url,
                        params: { id: ids },
                        success: success
                    }, AppLocale.DeleteWaitMsg);
                }
            }
            , me);

    }


});