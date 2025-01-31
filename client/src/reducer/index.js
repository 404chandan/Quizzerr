import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice";
import quizReducer from "../slices/QuizSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  quiz: quizReducer,
});

export default rootReducer;
