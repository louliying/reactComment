// reducer 用来描述数据的形态和相应的变更
// action.type们
const INIT_COMMENTS = 'INIT_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

// reducer
export default function (state, action) {
    if (!state) {
        state = {
            comments: []
        };
    }
    switch (action.type) {
        case INIT_COMMENTS:
            return {
                comments: action.comments
            };
        case ADD_COMMENT:
            return {
                comments: [...state.comments, action.comment]
            };
        case DELETE_COMMENT:
            // 删除评论
            // 新建  一个删除了特定下标内容  的新数组

            // slice() 方法可从已有的数组中返回选定的元素。
            // 第一行是 取从0到 commentIndex 的数组元素
            // 第二行， 取从 commentIndex +1 到结束的元素
            // 然后二者合并成一个数组
            return {
                comments: [
                    ...state.comments.slice(0, action.commentIndex),
                    ...state.comments.slice(action.commentIndex + 1)
                ]
            }
        default:
            return state;
    }
}

// action creators
// 把action封装到一种函数里， 让它们帮我们去构建action
export const initComments = (comments) => {
    return {
        type: INIT_COMMENTS, comments
    }
}
export const addComment = (comment) => {
    return {
        type: ADD_COMMENT, comment
    }
}
export const deleteComment = (commentIndex) => {
    return {
        type: DELETE_COMMENT, commentIndex
    }
}