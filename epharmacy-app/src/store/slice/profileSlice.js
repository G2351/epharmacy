import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userId: null,
    email: null,
    name: null,
  },
  reducers: {
    setProfileRedux: (state, action) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    setNameRedux: (state, action) => {
      state.name = action.payload.name;
    },
    clearProfileRedux: (state) => {
      state.userId = null;
      state.email = null;
      state.name = null;
    },
  },
});

export const { setProfileRedux, clearProfileRedux, setNameRedux } =
  profileSlice.actions;
export default profileSlice.reducer;
// code khác
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Create an async thunk to fetch the profile from AsyncStorage
// export const loadInitialProfile = createAsyncThunk(
//   "profile/loadInitialProfile",
//   async () => {
//     try {
//       const userId = await AsyncStorage.getItem("user_id");
//       const email = await AsyncStorage.getItem("email");
//       const name = await AsyncStorage.getItem("name");
//       return {
//         userId: userId || null,
//         email: email || null,
//         name: name || null,
//       };
//     } catch (error) {
//       console.error("Failed to load profile from AsyncStorage", error);
//       return {
//         userId: null,
//         email: null,
//         name: null,
//       };
//     }
//   }
// );

// export const profileSlice = createSlice({
//   name: "profile",
//   initialState: {
//     userId: null,
//     email: null,
//     name: null,
//     loading: false,
//   },
//   reducers: {
//     setProfileRedux: (state, action) => {
//       state.userId = action.payload.userId;
//       state.email = action.payload.email;
//       state.name = action.payload.name;
//     },
//     clearProfileRedux: (state) => {
//       state.userId = null;
//       state.email = null;
//       state.name = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // Handle the async thunk for loading the initial profile
//     builder
//       .addCase(loadInitialProfile.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(loadInitialProfile.fulfilled, (state, action) => {
//         state.userId = action.payload.userId;
//         state.email = action.payload.email;
//         state.name = action.payload.name;
//         state.loading = false;
//       })
//       .addCase(loadInitialProfile.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// export const { setProfileRedux, clearProfileRedux } = profileSlice.actions;
// export default profileSlice.reducer;
// code khác
