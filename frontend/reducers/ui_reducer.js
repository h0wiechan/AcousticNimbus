import { combineReducers } from "redux";
import ModalReducer from "./modal_reducer";
import currentSongReducer from "./current_song_reducer";

const uiReducer = combineReducers({
  modal: ModalReducer,
  currentSong: currentSongReducer,
});

export default uiReducer;
