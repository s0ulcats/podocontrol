import React, { useContext, useEffect, useState } from 'react';
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from '../../utils/axios.js';
import { removePost } from '../../redux/post/postSlice.js';
import Preloader from '../../components/Preloader/Preloader.jsx';
import Calendar from '../../components/calendar/Calendar.jsx';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext.jsx';
import s from './PostPage.module.scss';

const PostPage = React.memo(() => {
  const [post, setPost] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { id: postId } = useParams();
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`/posts/${postId}`);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [postId]);

  const toggleCalendar = () => setShowCalendar((prev) => !prev);

  if (!post) return <Preloader />;

  const isAuthor = user?._id === post.author;

  return (
    <div className={`${s.container} ${theme === 'dark' ? s.dark : s.light}`}>
      <Link to="/" className={s.returnBtn}>{t('buttons.return')}</Link>
      <div className={s.postPage}>
        {post.imgUrl && (
          <div className={s.imgWrapper}>
            <img
              alt={t('posts.postImageAlt')}
              src={`https://podocontrolback.onrender.com/${post.imgUrl}`}
              className={s.image}
            />
          </div>
        )}
        <h2 className={s.title}>{post.title}</h2>
        <p className={s.text}>{post.text}</p>

        <div className={s.appointmentAction}>
          <button
            className={`${s.iconBtn} ${theme === 'dark' ? s.dark : s.light}`}
            onClick={toggleCalendar}
          >
            {t('booking.bookProcedure')}
          </button>
        </div>

        {showCalendar && (
          <div className={s.calendarWrapper}>
            <Calendar
              onChange={(selectedDate) => console.log(selectedDate)}
              procedureTitle={post.title}
            />
          </div>
        )}

        {isAuthor && (
          <div className={s.postActions}>
            <button className={`${s.iconBtn} ${theme === 'dark' ? s.dark : s.light}`}>
              <Link to={`/post/${postId}/edit`}>
                <AiTwotoneEdit />
              </Link>
            </button>
            <button
              className={`${s.iconBtn} ${theme === 'dark' ? s.dark : s.light}`}
              onClick={() => dispatch(removePost(postId))}
            >
              <AiFillDelete />
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default PostPage;
