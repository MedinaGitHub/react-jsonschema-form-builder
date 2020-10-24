import React, { useEffect, useState } from 'react';
import Form from '@rjsf/material-ui';
import PT from 'prop-types';
import orderSchema from './schemasJson/order.json';
import { useListNameForm } from './hooks/useListNameForm';
import WrapperModal from "./WrapperModal";
import ImportExportIcon from '@material-ui/icons/ImportExport';
import SendIcon from '@material-ui/icons/Send';

const ModalSetOrder = ({
  jsonSchema,
  uiSchema,
  updateUi
}) => {
  const {
    listNameForm,
    transformJsonSchemaToList,
    newList
  } = useListNameForm();
  const [close, setClose] = useState(null);

  const disabledInputs = () => {
    try {
      var index = 0;

      for (const key in jsonSchema.properties) {
        document.getElementById("root_" + index).disabled = true;
        index++;
      }
    } catch (error) {
      console.log('errbClose={cbClose} or', error);
    }
  };

  useEffect(() => {
    transformJsonSchemaToList(jsonSchema, uiSchema);
  }, [jsonSchema, uiSchema]);

  const onSubmit = () => {
    updateUi(listNameForm);
    setClose(true);
    setTimeout(() => {
      setClose(null);
    }, 1000);
  };

  return /*#__PURE__*/React.createElement(WrapperModal, {
    close: close,
    txtBtn: /*#__PURE__*/React.createElement(ImportExportIcon, null),
    txtTitle: "",
    onEntered: disabledInputs
  }, /*#__PURE__*/React.createElement("div", {
    id: "orderForm"
  }, /*#__PURE__*/React.createElement(Form, {
    schema: orderSchema,
    onSubmit: onSubmit,
    formData: listNameForm,
    onChange: e => newList(e.formData)
  }, /*#__PURE__*/React.createElement("button", {
    className: "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary",
    type: "submit"
  }, " ", /*#__PURE__*/React.createElement(SendIcon, null), " "))));
};

ModalSetOrder.PT = {
  jsonSchema: PT.shape({
    properties: PT.arrayOf(PT.object)
  })
};
export default ModalSetOrder;