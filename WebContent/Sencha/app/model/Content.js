Ext.define('SimpleCMS.model.Content', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.identifier.Negative'
    ],

    fields: [
        { name: 'ContentId', type: 'int' },
        { name: 'CategoryId', type: 'int', defaultValue: 10000 },
        { name: 'CategoryTitle', type: 'string', defaultValue: AppLocale.NoCategoryArticle },
        { name: 'Title', type: 'string', defaultValue: '' },
        { name: 'Image', type: 'string', defaultValue: '' },
        { name: 'Summary', type: 'string', defaultValue: '' },
        { name: 'Body', type: 'string', defaultValue: '' },
        { name: 'Tags', type: 'string', defaultValue: '' },
        { name: 'Created', type: 'date', dateFormat: AppLocale.DefaultDatetimeFormat},
        { name: 'Hits', type: 'int' },
        { name: 'SortOrder', type: 'int', defaultValue: 0 },
        ''
    ],
    idProperty: 'ContentId',
    identifier: 'negative'
});
