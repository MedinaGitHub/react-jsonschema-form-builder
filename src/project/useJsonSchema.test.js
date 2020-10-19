import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { useJsonSchema } from "./useJsonSchema";
import { renderHook, cleanup, act } from '@testing-library/react-hooks'

configure({ adapter: new Adapter() })

describe("useJsonSchema", () => {

    afterEach((done) => {
        cleanup().then(done)
    })
    it("addJsonSchema", () => {
        const { result } = renderHook(() => useJsonSchema())
        act(() => {
            result.current.addJsonSchema(
                {
                    id: 'formulario_name_id',
                    isRequired: true,
                    title: "Name",
                    type: "string"
                }
            )
        })
        act(() => {
            result.current.addJsonSchema(
                {
                    enum: ["Chile", "U.S.A"],
                    id: "formulario_country_id",
                    title: "Country",
                    type: "string"
                }
            )
        })

        expect(result.current.jsonSchema).toEqual(
            {
                title: 'Título del Formulario',
                description: 'Subtítulo',
                type: 'object',
                properties: {
                    formulario_name_id: {
                        id: 'formulario_name_id',
                        isRequired: true,
                        title: 'Name',
                        type: 'string'
                    },
                    formulario_country_id: {
                        enum: ["Chile", "U.S.A"],
                        id: 'formulario_country_id',
                        title: 'Country',
                        type: 'string'
                    }
                },
                required: ['formulario_name_id']
            }
        )

    })

    it("deleteJsonSchema", () => {
        const { result } = renderHook(() => useJsonSchema())
        act(() => {
            result.current.addJsonSchema(
                {
                    id: 'formulario_name_id',
                    isRequired: true,
                    title: "Name",
                    type: "string"
                }
            )
        })
        act(() => {
            result.current.addJsonSchema(
                {
                    enum: ["Chile", "U.S.A"],
                    id: "formulario_country_id",
                    title: "Country",
                    type: "string"
                }
            )
        })
        act(() => {
            result.current.deleteSchemas(
               ['formulario_country_id']
            )
        })

        expect(result.current.jsonSchema).toEqual(
            {
                title: 'Título del Formulario',
                description: 'Subtítulo',
                type: 'object',
                properties: {
                    formulario_country_id: {
                        enum: ["Chile", "U.S.A"],
                        id: 'formulario_country_id',
                        title: 'Country',
                        type: 'string'
                    }
                }
            }
        )
    })
})