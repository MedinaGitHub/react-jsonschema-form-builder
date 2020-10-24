import React from "react";
import { shallow, mount, render } from 'enzyme';
import App from '../../project/App';
import defaultSeed from "./schemasJson/rootSchemaTest.json"

describe("custom hook: useTodos", () => {

    // Este Test me sirve para ver si la app falla. prueba todo.
    it("render App with all params", () => {

        const getJsonSchemaForm = (log) => { return log };
        const rootSchema = defaultSeed;
        const rootSchemaUi = {};
        const prefix = 'formulario_';

        const wrapper = mount(
            <App
                getJsonSchemaForm={getJsonSchemaForm}
                rootSchema={rootSchema}
                rootSchemaUi={rootSchemaUi}
                prefix={prefix}
            />
        )

      wrapper
      .find('button')
      .at(2)
      .simulate('click');
        const respuesta = wrapper.find('input').get(0).props.value
        expect(respuesta).toEqual("formulario_test_1_id")
    })
});