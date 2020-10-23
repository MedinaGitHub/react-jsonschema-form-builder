import React, { useEffect } from 'react';
import Form from '@rjsf/material-ui';
import PT from 'prop-types';
import orderSchema from './schemasJson/order.json';
import { useListNameForm } from './hooks/useListNameForm'
import WrapperModal from "./WrapperModal";

const ModalSetOrder = ({ jsonSchema, updateUi }) => {

    const { listNameForm, transformJsonSchemaToList, newList } = useListNameForm();

    const disabledInputs = () => {
        try {
            var index = 0;
            for (const key in jsonSchema.properties) {
                document.getElementById("root_" + index).disabled = true;
                index++;
            }
        } catch (error) {
            console.log('errbClose={cbClose} or', error)
        }
    }

    useEffect(() => {
        transformJsonSchemaToList(jsonSchema)
    }, [jsonSchema]);

    const onSubmit = () => {
        updateUi(listNameForm);
    }

    return (

        <WrapperModal txtBtn="Ordenar o Eliminar" txtTitle="Ordenar o eliminar un campo según id." onEntered={disabledInputs}>
            <Form schema={orderSchema} onSubmit={onSubmit} formData={listNameForm} onChange={e => newList(e.formData)} />
        </WrapperModal>
    )
}

ModalSetOrder.PT = {
    jsonSchema: PT.shape({
        properties: PT.arrayOf(PT.object)
    }),
    schemaOrder: PT.shape({
        properties: PT.arrayOf(PT.object),
        title: PT.string,
        description: PT.string,
        type: PT.string,
    })
}

export default ModalSetOrder;