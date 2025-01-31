import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quiz: null,
  edit: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState: initialState,
  reducers: {
    setQuiz(state, value) {
      state.quiz = value.payload;
    },
    setEdit(state, value) {
      state.edit = value.payload;
    },
  },
});

export const { setQuiz, setEdit } = quizSlice.actions;

export default quizSlice.reducer;
