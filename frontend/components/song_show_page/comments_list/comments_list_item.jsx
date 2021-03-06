import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { removeComment } from "../../../actions/comment_actions";

const msp = (state, ownProps) => {
    const currentUserId = state.session.id;
    return ({
        song: state.entities.songs[ownProps.match.params.songId],
        currentUserId: currentUserId,
        currentUser: state.entities.users[currentUserId],
    });
}

const mdp = (dispatch) => {
    return ({
        removeComment: (id, songId) => dispatch(removeComment(id, songId))
    });
}

class CommentsListItem extends React.Component {
    constructor(props) {
        super(props);
        this.noneStyle = {
            display: "none"
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.renderCreationTime = this.renderCommentCreationTime.bind(this);
        this.renderDeleteButton = this.renderDeleteButton.bind(this);
    }

    handleRemove(id) {
        this.props.removeComment(id, this.props.songId);
    }

    renderCommentCreationTime(date) {
        const commentLife = Math.abs(new Date() - new Date(date)) / 1000;
        if (commentLife < 60) {
            const unit = Math.floor(commentLife) > 1 ? "seconds" : "second";
            return `${Math.floor(commentLife)} ${unit} ago`;
        } else if (commentLife < 3600) {
            const unit = Math.floor(commentLife / 60) > 1 ? "minutes" : "minute";
            return `${Math.floor(commentLife / 60)} ${unit} ago`;
        } else if (commentLife < 86400) {
            const unit = Math.floor(commentLife / 3600) > 1 ? "hours" : "hour";
            return `${Math.floor(commentLife / 3600)} ${unit} ago`;
        } else if (commentLife < 2592000) {
            const unit = Math.floor(commentLife / 86400) > 1 ? "days" : "day";
            return `${Math.floor(commentLife / 86400)} ${unit} ago`;
        } else if (commentLife < 31104000) {
            const unit = Math.floor(commentLife / 2592000) > 1 ? "months" : "month";
            return `${Math.floor(commentLife / 2592000)} ${unit} ago`;
        } else {
            const unit = Math.floor(commentLife / 31104000) > 1 ? "years" : "year";
            return `${Math.floor(commentLife / 31104000)} ${unit} ago`;
        }
    }

    renderDeleteButton() {
        if (this.props.commenter.id === this.props.currentUserId || this.props.songArtist.id === this.props.currentUserId) {
            return <button onClick={() => this.handleRemove(this.props.comment.id)}><i className="fas fa-trash"></i></button>
        }
    }

    render() {
        return (
            <li>
                <div className="comment-container">
                    <img src={this.props.commenter.imageURL ? this.props.commenter.imageURL : window.user_dp}></img>
                    <div>
                        <h1><Link to={`/users/${this.props.commenter.id}`} className="username">{this.props.commenter.id === this.props.currentUserId ? "You" : this.props.commenter.username}</Link> at <span className="time">0:00</span>:</h1>
                        <p>{this.props.comment.body}</p>
                    </div>
                </div>
                <div className="date-delete">
                    <p>{this.renderCommentCreationTime(this.props.comment.createdAt)}</p>
                    {this.renderDeleteButton()}
                </div>
            </li>
        );
    }
}

export default withRouter(connect(msp, mdp)(CommentsListItem));