import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../api/api";
import "./PostPage.css";
import RicTextEditor from "../components/RicTextEditor";

const PostEditPage = () => {
  const { postId } = useParams(); // Get the postId from the URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(postId);
        setPost(response.data);
        setTitle(response.data.title)
        setContent(response.data.content)
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch post");
        setLoading(false);
        console.error(err)
      }
    };

    fetchPost();
  }, [postId]);

  const updatePostHandle = async () => {
    await updatePost(postId, { title, content });
    navigate(`/posts`)
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="post-wrapper">
      {post ? (
        <>
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
              <RicTextEditor setRichValue={(value) => setContent(value)} defaultValue={post?.content} />
            </div>
          </div>
          <div className="create-post-cta">
            <button className="post-update-button" onClick={updatePostHandle}>
              Update
            </button>
            <button className="cancel-update-button" onClick={() => navigate(`/posts`)}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <p>Post not found</p>
      )}
    </div>
  );
};

export default PostEditPage;
