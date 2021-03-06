import { CHANGE_ORDER, CHANGE_GENRE, RESET_ORDER_AND_GENRE } from "../actions/chart_actions";
import { merge } from "lodash";
const defaultState = {
    order: "newest",
    genre: "all"
};

const chartsReducer = (state = defaultState, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case "CHANGE_ORDER":
            newState = {
                order: action.order
            };
            return merge({}, state, newState);
        case "CHANGE_GENRE":
            newState = {
                genre: action.genre
            };
            return merge({}, state, newState);
        case "RESET_ORDER_AND_GENRE":
            return defaultState;
        default:
            return state;
    }
}

export default chartsReducer;