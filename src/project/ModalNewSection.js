import React from 'react';
import Form from '@rjsf/material-ui';
import newSection from './schemasJson/newSection.json';
import { cleanTextToEnableId } from "./ModalNewField";
import WrapperModal from "./WrapperModal";

export const handleSubmitModalNewSection = (formData, prefix = '') => {
    const newProp = { jsonSchema: {} };

    newProp.jsonSchema.title = formData.title;
    newProp.jsonSchema.description = formData.description;

    if (formData.automatic_id === true) {
        formData.id = prefix + formData.title.toLowerCase().replace(/ /g, "_") + '_id';
        formData.id = cleanTextToEnableId(formData.id)
    }
    newProp.jsonSchema.id = formData.id

    if (formData.isArray === true) {
        newProp.jsonSchema.type = "array";
        newProp.jsonSchema.items = {
        }
    } else {
        newProp.jsonSchema.type = "object";
        newProp.jsonSchema.properties = {
        }
    }
    return newProp
}

export default function ModalNewSection({ addItemForm, prefix }) {
    const onSubmit = ({ formData }, e) => {
        const newProp = handleSubmitModalNewSection(formData, prefix)
        addItemForm(newProp)
    };

    return (
        <WrapperModal txtBtn="Agregar Sección" txtTitle="Nuevo Sección" >
            <Form schema={newSection} onSubmit={onSubmit} />
        </WrapperModal>
    )
}