import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/api";

export const fetchHotStory = createAsyncThunk(
  "hotStory/fetchHotStory",
  async ({ type, cat }) => {
    const res = await axios.get("/top-story", {
      params: { type, cat },
    });
    return {
      type: type || "day",
      data: res.data,
    };
  }
);
// export const fetchHotCategory= createAsyncThunk('hotStory/fetchHotCategory', async ({ index, type})=>{
//     const res= await axios.get('/genre/top-trend',{
//         params: {
//             type,
//             index,
//         }
//     })
//     return res.data
// })

const hotStorySlice = createSlice({
  name: "hotStory",
  initialState: {
    type: null,
    data: [],
    loading: false,
    err: null,
  },
  extraReducers: {
    [fetchHotStory.pending]: (state) => {
      state.loading = true;
      state.err = null;
    },
    [fetchHotStory.fulfilled]: (state, action) => {
      const { type, data } = action.payload;
      return { type, data, loading: false, err: null };
    },
    [fetchHotStory.rejected]: (state, action) => {
      state.loading = false;
      state.err = action;
    },
    // [fetchHotCategory.fulfilled]: (state, action)=>action.payload,
  },
});

export default hotStorySlice.reducer;
