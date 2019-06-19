import { GET_STUDENT, GET_CURRENT_STUDENT } from "../actions/types";

const initialState = {
  studentInfo: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENT:
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
