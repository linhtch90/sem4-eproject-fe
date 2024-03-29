import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllFeedbacksUrl = 'http://localhost:8080/api/v1/feedbacks';
const createNewFeedbackUrl = 'http://localhost:8080/api/v1/insert-feedback';
const deleteFeedbackUrl = 'http://localhost:8080/api/v1/delete-feedback';

const getAllProductsUrl = 'http://localhost:8080/api/v1/products';
const getAllUsersUrl = 'http://localhost:8080/api/v1/users';

const initialState = {
  feedbacks: null,
  createFeedbackStatus: null,
  deleteFeedbackStatus: null,
};

export const getAllFeedbacks = createAsyncThunk('/api/Feedback', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllFeedbacksUrl,
  });

  const responseProducts = await axios({
    method: 'get',
    url: getAllProductsUrl,
  });

  const responseUsers = await axios({
    method: 'get',
    url: getAllUsersUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  response.data.responseObject.map((item) => (item.key = item.id));
  response.data.responseObject.map((item) => {
    responseUsers.data.responseObject.map((usertbl) => {
      if (usertbl.id === item.userId) {
        item.name = usertbl.firstname + ' ' + usertbl.lastname;
      }
    });
  });

  response.data.responseObject.map((item) => {
    responseProducts.data.responseObject.map((product) => {
      if (product.id === item.productId) {
        item.product = product.name;
      }
    });
  });

  return response.data.responseObject;
});

export const createNewFeedback = createAsyncThunk(
  '/api/Feedback/CreateFeedback',
  async ({ userId, content, productId, firstName, lastName }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: createNewFeedbackUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id: '',
        userId,
        content,
        productId,
        firstName,
        lastName,
        deleted: false,
      },
    });

    return response.data.status;
  }
);

export const deleteFeedback = createAsyncThunk(
  '/api/Feedback/DeleteFeedback',
  async ({ id, userId, content, productId, firstName, lastName }, thunkApi) => {
    const response = await axios({
      method: 'delete',
      url: deleteFeedbackUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id,
        userId,
        content,
        productId,
        firstName,
        lastName,
        deleted: true,
      },
    });

    return response.data.status;
  }
);

export const adminFeedbackSlice = createSlice({
  name: 'adminFeedbackSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllFeedbacks.fulfilled, (state, action) => {
      state.feedbacks = action.payload;
    });
    builder.addCase(createNewFeedback.fulfilled, (state, action) => {
      state.createFeedbackStatus = action.payload;
    });
    builder.addCase(deleteFeedback.fulfilled, (state, action) => {
      state.deleteFeedbackUrl = action.payload;
    });
  },
});

export default adminFeedbackSlice.reducer;
