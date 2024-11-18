import { createSlice } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
  recordings: [],
  loading: false,
  error: null,
};


const recordingSlice = createSlice({
  name: 'recording',
  initialState,
  reducers: {
    setRecordings: (state, action) => {
      state.recordings = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addRecording: (state, action) => {
      state.recordings.push(action.payload);
    },
  },
});

export const { setRecordings, setLoading, setError, addRecording } = recordingSlice.actions;

export const getRecordings = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get('/recordings');
    dispatch(setRecordings(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createRecording = (recording) => async (dispatch) => {
  try {
    const response = await axios.post('/recordings', recording);
    dispatch(addRecording(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default recordingSlice.reducer;
