import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: null,
  lastName: null,
  profileUrl: null,
  email: null,
  country: null,
  role: ['buyer'],
  verified: false,
  sellerStatus: false,
  blocked: false,
  createdAt: null,
  isLoggedIn: false,
  isAuthenticated: false,
  currentDashboard: null, // ✅ new field
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
        isAuthenticated: true,
      };
    },
    logoutUser: () => initialState,
    updateProfile: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setVerified: (state, action) => {
      state.verified = action.payload;
    },
  
    setBlocked: (state, action) => {
      state.blocked = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setCurrentDashboard: (state, action) => {
      state.currentDashboard = action.payload; // ✅ optional setter
    },
  },
});

export const {
  loginUser,
  logoutUser,
  updateProfile,
  setVerified,
  setBlocked,
  setRole,
  setAuthentication,
  setCurrentDashboard, // ✅ export it
} = userSlice.actions;

export default userSlice.reducer;
