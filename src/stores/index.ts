import { configureStore } from "@reduxjs/toolkit";
import counter from "./counter";
import posts from "./posts";

const store = configureStore({
  reducer: {
    counter,
    posts,
  },
});

export default store;
