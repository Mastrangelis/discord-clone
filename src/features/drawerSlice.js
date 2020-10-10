import { createSlice } from '@reduxjs/toolkit';

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {
    active: false,
  },
  reducers: {
    setDrawerActive: (state, action) => {
      state.active = action.payload.active;
    }
  },
});

export const { setDrawerActive } = drawerSlice.actions;

export const selectDrawer = state => state.drawer.active;

export default drawerSlice.reducer;
