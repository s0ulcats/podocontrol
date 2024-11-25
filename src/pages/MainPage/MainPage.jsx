import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import { useTranslation } from 'react-i18next';
import Preloader from '../../components/Preloader/Preloader';
import PostItem from '../../components/PostItem/PostItem';
import s from './MainPage.module.scss';
import { getAllPosts } from '../../redux/post/postSlice';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext';
import ContactModalWindow from '../../components/ContactModalWindow/ContactModalWindow';

const MainPage = React.memo(() => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.post);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAllPosts());
      setTimeout(() => setLoadingComplete(true), 1500);
    };

    fetchData();
  }, [dispatch]);

  if (loading || !loadingComplete) {
    return <Preloader />;
  }

  if (error) {
    return <div className={s.error}>{t('posts.error_message', { error })}</div>;
  }

  const renderPost = ({ index, style }) => (
    <div style={style}>
      <PostItem post={posts[index]} />
    </div>
  );

  return (
    <div className={`${s.main} ${theme === 'dark' ? s.dark : s.light}`}>
      <div className={s.posts}>
        <h1 className={s.title}>{t('posts.posts_title')}</h1>
        <div className={s.postsContainer}>
          {posts.length > 0 ? (
            <List
              height={600}
              itemCount={posts.length}
              itemSize={150}
              width="100%"
            >
              {renderPost}
            </List>
          ) : (
            <div className={s.noPosts}>{t('posts.no_posts')}</div>
          )}
        </div>
        <div className={s.contactModal}>
          <ContactModalWindow />
        </div>
      </div>
    </div>
  );
});

export default MainPage;
