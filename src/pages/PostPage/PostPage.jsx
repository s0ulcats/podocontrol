import React, { useContext, useEffect, useState } from 'react';
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import axios from '../../utils/axios.js';
import { Link, useParams } from 'react-router-dom';
import s from './PostPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { removePost } from '../../redux/post/postSlice.js';
import Preloader from '../../components/Preloader/Preloader.jsx';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext.jsx';
import Calendar from '../../components/calendar/Calendar.jsx';

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
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

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  if (!post) {
    return <Preloader />;
  }

  return (
    <div className={`${s.container} ${theme === 'dark' ? s.dark : s.light}`}>
      <Link to="/" className={s.returnBtn}>Return</Link>
      <div className={s.postPage}>
        {post.imgUrl && (
          <div className={s.imgWrapper}>
            <img alt="Post visual" src={`http://localhost:3001/${post.imgUrl}`} className={s.image} />
          </div>
        )}
        <h2 className={s.title}>{post.title}</h2>
        <p className={s.text}>{post.text}</p>

        {/* Button to open Calendar */}
        <div className={s.appointmentAction}>
          <button
            className={`${s.iconBtn} ${theme === 'dark' ? s.dark : s.light}`}
            onClick={toggleCalendar}>
            Записаться на процедуру
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
