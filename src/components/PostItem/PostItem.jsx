import React, { useContext } from 'react';
import s from './PostItem.module.scss';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import Preloader from '../Preloader/Preloader';
import LazyLoad from 'react-lazyload';

const PostItem = React.memo(({ post }) => {
  const { theme } = useContext(ThemeContext);

  if (!post) {
    return <Preloader />;
  }

  return (
    <NavLink to={`/post/${post._id}`} className={s.link}>
      <div className={`${s.post} ${theme === 'dark' ? s.dark : s.light}`}>
        {post.imgUrl ? (
          <LazyLoad height={200} offset={100}>
            <div className={s.imageWrapper}>
              <img alt="img" src={`https://podocontrolback.onrender.com/${post.imgUrl}`} className={s.image} />
            </div>
          </LazyLoad>
        ) : (
          <div className={`${s.placeholder} ${theme === 'dark' ? s.dark : s.light}`}>
            <span>{post.title}</span>
          </div>
        )}
        <div className={`${s.title} ${theme === 'dark' ? s.dark : s.light}`}>{post.title}</div>
        <p className={`${s.text} ${theme === 'dark' ? s.dark : s.light}`}>{post.text}</p>
      </div>
    </NavLink>
  );
});

export default PostItem;
