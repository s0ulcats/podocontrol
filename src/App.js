import Layout from "./components/Layout/Layout.jsx";
import { Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage/MainPage.jsx";
import AddPostPage from "./pages/AddPostPage/AddPostPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import PostPage from "./pages/PostPage/PostPage.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/features/auth/authSlice.js";
import UsersPage from "./pages/UsersPage/UsersPage.jsx";
import UserProfileContainer from "./components/UserProfile/UserProfileContainer.jsx";
import DialogPage from "./pages/DialogPage/DialogPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import EditPostPage from "./pages/EditPostPage/EditPostPage.jsx";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/new" element={<AddPostPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/post/:id/edit" element={<EditPostPage />} />
        <Route path="/user/:id" element={<UserProfileContainer />} />
        <Route path="/dialog/:id" element={<DialogPage />} />
      </Routes>

      <ToastContainer position="bottom-right" />
    </Layout>
  );
}

export default App;
