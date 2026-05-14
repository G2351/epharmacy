import { configureStore } from "@reduxjs/toolkit";
import profileReducer, {
  loadInitialProfile,
} from "../store/slice/profileSlice";
import countOrderReducer from "../store/slice/countOrderSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    countOrder: countOrderReducer,
  },
});
// store.dispatch(loadInitialProfile());
