import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import Moment from 'react-moment';
import axios from '../../utils/axios.js';
import { Link, useParams } from 'react-router-dom';
import s from './PostPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { removePost } from '../../redux/post/postSlice.js';
import Preloader from '../../components/Preloader/Preloader.jsx';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext.jsx';

const PostPage = () => {
  const [post, setPost] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const params = useParams();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`/posts/${params.id}`);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [params.id]);

  if (!post) {
    return <Preloader />;
  }

  return (
    <div className={`${s.container} ${theme === 'dark' ? s.dark : s.light}`}>
      <Link to="/" className={s.returnBtn}>Return</Link>
      <div className={s.postPage}>
        {post.imgUrl && (
          <div className={s.imgWrapper}>
            <img alt="img" src={`http://localhost:3001/${post.imgUrl}`} className={s.image} />
          </div>
        )}
        <h2 className={s.title}>{post.title}</h2>
        <p className={s.text}>{post.text}</p>
        <div className={s.postActions}>
          

          {user?._id === post.author && (
            <div className={s.actions}>
              <button className={`${s.iconBtn} ${theme === 'dark' ? s.dark : s.light}`}>
                <Link to={`/post/${post._id}/edit`}>
                  <AiTwotoneEdit />
                </Link>
              </button>
              <button className={`${s.iconBtn} ${theme === 'dark' ? s.dark : s.light}`} onClick={() => dispatch(removePost(params.id))}>
                <AiFillDelete />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
