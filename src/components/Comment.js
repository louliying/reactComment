import React, { Component } from 'react';
import PropTypes from 'prop-types';

//  Comment 组件
class Comment extends Component {
    static propTypes = {
        // 父组件传入的comment， 1. 必须是object, 2. 是必须的
        comment: PropTypes.object.isRequired,
        onDeleteComment: PropTypes.func,
        index: PropTypes.number
    }
    constructor () {
        super();
        this.state = {
            timeString: ''
        };
    }

    componentWillMount () {
        this.__updateTimeString();
        this.__timer = setInterval(
            this.__updateTimeString.bind(this),
            5000
        );
    }

    componentWillUnmount () {
        clearInterval(this.__timer);
    }
    __updateTimeString () {
        const comment = this.props.comment;
        const duration = (+Date.now() - comment.createdTime) / 1000;
        this.setState({
            timeString: duration > 60 ? `${Math.round(duration / 60)} 分钟前` : `${Math.round(Math.max(duration, 1))} 秒前`
        });
    }

    __getProcessedContent (content) {
        return content
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
          .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
    }

    deleteComment () {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(this.props.index);
        }
    }
    render () {
        const { comment } = this.props;
         // <p>{comment.content}</p>
        return (
            <div className='comment'>
                <div className='comment-user'>
                  <span>{comment.username} </span>：
                </div>
                <p dangerouslySetInnerHTML={{__html: this.__getProcessedContent(comment.content)}}></p>
                <span className='comment-createdtime'>{this.state.timeString}</span>
                <span className="comment-delete" onClick={this.deleteComment.bind(this)}>删除</span>
            </div>
        )
    }
}


/*class Comment extends Component {
    render () {
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span>{this.props.comment.username}：</span>
                </div>
                <p>{this.props.comment.content}</p>
            </div>
        )
    }
}*/
export default Comment;