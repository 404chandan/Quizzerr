const BASE_URL = import.meta.env.VITE_BASE_URL;

export const authEndpoints = {
  SIGNUP: `${BASE_URL}/register`,
  LOGIN: `${BASE_URL}/login`,
};

export const quizEndpoints = {
  CREATE_QUIZ: `${BASE_URL}/quizzes`,
  UPDATE_QUIZ: `${BASE_URL}/quizzes`,
  DELETE_QUIZ: `${BASE_URL}/quizzes`,
  GET_ADMIN_QUIZES: `${BASE_URL}/admin-quizzes`,
  GET_SCORES: `${BASE_URL}/attempts`,
  GET_ALL_QUIZES: `${BASE_URL}/quizzes`,
  GET_QUIZ_DETAILS: `${BASE_URL}/quizzes`,
  ATTEMMP_QUIZ: `${BASE_URL}/quizzes`,
  GET_USER_ATTEMPS: `${BASE_URL}/attempts`,
};

export const questionEndpoints = {
  CREATE_QUESTION: `${BASE_URL}/questions`,
  UPDATE_QUESTION: `${BASE_URL}/questions`,
  DELETE_QUESTION: `${BASE_URL}/questions`,
  GET_QUIZ_QUESTIONS: `${BASE_URL}/questions`,
};
