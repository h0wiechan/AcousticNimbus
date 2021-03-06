import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchFilteredSongs, emptyFilteredSongs } from "../../../../actions/song_actions";
import SongsRankingItem from "./songs_ranking_item";

const msp = (state) => {
  const filters = state.ui.charts;
  return {
    songs: state.entities.songs,
    currentUser: state.entities.users[state.session.id],
    order: filters.order,
    genre: filters.genre,
  };
};

const mdp = (dispatch) => {
  return ({
    fetchFilteredSongs: (data) => dispatch(fetchFilteredSongs(data)),
    emptyFilteredSongs: (defaultState) => dispatch(emptyFilteredSongs(defaultState)),
  });
};

class SongsRanking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      rankedSongs: null,
      offset: 0,
      limit: 30,
      data: {
        number: 10,
        order: this.props.order,
        genre: this.props.genre,
      },
      defaultState: {
        rankedSongs: null,
      },
    }
  }

  componentDidMount() {
    this.props.fetchFilteredSongs(this.state.data);
    this.setState({
      loading: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (((!this.props.songs || !this.props.songs.rankedSongs) && nextProps.songs && nextProps.songs.rankedSongs) || (this.props.songs && this.props.songs.rankedSongs && nextProps.songs && nextProps.songs.rankedSongs && Object.keys(this.props.songs.rankedSongs).length !== Object.keys(nextProps.songs.rankedSongs).length)) {
      this.setState({
        rankedSongs: Object.values(nextProps.songs.rankedSongs).reverse(),
        loading: false,
      });
    } else if (this.props.genre !== nextProps.genre) {
      this.setState({
        rankedSongs: null,
        loading: true,
      });
      this.setState({
        data: {
          number: 10,
          order: nextProps.order,
          genre: nextProps.genre,
        }
      });
      this.props.fetchFilteredSongs(this.state.data);
    }
  }

  componentWillUnmount() {
    this.props.emptyFilteredSongs(this.state.defaultState);
  }

  render() {
    if (this.state.loading || !this.state.rankedSongs) {
      return <img src={window.loadingPizza} className="loading"></img>
    } else {
      if (this.state.rankedSongs.length === 0) {
        return <p className="ui-msg">There are currently no songs on Acoustic Nimbus :(</p>;
      } else {
        return (
          <ul className="songs-ranking">
            {this.state.rankedSongs.map((song, idx) => {
              return (
              <SongsRankingItem
                key={song.id}
                idx={idx}
                song={song}
                songs={this.state.rankedSongs}
              />
              );
            })}
          </ul>
        );
      }
    }
  }
}

export default withRouter(connect(msp, mdp)(SongsRanking));
