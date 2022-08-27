import { createSlice } from '@reduxjs/toolkit'

const countSlice = createSlice({
  name: 'count',
  initialState: {
    value: 0
  },
  reducers: {
    add: (state) => {
      state.value += 1;
    },
    sub: (state) => {
      state.value -= 1;
    },
    set: (state, action) => {
      state.value = action.payload
    }
  }
});

export const { add, sub, set } = countSlice.actions;
export default countSlice.reducer;