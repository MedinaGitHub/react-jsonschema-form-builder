import React, { useState } from 'react'

export const useUiSchema = (seedSchemaUi = {}) => {

    const [uiSchema, setUiSchema] = useState(seedSchemaUi);

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