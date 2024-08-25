import React, { useState } from "react";
import { createPost, updatePost } from "../api/api";

import "./PostForm.css";
import RicTextEditor from "./RicTextEditor";

const PostForm = ({ postId, existingPost, onSuccess, closeModal }) => {
  const [title, setTitle] = useState(existingPost?.title || "");
  const [content, setContent] = useState(existingPost?.content || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          <button className="post-submit-button" type="submit">
            {postId ? "Update" : "Create"}
          </button>
          <button className="cancel-submit-button" onClick={closeModal}>
            close
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
