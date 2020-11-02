import { useFields } from "../../../project/hooks/useFields";
import { renderHook, act } from '@testing-library/react-hooks'

describe('useFields', () => {

    const initializeFields = {
        "title": "",
        "description": "",
        "type": "object",
        "required": [
            "fieldType",
            "title"
        ],
        "properties": {
            "fieldType": {
                "type": "string",
                "title": "Tipo de campo",
                "enum": [
                    "input",
                    "Select",
                    "CheckBox",
                    "Archivo",
                    "Fecha"
                ]
            },
            "title": {
                "type": "string",
                "title": "Título del campo"
            },
            "description": {
                "type": "string",
                "title": "Descripción del campo"
            },
            "check_id": {
                "title": "ID automático",
                "type": "boolean",
                "default": true,
                "enum": [
                    true,
                    false
                ]
            },
            "required": {
                "type": "boolean",
                "title": "¿Es un campo obligatorio?",
                "default": false
            }
        },
        "dependencies": {
            "fieldType": {
                "oneOf": [
                    {
                        "properties": {
                            "fieldType": {
                                "enum": [
                                    "Select"
                                ]
                            },
                            "options": {
                                "type": "array",
                                "title": "Campos de tu selector",
                                "items": {
                                    "type": "string"
                                }
                            }
                        }
                    },
                    {
                        "properties": {
                            "fieldType": {
                                "enum": [
                                    "input",
                                    "CheckBox",
                                    "Archivo",
                                    "Fecha"
                                ]
                            }
                        }
                    }
                ]
            },
            "check_id": {
                "oneOf": [
                    {
                        "properties": {
                            "check_id": {
                                "enum": [
                                    false
                                ]
                            },
                            "id": {
                                "type": "string",
                                "title": "Id del campo"
                            }
                        },
                        "required": [
                            "id"
                        ]
                    },
                    {
                        "properties": {
                            "check_id": {
                                "enum": [
                                    true
                                ]
                            }
                        }
                    }
                ]
            }
        }
    }

    it('analizeChangeStructureModalFields', () => {
        const { result } = renderHook(() => useFields(initializeFields))

        act(() => {
            result.current.analizeChangeStructureModalFields({
                enumKeys: ["formulario_objetos_id"],
                enumNameKeys: ["objetos"]
            })
        })
        expect(result.current.formFields.dependencies).toEqual({
            "fieldType": {
                "oneOf": [
                    {
                        "properties": {
                            "fieldType": {
                                "enum": [
                                    "Select"
                                ]
                            },
                            "options": {
                                "type": "array",
                                "title": "Campos de tu selector",
                                "items": {
                                    "type": "string"
                                }
                            }
                        }
                    },
                    {
                        "properties": {
                            "fieldType": {
                                "enum": [
                                    "input",
                                    "CheckBox",
                                    "Archivo",
                                    "Fecha"
                                ]
                            }
                        }
                    }
                ]
            },
            "check_id": {
                "oneOf": [
                    {
                        "properties": {
                            "check_id": {
                                "enum": [
                                    false
                                ]
                            },
                            "id": {
                                "type": "string",
                                "title": "Id del campo"
                            }
                        },
                        "required": [
                            "id"
                        ]
                    },
                    {
                        "properties": {
                            "check_id": {
                                "enum": [
                                    true
                                ]
                            }
                        }
                    }
                ]
            }
        })
    })
})