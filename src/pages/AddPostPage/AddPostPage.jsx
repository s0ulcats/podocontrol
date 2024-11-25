import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/post/postSlice';
import { BsFillXOctagonFill, BsImage } from "react-icons/bs";
import s from './AddPostPage.module.scss';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext';
import { useTranslation } from 'react-i18next';

const AddPostPage = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();

    const submitHandler = async () => {
        if (!title || !text) {
            setError(t.error_required);
            return;
        }
        try {
            const data = new FormData();
            data.append('title', title);
            data.append('text', text);
            if (image) data.append('image', image);

            await dispatch(createPost(data));
            navigate('/');
        } catch (error) {
            setError(t.error_creation_failed);
            console.error(error);
        }
    };

    const clearFormHandler = () => {
        setTitle('');
        setText('');
        setImage('');
        setError('');
    };

    const detachImageHandler = () => {
        setImage('');
    };

    return (
        <form onSubmit={(e) => e.preventDefault()} className={`${s.addPostPage} ${theme === 'dark' ? s.dark : s.light}`}>
            <h1 className={s.title}>{t('navigation.add_post')}</h1>

            {error && <p className={s.error}>{error}</p>}

            <label className={s.fileInputLabel}>
                <BsImage className={s.icon} />
                {t('forms.add_image')}
                <input
                    type="file"
                    className={s.fileInput}
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </label>

            <div className={s.imagePreviewContainer}>
                {image && (
                    <div className={s.imageWrapper}>
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            className={s.imagePreview}
                        />
                        <button type="button" className={s.detachButton} onClick={detachImageHandler}>
                            <BsFillXOctagonFill />
                        </button>
                    </div>
                )}
            </div>

            <label className={s.inputLabel}>
                {t('forms.title')}:
                <input
                    type="text"
                    placeholder={t('forms.placeholders.title')}
                    value={title}
                    className={`${s.inputField} ${theme === 'dark' ? s.dark : s.light}`}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>

            <label className={s.inputLabel}>
                {t('forms.text')}:
                <textarea
                    value={text}
                    placeholder={t('forms.placeholders.text')}
                    className={`${s.textareaField} ${theme === 'dark' ? s.dark : s.light}`}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
            </label>

            <div className={s.buttonGroup}>
                <button className={`${s.submitBtn} ${theme === 'dark' ? s.dark : s.light}`} onClick={submitHandler}>
                    {t('forms.submit')}
                </button>
                <button className={`${s.cancelBtn} ${theme === 'dark' ? s.dark : s.light}`} type="button" onClick={clearFormHandler}>
                    {t('buttons.cancel')}
                </button>
            </div>
        </form>
    );
};

export default AddPostPage;
