import {
  GET_STUDENT,
  GET_CURRENT_STUDENT,
  STUDENT_LOADING,
  SEARCH_STUDENT
} from "../actions/types";

const initialState = {
  studentInfo: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STUDENT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_STUDENT:
      return {
        ...state,
        studentInfo: action.payload
      };
    case SEARCH_STUDENT:
      return {
        ...state,
        studentInfo: action.payload
      };
    case GET_CURRENT_STUDENT:
      return {
        ...state,
        studentInfo: action.payload
      };
    default:
      return state;
  }
}
