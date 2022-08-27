import { configureStore } from '@reduxjs/toolkit';
import count from './count';
import posts from './posts';

export default configureStore({
  reducer: {
    count,
    posts
  }
})