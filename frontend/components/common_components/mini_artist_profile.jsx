import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchSongs } from "../../actions/song_actions";
import { fetchFollows, createFollow, removeFollow } from "../../actions/follow_actions";
import { fetchUsers } from "../../actions/user_actions";
import { isEmpty } from "../../util/general_api_util";
import { songsOf } from "../../util/song_api_util";
import { followOf, followersOf } from "../../util/follow_api_util";

const msp = (state, ownProps) => {
    const songs = state.entities.songs;
    const follows = state.entities.follows;
    const users = state.entities.users;
    const song = songs ? songs[parseInt(ownProps.match.params.songId)] : null;
    const currentUserId = state.session.id;
    return ({
        songs: songs,
        follows: follows,
        users: users,
        song: song,
        songArtist: (users && song) ? users[song.artistId] : null,
        currentFollow: followOf(song.artistId, currentUserId, follows),
        currentUserId: currentUserId,
    });
}

const mdp = (dispatch) => {
    return({
        fetchSongs: () => dispatch(fetchSongs()),
        fetchFollows: () => dispatch(fetchFollows()),
        createFollow: (follow) => dispatch(createFollow(follow)),
        removeFollow: (id) => dispatch(removeFollow(id)),
        fetchUsers: () => dispatch(fetchUsers()),
    })
}

class MiniArtistProfile extends React.Component {
    constructor(props) {
        super(props);
        this.noneStyle = {
            display: "none",
        };
    }

    handleFollow(e) {
        e.preventDefault();
        if (this.props.currentFollow) {
          this.props.removeFollow(this.props.currentFollow.id);
        } else {
          const follow = {
            followed_user_id: this.props.songArtist.id,
            follower_id: this.props.currentUserId,
          }
          this.props.createFollow(follow);
        }
      }

    render() {
        // if (!this.props.songs || !this.props.follows || !this.props.users) return <img src={window.loading5} className="loading"></img>;
        return (
            <div className="artist-info-container">
                <img src={this.props.songArtist.imageURL ? this.props.songArtist.imageURL : window.user_dp} className="artist-img"></img>
                <Link to={`/users/${this.props.song.artistId}`}>{this.props.song.artist}</Link>
                <div className="follows-songs">
                    <Link to=""><i className="fas fa-user-friends"></i> {(!this.props.follows || !this.props.users) ? 0 : followersOf(this.props.songArtist.id, this.props.follows, this.props.users).length}</Link>
                    <Link to=""><i className="fas fa-music"></i> {(!this.props.songs || !this.props.users) ? 0 : songsOf(this.props.songArtist, this.props.songs).length}</Link>
                </div>
                <button className={this.props.currentFollow ? "following" : "follow"}
                        onClick={(e) => this.handleFollow(e)}
                        style={this.props.song.artistId === this.props.currentUserId ? this.noneStyle : {}}>
                {this.props.currentFollow ? "Following" : "Follow"}
                </button>
            </div>
        );
    }
}

export default withRouter(connect(msp, mdp)(MiniArtistProfile));