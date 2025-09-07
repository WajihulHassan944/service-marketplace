import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: null,
  lastName: null,
  profileUrl: null,
  email: null,
  country: null,
  role: [],
  verified: false,
  sellerStatus: false,
  blocked: false,
  createdAt: null,
  isLoggedIn: false,
  isAuthenticated: false,
  currentDashboard: null,
  isHydrated: false,
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
        isHydrated: true,
      };
    },
    logoutUser: () => {
      localStorage.removeItem('currentDashboard'); // ✅ Clear on logout
      localStorage.removeItem("lastActivity");
      return {
        ...initialState,
        isHydrated: true,
      };
    },
    updateProfile: (state, action) => {
      return {
        ...state,
        ...action.payload,
        isHydrated: true,
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
      state.currentDashboard = action.payload;
      localStorage.setItem('currentDashboard', action.payload); // ✅ Save to localStorage
    },
    setHydrated: (state, action) => {
      state.isHydrated = action.payload;
    },
    initializeDashboardFromStorage: (state) => {
      const savedDashboard = localStorage.getItem('currentDashboard');
      if (savedDashboard) {
        state.currentDashboard = savedDashboard;
      }
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
  setCurrentDashboard,
  setHydrated,
  initializeDashboardFromStorage, // ✅ export this
} = userSlice.actions;

export default userSlice.reducer;
