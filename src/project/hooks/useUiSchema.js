import React, { useState } from 'react'

export const useUiSchema = (rootSchemaUi = {}) => {

    const [uiSchema, setUiSchema] = useState(rootSchemaUi);

    const addUiSchema = (item) => {
        if (Object.keys(item).length) {
            setUiSchema((prevState) => ({
                ...prevState, ...item
            }));
        }
    }

    const addOrder = (id) => {
        const newUiSchema = { ...uiSchema };
        newUiSchema["ui:order"] = newUiSchema["ui:order"].filter(x => x != '*')
        newUiSchema["ui:order"].push(id)
        newUiSchema["ui:order"].push('*')
        setUiSchema(newUiSchema);
    }

    const updateUiSchema = (items) => {
        items.push('*')
        setUiSchema({
            "ui:order": items
        })
    }

    return { uiSchema, addUiSchema, updateUiSchema, addOrder }
}