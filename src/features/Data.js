import { createSlice } from "@reduxjs/toolkit";

export const SliderSlice = createSlice({
  name: "Slider",
  initialState: [],
  reducers: {
    addSlider: (state, action) => {
      state.push(action.payload);
    },
    removeSlider: (state) => {
      return [];
    },
  },
});

export const { addSlider, removeSlider } = SliderSlice.actions;

export default SliderSlice.reducer;
