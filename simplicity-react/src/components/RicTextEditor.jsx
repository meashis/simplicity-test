/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './RichTextEdit.css'

export default function RicTextEditor({ defaultValue, setRichValue }) {
  const [value, setValue] = useState(defaultValue);

  const setValueHandle = (value) => {
    setValue(value);
    setRichValue(value);
  };

  return <ReactQuill theme="snow" value={value} onChange={setValueHandle} />;
}