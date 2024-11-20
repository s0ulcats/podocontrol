import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMe } from './redux/features/auth/authSlice';
import Layout from './components/Layout/Layout.jsx';
import { ToastContainer } from 'react-toastify';

const MainPage = React.lazy(() => import("./pages/MainPage/MainPage.jsx"));
const AddPostPage = React.lazy(() => import("./pages/AddPostPage/AddPostPage.jsx"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage/RegisterPage.jsx"));
const LoginPage = React.lazy(() => import("./pages/LoginPage/LoginPage.jsx"));
const PostPage = React.lazy(() => import("./pages/PostPage/PostPage.jsx"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage/ProfilePage.jsx"));
const UsersPage = React.lazy(() => import("./pages/UsersPage/UsersPage.jsx"));
const UserProfileContainer = React.lazy(() => import("./components/UserProfile/UserProfileContainer.jsx"));
const DialogPage = React.lazy(() => import("./pages/DialogPage/DialogPage.jsx"));
const EditPostPage = React.lazy(() => import("./pages/EditPostPage/EditPostPage.jsx"));
const Calendar = React.lazy(() => import("./components/calendar/Calendar.jsx"));
const RecordingsPage = React.lazy(() => import("./pages/RecordingsPage/RecordingsPage.jsx"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/post/:id/edit" element={<EditPostPage />} />
          <Route path="/new" element={<AddPostPage />} />
          <Route path="/user/:id" element={<UserProfileContainer />} />
          <Route path="/dialog/:id" element={<DialogPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/recordings" element={<RecordingsPage />} />
        </Routes>
      </Suspense>
      <ToastContainer position="bottom-right" />
    </Layout>
  );
}

export default App;
