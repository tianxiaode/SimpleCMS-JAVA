Ext.define("SimpleCMS.ux.form.BaseForm",
{
    extend: 'Ext.form.Panel',
    xtype: 'baseform',

    requires: [
        'Ext.form.field.*',
        'Ext.toolbar.*',
        'Ext.button.*',
        'Ext.state.*'
    ],

    waitMsg: AppLocale.SaveWaitMsg,
    waitTitle: AppLocale.Save,
    saveButton: 'button[formBind=true]',
    resetButton: 'resetButton',

    fieldDefaults: {
        labelWidth: 80,
        anchor: '0'
    },
    border: false,
    trackResetOnLoad: true,
    defaultType: 'textfield',
    bodyPadding: 10,

    saved: null,
    closeCmp: 'window',
    titleCmp: 'window',
    objectName: '',
    eidtUrl: null,
    addUrl: null,
    hasSaved: false,
    hasNew: false,
    config: {
        defaultModelValue: {}
    },

    viewModel: {
        data: {
            isEdit: false
        }
    },

    onSave: function (button) {
        var me = this,
            f = me.getForm();
        if(button) me.saved = button.saved;
        if (f.isValid()) {
            f.submit({
                submitEmptyText: false,
                url: me.url,
                waitMsg: me.waitMsg,
                waitTitle: me.waitTitle,
                success: me.onSubmitSuccess,
                failure: me.onSubmitFailure,
                scope: me
            });
        }
    },

    onReset: function () {
        var me = this;
        me.getForm().reset();
        me.initFocus();
    },

    getSavedMessage: function (saved) {
        return saved === 'new'
            ? AppLocale.SavedAndNew
            : saved === 'close' ? AppLocale.SavedAndClose : AppLocale.SavedAndNothing;
    },

    onSubmitSuccess: function (form, eOpts) {
        var me = this,
            saved = me.saved, msg, fn,
            record = me.getRecord(),
            isEdit = me.getViewModel().get('isEdit');
        me.hasSaved = true;
        me.updateRecord();
        if (!isEdit) {
            record.set(eOpts.result.data);
            me.hasNew = true;
        }
        record.commit();
        me.fireEvent('recordupdate', me, record, isEdit, eOpts);
        AppToast.toast(me.getSavedMessage(saved), me.el, null,
            saved === 'close' ? me.onFormClose :  me.initFocus,
            me);
        if (me.saved === 'new') me.addRecord();
        if (me.saved === 'custom') me.fireEvent('aftersaved', me, record, isEdit, eOpts);
    },

    onFormClose: function () {
        var me = this;
        me.up(me.closeCmp).close();
    },

    onSubmitFailure: function(form, action) {
        var me = this;
        AppFP.form(form, action);
    },

    initComponent: function () {
        var me = this,
            saveButton = me.saveButton,
            resetButton = me.resetButton;
        me.callParent(arguments);
        me.bindButtonEvent();
    },

    bindButtonEvent: function() {
        var me = this,
            saveButton = me.saveButton,
            resetButton = me.resetButton,
            i,ln;
        if (Ext.isString(saveButton)) {
            saveButton = me.query(saveButton);
            ln = saveButton.length;
            for (i = 0; i < ln; i++) {
                saveButton[i].on('click', me.onSave, me);
            }
            me.saveButton = saveButton;
        }
        if (Ext.isString(resetButton)) {
            resetButton = me.down('#' + resetButton);
            me.resetButton = resetButton;
            resetButton.on('click', me.onReset, me);
        }
    },

    initState: function () {
        var me = this;
        me.hasSaved = false;
        me.hasNew = false;
    },

    addRecord: function (initState) {
        var me = this,
            model = me.baseModel;
        if (initState === true) me.initState();
        if (Ext.isEmpty(me.addUrl)) Ext.raise('没有定义新建时的提交地址：addUrl');
        me.fireEvent('beforeaddrecord', me);
        if (model) {
            me.switchTitle(AppLocale.Add + me.objectName);
            me.loadRecord(Ext.create(model, Ext.apply({}, me.getDefaultModelValue())));
            me.url = me.addUrl;
            me.getViewModel().set('isEdit', false);
            me.onReset();
            me.fireEvent('afteraddrecord', me);
        } else {
            Ext.raise(AppLocale.NoModel);
        }
    },

    editRecord: function (initState) {
        var me = this;
        if (Ext.isEmpty(me.editUrl)) Ext.raise('没有定义编辑时的提交地址：editUrl');
        if (initState === true) me.initState();
        me.switchTitle(AppLocale.Edit + me.objectName);
        me.url = me.editUrl;
        me.getViewModel().set('isEdit', true);
        me.onReset();
    },


    switchTitle: function(title) {
        var me = this,
            titleCmp = me.titleCmp;
        if (Ext.isEmpty(titleCmp)) return;
        if (titleCmp === 'self') {
            titleCmp = me;
        } else {
            titleCmp = me.up(titleCmp);
        }
        titleCmp.setTitle(title);
    },

    initFocus: function () {
        var me = this,
            field = me.down(me.defaultFocus);
        if (field) {
            field.focus(true, 10);
        }
    }

});