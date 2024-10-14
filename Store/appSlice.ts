import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "categories",
  initialState: [] as string[],
  reducers: {
    initialCategories: (state, action: PayloadAction<string | string[]>) => {
      if (Array.isArray(action.payload)) {
        console.log("INIT FROM ARRAY REDUX: ", state);
        state.push(...action.payload);
      }
    },
    addCategory: (state, action: PayloadAction<string>) => {
      console.log("INIT FROM STRING REDUX: ", state);
      state.push(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      console.log("INIT FROM DELETE REDUX: ", state);
      const index = state.findIndex((cat) => cat === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { deleteCategory, initialCategories, addCategory } =
  appSlice.actions;
export default appSlice.reducer;
