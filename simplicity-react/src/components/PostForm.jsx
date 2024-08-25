/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { createPost, updatePost } from "../api/api";

import "./PostForm.css";
import RicTextEditor from "./RicTextEditor";

const PostForm = ({ postId, onSuccess, closeModal }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError();
    setContentError();
    if (!title) return setTitleError("Title missing");
    if (!content) return setContentError("Content missing");
    const post = { title, content };
    if (postId) {
      await updatePost(postId, post);
    } else {
      await createPost(post);
    }

    onSuccess();
  };

  return (
    <div className="post-form-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Add Post</h2>
        <div className="post-form-title">
          <label>Title:</label>
          <input
            className="post-form-title-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="post-form-content">
          <label>Content:</label>
          <div className="rich-text-editor-quill">
            <RicTextEditor setRichValue={(value) => setContent(value)} />
          </div>
        </div>
        <div className="create-post-cta">
          {titleError && <div style={{ color: "red" }}>{titleError}</div>}
          {contentError && <div style={{ color: "red" }}>{contentError}</div>}
          <button className="post-submit-button" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
