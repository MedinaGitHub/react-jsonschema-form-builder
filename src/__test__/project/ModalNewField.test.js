import  { handleSubmitModalNewField } from '../../project/ModalNewField';

describe('ModalNewField', () => {

    it('choose input Text', () => {
        var param = {
            check_id: true,
            description: "check in square",
            fieldType: "Entrada de texto",
            required: true,
            title: "Ñandú is your favorite animal ?"
        }
        const result = handleSubmitModalNewField(param, 'formulario_');

        expect(result).toEqual(
            {
                jsonSchema: {
                    id: "formulario_nandu_is_your_favorite_animal___id",
                    isRequired: true,
                    title: "Ñandú is your favorite animal ?",
                    type: "string",
                },
                uiSchema: {
                    formulario_nandu_is_your_favorite_animal___id: { 'ui:help': "check in square" }
                }
            }
        )

    })

    it('choose input Select', () => {
        var param = {
            check_id: true,
            description: "Select your Country",
            fieldType: "Selector",
            options: (2)["Chile", "New Zeland"],
            required: true,
            title: "Country"
        }
        const result = handleSubmitModalNewField(param, 'formulario_');

        expect(result).toEqual(
            {
                jsonSchema: {
                    enum: (2)["Chile", "New Zeland"],
                    id: "formulario_country_id",
                    isRequired: true,
                    title: "Country",
                    type: "string"
                },
                uiSchema: {
                    formulario_country_id: { "ui:help": "Select your Country", "ui:widget": "select" }
                }
            }
        )

    })

    it('choose input CheckBox', () => {
        var param = {
            check_id: true,
            description: "check the square",
            fieldType: "CheckBox",
            required: false,
            title: "do you have animals?"
        }
        const result = handleSubmitModalNewField(param, 'formulario_');

        expect(result).toEqual(
            {
                jsonSchema: {
                    id: "formulario_do_you_have_animals__id",
                    title: "do you have animals?",
                    type: "boolean"
                },
                uiSchema: {
                    formulario_do_you_have_animals__id: { "ui:help": "check the square" }
                }
            }
        )

    })

    it('choose input File', () => {
        var param = {
            check_id: false,
            description: "just PDF",
            fieldType: "Archivo",
            id: "PDF",
            required: false,
            title: "Upload your CV"
        }
        const result = handleSubmitModalNewField(param, 'formulario_');

        expect(result).toEqual(
            {
                jsonSchema: {
                    format: "data-url",
                    id: "PDF",
                    title: "Upload your CV",
                    type: "string"
                },
                uiSchema: {
                    PDF: { "ui:help": "just PDF" }
                }
            }
        )

    })

    it('choose input Date', () => {
        var param = {
            check_id: true,
            description: "Select you birth date",
            fieldType: "Fecha",
            required: true,
            title: "Birth date"
        }
        const result = handleSubmitModalNewField(param, 'formulario_');

        expect(result).toEqual(
            {
                jsonSchema: {
                    format: "date",
                    id: "formulario_birth_date_id",
                    isRequired: true,
                    title: "Birth date",
                    type: "string"
                },
                uiSchema: {
                    formulario_birth_date_id: { "ui:help": "Select you birth date" }
                }
            }
        )
    })
})