Ext.define('SimpleCMS.model.User', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.identifier.Negative'
    ],

    fields: [
        { name: 'Id', type: 'int'},
        { name: 'UserName', defaultValue: '' },
        { name: 'Roles', defaultValue: '编辑' },
        { name: 'CreatedDate', type: 'date', dateFormat:AppLocale.DefaultDatetimeFormat},
        { name: 'LastLoginDate', type: 'date', dateFormat: AppLocale.DefaultDatetimeFormat},
        { name: 'Lockout', type: 'bool', defaultValue: false },
        { name: 'IsApprove', type: 'bool', defaultValue: true }
    ],
    idProperty: 'Id',
    identifier: 'negative'

});
