// src/redux/features/gigsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '@/const';
export const fetchGigs = createAsyncThunk(
  'gigs/fetchGigs',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/gigs/all`);
      const data = await res.json();
      if (!data.success) throw new Error('Failed to fetch gigs');
      console.log(data.gigs);
      return data.gigs;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const gigsSlice = createSlice({
  name: 'gigs',
  initialState: {
    gigs: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGigs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.gigs = action.payload;
      })
      .addCase(fetchGigs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default gigsSlice.reducer;
