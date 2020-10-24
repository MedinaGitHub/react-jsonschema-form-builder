import React, { useState } from 'react';
import defaultSeed from "../schemasJson/rootSchema.json";

export const useJsonSchema = (rootSchema = JSON.parse(JSON.stringify(defaultSeed))) => {
    const [jsonSchema, setJsonSchema] = useState(rootSchema);
    const addJsonSchema = (item) => {
        var newJsonSchema = { ...jsonSchema };

        if (item.sections && item.sections !== "root") {
            debugger
            if (newJsonSchema.properties[item.sections].items) { //array
                if (!newJsonSchema.definitions) {
                    newJsonSchema.definitions = {}
                    newJsonSchema.properties[item.sections].items = { "$ref": `#/definitions/${item.sections}` }
                }
                if (!newJsonSchema.definitions[item.sections]) {
                    newJsonSchema.definitions[item.sections] = { type: "object", properties: {} }
                }
                newJsonSchema.definitions[item.sections].properties[item.id] = item
                if (item.isRequired) {
                    if (!newJsonSchema.definitions[item.sections].required) {
                        newJsonSchema.definitions[item.sections].required = []
                    }
                    newJsonSchema.definitions[item.sections].required.push(item.id)
                }
            } else {//object
                newJsonSchema.properties[item.sections].properties[item.id] = item

                if (item.isRequired) {
                    if (!newJsonSchema.properties[item.sections].required) {
                        newJsonSchema.properties[item.sections].required = []
                    }
                    newJsonSchema.properties[item.sections].required.push(item.id)
                }
            }
        } else {
            newJsonSchema.properties[item.id] = item
            if (item.isRequired) {
                if (!newJsonSchema.required) {
                    newJsonSchema.required = []
                }
                newJsonSchema.required.push(item.id)
            }
        }
        setJsonSchema(newJsonSchema);
    }


    const deleteSchemas = (idesThatContinue) => {
        var All_ids = [];
        for (const prop in jsonSchema.properties) {
            All_ids.push(jsonSchema.properties[prop].id)
        }
        var idsToDelete = All_ids.filter(x => idesThatContinue.indexOf(x) === -1);

        var newJsonSchema = { ...jsonSchema };
        idsToDelete.forEach(prop => {
            delete newJsonSchema.properties[prop]
        });

        if (typeof newJsonSchema.required != 'undefined') {
            newJsonSchema.required = newJsonSchema.required.filter(x => !idsToDelete.includes(x))
            if (newJsonSchema.required.length === 0) {
                delete newJsonSchema.required
            }
        }

        setJsonSchema(newJsonSchema);
    }

    const analizeFieldsObjects = () => {
        var enumNameKeys = []
        var enumKeys = []
        for (const item in jsonSchema.properties) {
            if (jsonSchema.properties[item].properties || jsonSchema.properties[item].items) {
                enumKeys.push(item)
                enumNameKeys.push(jsonSchema.properties[item].title)
            }
        }
        return { enumKeys, enumNameKeys };
    }


    return { jsonSchema, addJsonSchema, deleteSchemas, analizeFieldsObjects }
}