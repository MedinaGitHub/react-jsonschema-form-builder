import  { handleSubmitModalNewSection } from '../../project/ModalNewSection';
describe('ModalNewSection', () => {

    it('insert new item object', () => {
        var param = {
            title:'users',
            description:'insert users',
            automatic_id: true,
            isArray: false
        }
        const result = handleSubmitModalNewSection(param, 'formulario_');

        expect(result).toEqual(
            {
                jsonSchema: {
                    description:'insert users',
                    id: "formulario_users_id",
                    newSection: true,
                    title: "users",
                    type: "object",
                    properties: {}
                },
            }
        )
    })

    it('insert new item object, flag automatic_id false', () => {
        var param = {
            title:'users',
            automatic_id: false,
            isArray: false,
            id: 'just_users'
        }
        const result = handleSubmitModalNewSection(param, 'formulario_');

        expect(result).toEqual(
            {
                jsonSchema: {
                    id: "just_users",
                    newSection: true,
                    title: "users",
                    type: "object",
                    properties: {}
                },
            }
        )
    })

    it('insert new item object, flag isArray true', () => {
        var param = {
            title:'users',
            automatic_id: true,
            isArray: true,
        }
        const result = handleSubmitModalNewSection(param, 'formulario_');

        expect(result).toEqual(
            {
                jsonSchema: {
                    id: "formulario_users_id",
                    title: "users",
                    newSection: true,
                    type: "array",
                    items: {}
                },
            }
        )
    })

})