import React from "react";
import WaveSurfer from "wavesurfer.js";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchSongs } from "../../../actions/song_actions";
import { setCurrentSong, playSong, pauseSong, setElapsedTo, muteSong, unmuteSong } from "../../../actions/current_song_actions";
import { latest, shuffle } from "../../../util/song_api_util";

const msp = (state) => {
    return {
        latestTwelve: latest(12, state.entities.songs),
        latestTwenty: latest(20, state.entities.songs),
        shuffled: shuffle(12, state.entities.songs),
        currentSong: state.ui.currentSong,
    }
}

const mdp = (dispatch) => {
    return ({
        fetchSongs: () => dispatch(fetchSongs()),
        setCurrentSong: (song) => dispatch(setCurrentSong(song)),
        playSong: (song) => dispatch(playSong(song)),
        pauseSong: (song) => dispatch(pauseSong(song)),
        setElapsedTo: (time) => dispatch(setElapsedTo(time)),
        muteSong: () => dispatch(muteSong()),
        unmuteSong: () => dispatch(unmuteSong()),
    });
}


// const mdp = (dispatch) => {
//   return {
//   };
// };


class Waveform extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   song: null,
    //   playing: null,
    //   pos: null,
    // };
  }

  componentDidMount() {
    const barCtx = document.getElementById("waveform-player").getContext("2d");
    const barBase = barCtx.createLinearGradient(0, 75, 0, 25);
    barBase.addColorStop(0, "#f7ba0f");
    barBase.addColorStop(1, "#f7530f");
    const waveformBar = WaveSurfer.create({
      container: "#waveform-player",
      wavecolor: barBase,
      progressColor: "white",
      barWidth: 2,
    });
    const buttons = {
      play: document.getElementById("play-button"),
      pause: document.getElementById("pause-button"),
      stop: document.getElementById("stop-button"),
    };

    buttons.play.addEventListener("click", () => {
      waveformBar.play();
      buttons.play.disabled = true;
      buttons.pause.disabled = false;
      buttons.stop.disabled = false;
    });

    buttons.pause.addEventListener("click", () => {
      waveformBar.pause();
      buttons.play.disabled = false;
      buttons.pause.disabled = true;
      buttons.stop.disabled = false;
    });

    buttons.stop.addEventListener("click", () => {
      waveformBar.stop();
      buttons.play.disabled = false;
      buttons.pause.disabled = true;
      buttons.stop.disabled = true;
    });

    waveformBar.on("ready", () => {
      buttons.play.disabled = false;
    });

    window.addEventListener("resize", () => {
      const currentProgress = waveformBar.getCurrentTime() / waveformBar.getDuration();
      waveformBar.empty();
      waveformBar.drawBuffer();
      waveformBar.seekTo(currentProgress);
      buttons.play.disabled = false;
      buttons.pause.disabled = true;
      buttons.stop.disabled = false;
    }, false);

    waveformBar.load(this.props.song.audioURL);
  }

  render() {
    return (
      <div className="waveform-player-container">
        <div id="waveform-player">
        </div>
        <input type="button" id="play-button" value="Play" disabled="disabled" />
        <input type="button" id="pause-button" value="Pause" disabled="disabled" />
        <input type="button" id="stop-button" value="Stop" disabled="disabled" />
      </div>
    );
  }

};

export default withRouter(connect(msp, mdp)(Waveform));

  // togglePlaying() {
  //   this.setState({
  //     playing: !this.state.playing,
  //   });
  // }
  //
  // jump() {
  //   return (e) => {
  //     this.setState({
  //       at: e.originalArgs[0], //??
  //     });
  //   };
  // }
