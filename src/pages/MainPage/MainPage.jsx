import React, { useEffect, useContext } from 'react';
import PostItem from '../../components/PostItem/PostItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../redux/post/postSlice.js';
import s from './MainPage.module.scss';
import Preloader from '../../components/Preloader/Preloader.jsx';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext.jsx';
import { useTranslation } from 'react-i18next';

const MainPage = React.memo(() => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.post);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div className={s.error}>{t('posts.error_message', { error })}</div>;
  }

  return (
    <div className={`${s.main} ${theme === 'dark' ? s.dark : s.light}`}>
      <div className={s.posts}>
        <h1 className={s.title}>{t('posts.posts_title')}</h1>
        <div className={s.postsContainer}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))
          ) : (
            <div className={s.noPosts}>{t('posts.no_posts')}</div>
          )}
        </div>
      </div>
    </div>
  );
});

export default MainPage;
