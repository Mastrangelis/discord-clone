import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import appReducer from '../features/appSlice';
import drawerReducer from '../features/drawerSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    drawer: drawerReducer
  },
});
