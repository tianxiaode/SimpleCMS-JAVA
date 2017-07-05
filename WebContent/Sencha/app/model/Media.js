Ext.define('SimpleCMS.model.Media', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.identifier.Negative'
    ],

    fields: [
        { name: 'Id', type: 'int' },
        { name: 'FieldName', defaultValue: '' },
        { name: 'Description', defaultValue: '' },
        { name: 'Path', defaultValue: '' },
        { name: 'Type', type: 'int', defaultValue: '1' , min:1, max:3 },
        { name: 'Size', type: 'int', defaultValue: '0' },
        { name: 'UploadedDate', type: 'date', dateFormat: AppLocale.DefaultDatetimeFormat }
    ],
    idProperty: 'Id',
    identifier: 'negative'

});
