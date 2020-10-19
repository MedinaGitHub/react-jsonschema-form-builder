import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { renderHook, cleanup, act } from '@testing-library/react-hooks'
import { useUiSchema } from "./useUiSchema";

configure({ adapter: new Adapter() })

describe('useUiSchema', () => {

    it('addUiSchema', () => {
        const { result } = renderHook(() => useUiSchema())

        act(() => {
            result.current.addUiSchema({
                formulario_country_id: {
                    'ui:help': "Select your country",
                    'ui:widget': "select"
                }
            })
        })

        act(() => {
            result.current.addUiSchema({
                formulario_plus_id: {
                    'ui:help': "field plus",
                }
            })
        })
        expect(result.current.uiSchema).toEqual(
            {
                formulario_country_id: { 'ui:help': 'Select your country', 'ui:widget': 'select' },
                formulario_plus_id: { 'ui:help': 'field plus' }
            }
        )
    })

    it('updateUiSchema', () => {

        const { result } = renderHook(() => useUiSchema())

        act(() => {
            result.current.addUiSchema({
                formulario_country_id: {
                    'ui:help': "Select your country",
                    'ui:widget': "select"
                }
            })
        })

        act(() => {
            result.current.addUiSchema({
                formulario_plus_id: {
                    'ui:help': "field plus",
                }
            })
        })

        act(() => {
            result.current.updateUiSchema(
                ['formulario_country_id']
            )
        })

        expect(result.current.uiSchema).toEqual(
            { 'ui:order': ['formulario_country_id', '*'] }
        )
    })

})