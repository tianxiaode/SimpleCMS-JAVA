Ext.define("SimpleCMS.model.Category", {
    extend: "Ext.data.Model",
    requires: [
        'Ext.data.identifier.Negative'
    ],

    fields: [
        { name: 'CategoryId', type: 'int' },
        { name: 'ParentId', type: 'auto', defaultValue: null },
        { name: 'ParentTitle', defaultValue: '' },
        { name: 'Title', defaultValue: '' },
        { name: 'Image', defaultValue: '' },
        { name: 'Content', defaultValue: '' },
        { name: 'SortOrder', type: 'int', defaultValue: 0 },
        { name: 'Created', type: 'date', dateFormat:AppLocale.DefaultDatetimeFormat}
    ],
    idProperty: 'CategoryId',
    identifier: 'negative'
});
