import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CommentInput from '../components/CommentInput';
import { addComment } from '../reducers/comment';

class CommentInputContainer extends Component {
    static propTypes = {
        comments: PropTypes.array,
        onSubmit: PropTypes.func
    };

    constructor () {
        super();
        this.state = {
            username: ''
        };
    }

    componentWillMount () {
        this.__loadUsername();
    }

    __loadUsername () {
        const username = localStorage.getItem('username');
        if (username) {
            this.setState({
                username
            });
        }
    }

    __saveUsername (username) {
        localStorage.setItem('username', username);
    }

    handleSubmitComment (comment) {
        if (!comment) {
            return;
        }
        if (!comment.username) {
            return alert('pls input username');
        }
        if (!comment.content) {
            return alert('Pls input what you want to say');
        }
        const { comments } = this.props;
        const newComments = [...comments, comment];
        localStorage.setItem('comments', JSON.stringify(newComments));
        if (this.props.onSubmit) {
            this.props.onSubmit(comment);
        }
    }

    render () {
        return (
            <CommentInput
                username={this.state.username}
                onUserNameInputBlur={this.__saveUsername.bind(this)}
                onSubmit={this.handleSubmitComment.bind(this)} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (comment) => {
            dispatch(addComment(comment))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInputContainer);