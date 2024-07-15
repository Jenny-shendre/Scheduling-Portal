import { configureStore } from "@reduxjs/toolkit";
import SliderSlice from "../features/Data";
export const store = configureStore({
  reducer: {
    Slider: SliderSlice,
  },
});
