import React, { Component } from 'react';
import PropTypes from 'prop-types';

//  CommentInput 组件
class CommentInput extends Component {
    static propTypes = {
        username: PropTypes.any,
        onSubmit: PropTypes.func,
        onUserNameInputBlur: PropTypes.func
    }

    static defaultProps = {
        username: ''
    }


    constructor (props) {
        super(props);
        this.state = {
            username:  props.username,
            content: ''
        };
    }

    // render后调用 此生命周期
    componentDidMount () {
        this.textarea.focus();
    }

    // 用户名失焦事件
    blurUserName (e) {
        if (this.props.onUserNameInputBlur) {
            this.props.onUserNameInputBlur(e.target.value);
        }
    }

    // 用户名change事件
    changeUserName (e) {
        this.setState({
            username: e.target.value
        });
    }

    // 评论内容 change事件
    changeContent (e) {
        this.setState({
            content: e.target.value
        });
    }
    // 发布评论 事件
    sumitComment () {
        // 通过调用 父组件里传入的 fn， 把state值 传出去
        if (this.props.onSubmit) {
            const oComment = this.state;
            oComment.createdTime = +new Date();
            this.props.onSubmit(oComment);
        }
        // 提交完成后， 把textarea 置空
        this.setState({
            content: ''
        });
    }
    render () {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input value={this.state.username}
                        		onChange={this.changeUserName.bind(this)}
                        		onBlur={this.blurUserName.bind(this)} />
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea value={this.state.content}
                        			onChange={this.changeContent.bind(this)}
                        			ref={ (textarea) => this.textarea = textarea} />
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.sumitComment.bind(this)}>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}
export default CommentInput;