Ext.define("SimpleCMS.model.Tag", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'TagName', defaultValue: '' }
    ],
    idProperty: 'TagName'
});
