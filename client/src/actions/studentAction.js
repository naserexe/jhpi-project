import axios from "axios";

import {
  GET_STUDENT,
  GET_CURRENT_STUDENT,
  GET_ERRORS,
  STUDENT_LOADING,
  SEARCH_STUDENT,
  CLEAR_ERRORS
} from "./types";

export const addStudent = (newStudent, history) => dispatch => {
  axios
    .post("/student", newStudent)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getStudent = () => dispatch => {
  dispatch(setStudentLoading());
  axios.get(`/student`).then(res =>
    dispatch({
      type: GET_STUDENT,
      payload: res.data
    })
  );
};

// GEt Current Student
export const getCurrentStudent = id => dispatch => {
  axios.get(`/student/${id}`).then(res =>
    dispatch({
      type: GET_CURRENT_STUDENT,
      payload: res.data
    })
  );
};

// Update Student
export const updateStudent = (id, newInfo, history) => dispatch => {
  axios
    .post(`/student/edit/${id}`, newInfo)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete Student
export const deleteStudent = id => dispatch => {
  axios.delete(`/student/delete/${id}`).then(res =>
    dispatch({
      type: GET_STUDENT,
      payload: res.data
    })
  );
};

// Student loading
export const setStudentLoading = () => {
  return {
    type: STUDENT_LOADING
  };
};

// Search student
export const searchStudent = searchQuery => dispatch => {
  axios
    .post("/student/search", searchQuery)
    .then(
      res =>
        dispatch({
          type: SEARCH_STUDENT,
          payload: res.data
        }),
      dispatch({
        type: CLEAR_ERRORS
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
