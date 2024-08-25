import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createComment, getCommentsByPostId, getPostById } from "../api/api";
import "./PostPage.css";
import moment from "moment";

const HtmlContent = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

const SinglePostPage = () => {
  const { postId } = useParams(); // Get the postId from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const comments = await getCommentsByPostId(postId);
    setComments(comments.data);
    console.log("comments::", comments.data);
  };

  const addComment = async () => {
    await createComment({ postId, comment });
    await fetchComments();
  };

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

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="post-wrapper">
      {post ? (
        <div>
          <h1>{post.title}</h1>
          <HtmlContent content={post.content} />

          {comments.map((cmt) => {
            return (
              <div className="comment-card" key={cmt?.idß}>
                <div className="avatar-wrapper">J</div>
                <div className="comment-content-wrapper">
                  <div className="comment-header">
                    Jack: at <span className="comment-ago">{moment(cmt.commented_at).fromNow()}</span>
                  </div>
                  <div className="comment-content">{cmt.comment}</div>
                </div>
              </div>
            );
          })}
          <div className="add-comment-wrapper">
            <textarea className="comment-textarea" onBlur={(e) => setComment(e.target.value)}></textarea>
          </div>
          <button className="add-comment-button" onClick={addComment}>
            Add comment
          </button>
        </div>
      ) : (
        <p>Post not found</p>
      )}
    </div>
  );
};

export default SinglePostPage;
