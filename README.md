This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It's a visual builder of "Json Schema" that export the "Json Schema" generated for then paste this structure of schema in your [react-jsonschema-form component](https://github.com/rjsf-team/react-jsonschema-form) 

## Why?

 Because I needed my clients to create forms visually for then i can export them to another platform whit the sintaxis from react-jsonschema-form


# Demo

[Demo](https://codesandbox.io/s/silent-wood-jihjk?file=/src/index.js:293-323)

## How does it work?

Very easy, if know work react-jsonschema-form you will feel comfortable with the code, since the form that makes the final form is made with react-jsonschema-form.

# Installation

```
$ npm install react-jsonschema-form-builder
```

## How change the design?

You can do a fork and change  this package @rjsf/material-ui for others available options  in  [Supported Themes](https://github.com/rjsf-team/react-jsonschema-form#documentation)

## Implement

```js

    import React from 'react';
    import seed from './seed.json'
    import FormBuilderSchema from "react-jsonschema-form-builder";
    function App() {
        return (
            <>
                <FormBuilderSchema
                    seedSchema={seed} 
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
    <FormBuilderSchema
        getJsonSchemaForm={getJsonSchema}
        seedSchema={seed} 
        prefix={'prefix_befores_ides_inputs'} 
    />
```

![imagen](https://i.imgur.com/Pt0P07u.png)