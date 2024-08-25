import React, { useEffect, useState } from "react";
import { getPosts, deletePost } from "../api/api";
import _ from "lodash";
import "./PostList.css";
import { useNavigate } from "react-router-dom";

const PostList = ({ lastFetched }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [lastFetched]);

  const fetchPosts = async () => {
    const response = await getPosts();
    setPosts(response.data);
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    fetchPosts();
  };

  const handlePostView = (id) => {
    navigate(`/posts/${id}`);
  };
  const handlePostEdit = (id) => {
    navigate(`/posts/${id}/edit`);
  };

  function stripHtmlUsingDOMParser(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  function getFirst100Chars(str, maxChar = 200) {
    return str.substring(0, maxChar);
  }

  return (
    <div className="post-list-wrapper">
      <div className="post-list-container">
        {posts.map((post) => (
          <div className="post-list-item" key={post.title}>
            <div className="post-list-card">
              <h3>{post.title}</h3>
              <p>{getFirst100Chars(stripHtmlUsingDOMParser(post.content))}</p>
            </div>
            <div className="post-list-cta">
              <button onClick={() => handleDelete(post.id)}>Delete</button>
              <button onClick={() => handlePostView(post.id)}>View</button>
              <button onClick={() => handlePostEdit(post.id)}>Edit</button>
            </div>
          </div>
        ))}
        {_.isEmpty(posts) && <p>You don't have any posts.</p>}
      </div>
    </div>
  );
};

export default PostList;
