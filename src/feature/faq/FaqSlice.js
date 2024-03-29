import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllFaqPairsUrl = 'http://localhost:8080/api/v1/faqs';

const initialState = {
  faqPairs: null,
};

export const getAllFaqPairs = createAsyncThunk('/api/faq', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllFaqPairsUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return response.data.responseObject;
});

export const faqSlice = createSlice({
  name: 'faqSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllFaqPairs.fulfilled, (state, action) => {
      state.faqPairs = action.payload;
    });
  },
});

export default faqSlice.reducer;
