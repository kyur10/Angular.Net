import { createReducer, on } from '@ngrx/store';
import {
  addPostSuccess,
  deletePostSuccess,
  loadPostSuccess,
  updatePostSuccess,
} from './posts.action';
import { initialState } from './posts.state';

/** W/O ngrx/entity: */
// /*
export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}

const _postsReducer = createReducer(
  initialState,
  on(loadPostSuccess, (state, action) => {
    // debugger;
    return {
      // ...state,
      posts: action.posts,
    };
  }),
  on(updatePostSuccess, (state, action) => {
    const updatePosts = state.posts.map((post) => {
      return post.id === action.post.id ? action.post : post;
    });
    return {
      posts: updatePosts,
    };
  }),
  on(deletePostSuccess, (state, action) => {
    const updatePosts = state.posts.filter((post) => {
      return post.id !== action.id;
    });
    return {
      posts: updatePosts,
    };
  }),
  on(addPostSuccess, (state, action) => {
    let post = action.post;
    if (post.id === 0) post.id = state.posts.length + 1;
    // console.log({ ...state, posts: [...state.posts, post] }, 'using ...spread');
    return {
      posts: [...state.posts, action.post],
    };
  })
);

//*/
