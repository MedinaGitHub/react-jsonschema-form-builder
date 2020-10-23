import React from "react";
import { shallow, mount, render } from 'enzyme';
import App from '../../project/App';
import defaultSeed from "../../project/schemasJson/rootSchema.json";

describe("custom hook: useTodos", () => {

    // Este Test me sirve para ver si la app falla. prueba todo.
    it("render App with all params", () => {

        const getJsonSchemaForm = (log) => { return log };
        const rootSchema = defaultSeed;
        const rootSchemaUi = {};
        const prefix = 'formulario_';

        //1) nuestro mount o wrappper, montamos el componente,
        const wrapper = mount(
            <App
                getJsonSchemaForm={getJsonSchemaForm}
                rootSchema={rootSchema}
                rootSchemaUi={rootSchemaUi}
                prefix={prefix}
            />
        )
       
        //el metodo text() toma todo nuestro wrapper y lo transforma en un texto, y con include podemos ver si está o no el texto
        const respuesta = wrapper.find('.MuiFormControl-root').at(0).text().includes('Título del Formulario')

        expect(respuesta).toEqual(true)
    })

});