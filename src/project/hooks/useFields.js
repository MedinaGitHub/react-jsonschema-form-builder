import React, { useState } from 'react'

export const useFields = (formFields2) => {

    const [formFields, setFields] = useState(formFields2);

    const analizeChangeFormBuilder = (result) => {
        const newFields = { ...formFields };
        if (result.enumKeys.length > 0) {
            newFields.properties.sections = {
                type: "string",
                title: "Sección donde estará este campo",
                enum: [
                    "root",
                    ...result.enumKeys
                ],
                enumNames: ["Sección Principal",
                    ...result.enumNameKeys]
            }
            setFields(newFields)
        } else {
            if (newFields.properties.sections) {
                delete newFields.properties.sections
                setFields(newFields)
            }
        }
    }

    return { formFields, analizeChangeFormBuilder }
} 