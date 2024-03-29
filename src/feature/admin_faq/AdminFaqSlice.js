import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllFaqsUrl = 'http://localhost:8080/api/v1/faqs';
const createNewFaqUrl = 'http://localhost:8080/api/v1/insert-faq';
const updateFaqUrl = 'http://localhost:8080/api/v1/update-faq';
const deleteFaqUrl = 'http://localhost:8080/api/v1/delete-faq';

const initialState = {
  faqs: null,
  createFaqStatus: null,
  updateFaqStatus: null,
  deleteFaqStatus: null,
};

export const getAllFaqs = createAsyncThunk('/api/Faq', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllFaqsUrl,
  });

  response.data.responseObject.map((item) => (item.key = item.id));

  return response.data.responseObject;
});

export const createNewFaq = createAsyncThunk('/api/Faq/CreateFaq', async ({ question, answer }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: createNewFaqUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id: '',
      question,
      answer,
      deleted: false,
    },
  });

  return response.data.status;
});

export const updateFaq = createAsyncThunk('/api/Faq/UpdateFaq', async ({ id, question, answer }, thunkApi) => {
  const response = await axios({
    method: 'put',
    url: updateFaqUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id,
      question,
      answer,
      deleted: false,
    },
  });

  return response.data.status;
});

export const deleteFaq = createAsyncThunk('/api/Faq/DeleteFaq', async ({ id, question, answer }, thunkApi) => {
  const response = await axios({
    method: 'delete',
    url: deleteFaqUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id,
      question,
      answer,
      deleted: true,
    },
  });

  return response.data.status;
});

export const adminFaqSlice = createSlice({
  name: 'adminFaqSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllFaqs.fulfilled, (state, action) => {
      state.faqs = action.payload;
    });
    builder.addCase(createNewFaq.fulfilled, (state, action) => {
      state.createFaqStatus = action.payload;
    });
    builder.addCase(updateFaq.fulfilled, (state, action) => {
      state.updateFaqStatus = action.payload;
    });
    builder.addCase(deleteFaq.fulfilled, (state, action) => {
      state.deleteFaqStatus = action.payload;
    });
  },
});

export default adminFaqSlice.reducer;
