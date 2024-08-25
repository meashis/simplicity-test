import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import { useState } from "react";
import Modal from "react-modal";

import "./PostsPage.css";

const PostsPage = () => {
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [lastFetched, setLastFetched] = useState(new Date());

  const closeModal = () => setShowAddPostModal(false);
  const showAddPostModalHandler = () => setShowAddPostModal(true);

  const onSuccessHandle = () => {
    closeModal();
    setLastFetched(new Date());
  };

  const bg = {
    overlay: {
      background: "rgba(108, 122, 137, 0.7)"
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={showAddPostModalHandler}>Add Post</button>
      <PostList lastFetched={lastFetched} />
      <Modal
        isOpen={showAddPostModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="add-post-modal"
        style={bg}
      >
        <PostForm onSuccess={onSuccessHandle} closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default PostsPage;
