import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostsPage from "./pages/PostsPage";
import PagesPage from "./pages/PagesPage";
import CommentsPage from "./pages/CommentsPage";
import Welcome from "./pages/Welcome";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Protect these routes */}
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <PostsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pages"
            element={
              <ProtectedRoute>
                <PagesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/:postId/comments"
            element={
              <ProtectedRoute>
                <CommentsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* Footer with Logout Button */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
