import React from "react";
import ReactDOM from "react-dom";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { useListNameForm } from "./useListNameForm";
import { renderHook, act } from '@testing-library/react-hooks'

configure({ adapter: new Adapter() })


describe('useUiSchema', () => {

    it('addUiSchema', () => {
        const { result } = renderHook(() => useListNameForm())

        act(() => {
            result.current.transformJsonSchemaToList({
                description: "Subtítulo",
                properties: {
                    formulario_222_id: {
                        id: "formulario_222_id",
                        title: "222",
                        type: "string"
                    },
                    formulario_1111_id: {
                        id: "formulario_1111_id",
                        title: "1111",
                        type: "string"
                    }
                },
                title: "Título del Formulario",
                type: "object"
            })
        })

        expect(result.current.listNameForm).toEqual(
            ["formulario_222_id", "formulario_1111_id" ]
        )
    })

})