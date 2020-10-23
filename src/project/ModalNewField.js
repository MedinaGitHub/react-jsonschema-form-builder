import React from 'react';
import Form from '@rjsf/material-ui';
import WrapperModal from "./WrapperModal";

export const cleanTextToEnableId = (function () {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç¿?",
        to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc__",
        mapping = {};

    for (var i = 0, j = from.length; i < j; i++)
        mapping[from.charAt(i)] = to.charAt(i);

    return function (str) {
        var ret = [];
        for (var i = 0, j = str.length; i < j; i++) {
            var c = str.charAt(i);
            if (mapping.hasOwnProperty(str.charAt(i)))
                ret.push(mapping[c]);
            else
                ret.push(c);
        }
        return ret.join('');
    }

})();

export const handleSubmitModalNewField = (formData, prefix) => {
    const newProp = { jsonSchema: {}, uiSchema: {} };

    newProp.jsonSchema.title = formData.title;

    if (formData.check_id === true) {
        formData.id = prefix + formData.title.toLowerCase().replace(/ /g, "_") + '_id';
        formData.id = cleanTextToEnableId(formData.id)
    }
    newProp.jsonSchema.id = formData.id
    if (typeof formData.description != 'undefined') {
        newProp.uiSchema[formData.id] = { "ui:help": formData.description }
    }

    if (formData.required) {
        newProp.jsonSchema.isRequired = formData.required;
    }
    switch (formData.fieldType) {
        case "Entrada de texto":
            newProp.jsonSchema.type = "string";
            break;
        case "Selector":
            newProp.jsonSchema.type = "string";
            newProp.jsonSchema.enum = formData.options;
            let beforeObject = newProp.uiSchema[formData.id];
            newProp.uiSchema[formData.id] = { ...beforeObject, ...{ "ui:widget": "select" } }
            break;
        case "CheckBox":
            newProp.jsonSchema.type = "boolean";
            break;
        case "Radio buttons":
            newProp.jsonSchema.type = "boolean";
            let beforeObjectRadio = newProp.uiSchema[formData.id];
            newProp.uiSchema[formData.id] = { ...beforeObjectRadio, ...{ "ui:widget": "radio" } }
            break;
        case "Archivo":
            newProp.jsonSchema.type = "string";
            newProp.jsonSchema.format = "data-url";
            break;
        case "Fecha":
            newProp.jsonSchema.type = "string";
            newProp.jsonSchema.format = "date";
            break;

        default:
            break;
    }

    if (formData.sections) {
        newProp.jsonSchema.sections = formData.sections;
    }

    return newProp
}

export default function ModalNewField({ formBuilder, addItemForm, prefix = "" }) {

    const onSubmit = ({ formData }, e) => {
        const newProp = handleSubmitModalNewField(formData, prefix)
        addItemForm(newProp)
    };

    return (
        <WrapperModal txtBtn="Agregar Campo" txtTitle="Nuevo Campo" >
            <Form schema={formBuilder} onSubmit={onSubmit} />
        </WrapperModal>
    );
}