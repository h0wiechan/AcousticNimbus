import { RECEIVE_USERS } from "../actions/user_actions";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { merge } from "lodash";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USERS:
      return merge({}, state, action.users);
    case RECEIVE_CURRENT_USER:
      return merge({}, state, {[action.currentUser.id]: action.currentUser});
    default:
      return state;
  }
};

export default usersReducer;
