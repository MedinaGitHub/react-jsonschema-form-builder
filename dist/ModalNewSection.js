import React from 'react';
import Form from '@rjsf/material-ui';
import newSection from './schemasJson/newSection.json';
import { cleanTextToEnableId } from "./ModalNewField";
import WrapperModal from "./WrapperModal";
import PlaylistAddRoundedIcon from '@material-ui/icons/PlaylistAddRounded';
import SendIcon from '@material-ui/icons/Send';
export const handleSubmitModalNewSection = (formData, prefix = '') => {
  const newProp = {
    jsonSchema: {}
  };
  newProp.jsonSchema.title = formData.title;

  if (formData.description) {
    newProp.jsonSchema.description = formData.description;
  }

  if (formData.automatic_id === true) {
    formData.id = prefix + formData.title.toLowerCase().replace(/ /g, "_") + '_id';
    formData.id = cleanTextToEnableId(formData.id);
  }

  newProp.jsonSchema.id = formData.id;

  if (formData.isArray === true) {
    newProp.jsonSchema.type = "array";
    newProp.jsonSchema.items = {};
  } else {
    newProp.jsonSchema.type = "object";
    newProp.jsonSchema.properties = {};
  }

  newProp.jsonSchema.newSection = true;
  return newProp;
};
export default function ModalNewSection({
  addItemForm,
  prefix
}) {
  const onSubmit = ({
    formData
  }, e) => {
    const newProp = handleSubmitModalNewSection(formData, prefix);
    addItemForm(newProp);
  };

  return /*#__PURE__*/React.createElement(WrapperModal, {
    txtBtn: /*#__PURE__*/React.createElement(PlaylistAddRoundedIcon, null),
    txtTitle: ""
  }, /*#__PURE__*/React.createElement(Form, {
    schema: newSection,
    onSubmit: onSubmit
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary",
    type: "submit"
  }, " ", /*#__PURE__*/React.createElement(SendIcon, null), " "))));
}