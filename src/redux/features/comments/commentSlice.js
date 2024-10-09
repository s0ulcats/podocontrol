import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios.js';

const initialState = {
  comments: [],
  loading: false,
};

export const createComment = createAsyncThunk(
  'comment/createComment',
  async ({ postId, comment }) => {
    try {
      const { data } = await axios.post(`/comments/${postId}`, {
        postId,
        comment,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPostComments = createAsyncThunk(
  'comment/getPostComments',
  async (postId) => {
    try {
      const { data } = await axios.get(`/posts/comments/${postId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.comments)) {
          state.comments.push(action.payload); // Убедитесь, что это массив
        } else {
          state.comments = [action.payload]; // Если нет, создайте новый массив
        }
      })
      .addCase(createComment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getPostComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = Array.isArray(action.payload) ? action.payload : []; // Проверка на массив
      })
      .addCase(getPostComments.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default commentSlice.reducer;
