import React from 'react';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

const CommentsPage = ({ postId }) => {
    return (
        <div>
            <h1>Comments for Post {postId}</h1>
            <CommentForm postId={postId} onSuccess={() => window.location.reload()} />
            <CommentList postId={postId} />
        </div>
    );
};

export default CommentsPage;
