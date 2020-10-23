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

    const updateUiSchema = (items) => {
        items.push('*')
        setUiSchema({
            "ui:order": items
        })
    }

    return { uiSchema, addUiSchema, updateUiSchema }
} 