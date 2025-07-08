import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '@/const';
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/category/all`);
      const data = await res.json();
      if (!data.success) throw new Error('Failed to fetch categories');
      console.log('Fetched categories:', data.categories);
      return data.categories;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
