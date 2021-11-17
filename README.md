![Build Status](https://github.com/MedinaGitHub/react-jsonschema-form-builder/workflows/React%20CI/CD/badge.svg)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It's a visual builder of "Json Schema" that export the "Json Schema" generated for then paste this structure of schema in your [react-jsonschema-form component](https://github.com/rjsf-team/react-jsonschema-form) 

## Why?

 Because I needed to create forms visually to export them to another system with react-jsonschema-form syntax

# Demo

[Demo](https://codesandbox.io/s/silent-wood-jihjk?file=/src/index.js:293-323)

## How does it work?

Very easy, if you know how does react-jsonschema-form work, you will feel comfortable with the code.

# Installation

```
$ npm install react-jsonschema-form-builder
```

## How does  the design change?

You can do a fork and change  this package @rjsf/material-ui For watching another available options  you can read  [Supported Themes](https://github.com/rjsf-team/react-jsonschema-form#documentation)

## Implementation

```js

    import React from 'react';
    import seed from './seed.json'
    import FormBuilderSchema from "react-jsonschema-form-builder";
    function App() {
        return (
            <>
                <FormBuilderSchema
                    rootSchema={seed} 
                />
            </>
        );
    }

    export default App;
```

seed.json
```js
        {
            "title": "Form Title",
            "description": "Subtitle",
            "type": "object",
            "properties": {}
        }
```

other properties

```js
    //getJsonSchemaForm =>  callback this json schema
    //prefix =>  if you can add prefix before ID of inprus
    //rootSchemaUi => UiSchema
    //customWidgets => you can import some custom Widget
    //newFields=> You can edit the form of add a new field
    //newPropJsonSchema=> if you add a new item in a custom newFields.json, thi function recibe de //options of you new field, and you can join with a customWidgets
    //modalSchemaUi => UiSchema for the open modal configuration
    <FormBuilderSchem
        getJsonSchemaForm={getJsonSchema}
        rootSchema={seed} 
        rootSchemaUi={{}}
        newFields={jsonSchema}
        prefix={'prefix_befores_ides_inputs'} 
        newPropJsonSchema={(newProp,formData, prefix)=>{return newProp}}
        customWidgets={{CustomCheckbox, FileWidget, ...}}
        modalSchemaUi={{}}
    />
```

![imagen](https://i.imgur.com/Pt0P07u.png)