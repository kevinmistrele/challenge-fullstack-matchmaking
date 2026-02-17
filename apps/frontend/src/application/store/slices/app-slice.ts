import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  isInitialized: boolean;
}

const initialState: AppState = {
  isInitialized: true,
};

// App slice is responsible for managing the global state of the application, such as initialization status.
// It provides a reducer to update the state and an action to set the initialization status.
// This slice is used in the Redux store to maintain and access the app's state throughout the application.
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
  },
});

export const { setInitialized } = appSlice.actions;
export default appSlice.reducer; // O appReducer que a Store procura é este default export!
