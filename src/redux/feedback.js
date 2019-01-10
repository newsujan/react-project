import * as ActionTypes from './ActionTypes';


export const Feedbacks = (state = {
    errMess: null,
    feedback: []
  }, action) => {
  switch(action.type) {
    case ActionTypes.ADD_FEEDBACK:
      return {...state, isLoading: false, errMess: null, feedback: action.payload};

    case ActionTypes.FEEDBACK_FAILED:
        return {...state, isLoading: false, errMess: action.payload, feedback: []};

    case ActionTypes.ADD_FEEDBACK:
        var feedback = action.payload;
        return {...state, messages: state.feedback.concat(feedback)};
    default:
        return state;
  }
}
