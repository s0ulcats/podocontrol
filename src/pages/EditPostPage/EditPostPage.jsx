import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../../utils/axios.js';
import s from './EditPostPage.module.scss';
import { updatePost } from '../../redux/post/postSlice.js';
import { AiOutlineFileImage, AiOutlineEdit, AiOutlineSave, AiOutlineClose } from 'react-icons/ai';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext.jsx';
import { useTranslation } from 'react-i18next'; 

const EditPostPage = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [newImage, setNewImage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation(); 

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = new FormData();
      updatedPost.append('title', title);
      updatedPost.append('text', text);
      updatedPost.append('id', params.id);
  
      if (newImage) {
        updatedPost.append('image', newImage);
      }
  
      await dispatch(updatePost({ id: params.id, params: updatedPost })).unwrap();
      navigate(`/posts`);
    } catch (error) {
      console.error(t('errors.error_updating_post'), error);
    }
  };

  const clearFormHandler = () => {
    setTitle('');
    setText('');
  };

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setTitle(data.title);
    setText(data.text);
    setOldImage(data.imgUrl);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <form onSubmit={submitHandler} className={`${s.editPostPage} ${theme === 'dark' ? s.dark : s.light}`}>
      <label className={s.fileInputLabel}>
        <AiOutlineFileImage className={s.icon} />
        {t('forms.add_image')}
        <input
          type="file"
          className={s.fileInput}
          onChange={(e) => {
            setNewImage(e.target.files[0]);
            setOldImage('');
          }}
        />
      </label>

      <div className={s.imagePreviewContainer}>
        {oldImage && (
          <img
            src={`https://podocontrolback-1.onrender.com/${oldImage}`}
            alt={oldImage.name}
            className={s.imagePreview}
          />
        )}
        {newImage && (
          <img
            src={URL.createObjectURL(newImage)}
            alt={newImage.name}
            className={s.imagePreview}
          />
        )}
      </div>

      <label>
        <AiOutlineEdit className={s.icon} />
        {t('forms.title')}:
        <input
          type="text"
          placeholder={t('forms.placeholders.title')}
          value={title}
          className={`${s.inputField} ${theme === 'dark' ? s.dark : s.light}`}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label>
        <AiOutlineEdit className={s.icon} />
        {t('forms.text')}:
        <textarea
          value={text}
          placeholder={t('forms.placeholders.text')}
          className={`${s.textareaField} ${theme === 'dark' ? s.dark : s.light}`}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </label>

      <div className={s.buttonGroup}>
        <button type="submit" className={`${s.saveButton} ${theme === 'dark' ? s.dark : s.light}`}>
          <AiOutlineSave className={s.iconButton} /> {t('forms.save')}
        </button>
        <button type="button" className={`${s.cancelButton} ${theme === 'dark' ? s.dark : s.light}`} onClick={clearFormHandler}>
          <AiOutlineClose className={s.iconButton} /> {t('buttons.cancel')}
        </button>
      </div>
    </form>
  );
};

export default EditPostPage;
