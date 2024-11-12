import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/post/postSlice';
import { BsFillXOctagonFill, BsImage } from "react-icons/bs";
import s from './AddPostPage.module.scss';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext';

const AddPostPage = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    const submitHandler = async () => {
        if (!title || !text) {
            setError('Title and text are required');
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
            setError('Failed to create post. Please try again later.');
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
            <h1 className={s.title}>Add new post</h1>

            {error && <p className={s.error}>{error}</p>}

            <label className={s.fileInputLabel}>
                <BsImage className={s.icon} />
                Add image
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
                Title:
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    className={`${s.inputField} ${theme === 'dark' ? s.dark : s.light}`}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>

            <label className={s.inputLabel}>
                Text:
                <textarea
                    value={text}
                    placeholder="Text"
                    className={`${s.textareaField} ${theme === 'dark' ? s.dark : s.light}`}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
            </label>

            <div className={s.buttonGroup}>
                <button className={`${s.submitBtn} ${theme === 'dark' ? s.dark : s.light}`} onClick={submitHandler}>
                    Add
                </button>
                <button className={`${s.cancelBtn} ${theme === 'dark' ? s.dark : s.light}`} type="button" onClick={clearFormHandler}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default AddPostPage;
