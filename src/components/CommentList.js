import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment';

//  CommentList 组件
class CommentList extends Component {
	// 设置默认props， 谨防父组件，没有传入相应的值
	static defaultProps = {
		comments: []
	};
	// 限制父组件传入的props的类型
	static propTypes = {
		comments: PropTypes.array,
		onDeleteComment: PropTypes.func
	};

	// 传入子组件里的删除 方法
	deleteComment (index) {
		if (this.props.onDeleteComment) {
			this.props.onDeleteComment(index);
		}
	}
	render () {
		/*const comments = [
				{username: 'Jerry', content: 'Hello'},
					{username: 'Tomy', content: 'World'},
					{username: 'Lucy', content: 'Good'}
		]*/
		return (
			<div className="comment-list">
				{this.props.comments.map( (comment, i) => {
					return (
							<Comment
								comment={comment}
								key={i}
								index={i}
								onDeleteComment={this.deleteComment.bind(this)} />
					)
				})}
			</div>
		)
	}
}
export default CommentList;