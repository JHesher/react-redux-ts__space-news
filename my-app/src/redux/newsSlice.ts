import {
    createAsyncThunk,
    createSlice
  } from '@reduxjs/toolkit';
import { getNewsByIdAPI, getNewsListAPI, INewsList } from '../api/api';

export interface WeatherState {
  newsList: INewsList[],
  news: INewsList | null
};

const initialState: WeatherState = {
  newsList: [],
  news: null
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNewsList(state, action) {
      state.newsList = action.payload;
    },
    setNewsById(state, action) {
      state.news = action.payload;
    }
  },
});

export const getNewsList = createAsyncThunk(
  'news/getNewsList',
  async function (input: string[], { rejectWithValue, dispatch }) {
    try {
      const response = await getNewsListAPI(input);
      console.log({response})
      dispatch(setNewsList(response.data));

      // if (response.data.statusCode !== 200) {
      //   throw new Error('Server error');
      // }

    return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getNewsById = createAsyncThunk(
  'news/getNewsById',
  async function (id: number, { rejectWithValue, dispatch }) {
    try {
      const response = await getNewsByIdAPI(id);
      dispatch(setNewsById(response.data));

      // if (response.data.statusCode !== 200) {
      //   throw new Error('Server error');
      // }

    return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const { 
  setNewsList,
  setNewsById
} = newsSlice.actions;

export default newsSlice.reducer;