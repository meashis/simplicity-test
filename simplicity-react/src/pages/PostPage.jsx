import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/api";
import "./PostPage.css";

const HtmlContent = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

const SinglePostPage = () => {
  const { postId } = useParams(); // Get the postId from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(postId);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch post");
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="post-wrapper">
      {post ? (
        <div>
          <h1>{post.title}</h1>
          <HtmlContent content={post.content} />
          {/* <p>{post.content}</p> */}
        </div>
      ) : (
        <p>Post not found</p>
      )}
    </div>
  );
};

export default SinglePostPage;
