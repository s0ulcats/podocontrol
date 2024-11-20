import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios.js';

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
  error: null,
};

export const createPost = createAsyncThunk('post/createPost', async (params) => {
  try {
    const { data } = await axios.post('/posts', params);
    return data;
  } catch (error) {
    throw error;
  }
});

export const removePost = createAsyncThunk('post/removePost', async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
});

export const updatePost = createAsyncThunk('post/updatePost', async ({ id, params }) => {
  try {
    const { data } = await axios.put(`/posts/${id}`, params);
    return data;
  } catch (error) {
    throw error;
  }
});

export const getAllPosts = createAsyncThunk('post/getAllPosts', async (page = 1) => {
  try {
    const { data } = await axios.get(`/posts?page=${page}`);
    return data;
  } catch (error) {
    throw error;
  }
});

export const getPostById = createAsyncThunk('post/getPostById', async (id) => {
  try {
    const { data } = await axios.get(`/posts/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
        state.popularPosts = action.payload.popularPosts;
        state.loading = false;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post._id !== action.payload._id);
      });
  },
});

export default postSlice.reducer;
