import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

const PostsPage = () => {
    return (
        <div>
            <h1>Posts</h1>
            <PostForm onSuccess={() => window.location.reload()} />
            <PostList />
        </div>
    );
};

export default PostsPage;
