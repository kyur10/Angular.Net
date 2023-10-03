import { createReducer, on } from '@ngrx/store';
import {
  addPostSuccess,
  deletePostSuccess,
  loadPostSuccess,
  updateEPostSuccess,
} from '../posts.action';
import { initialEntityState, postsAdapter } from './posts-entity.state';

/* Using ngrx/entity: */
///*
export function postsEntityReducer(state: any, action: any) {
  return _postsEntityReducer(state, action);
}
const _postsEntityReducer = createReducer(
  initialEntityState,
  on(addPostSuccess, (state, action) => {
    return postsAdapter.addOne(action.post, state);
  }),
  on(loadPostSuccess, (state, action) => {
    return postsAdapter.setAll(action.posts, state);
  }),
  on(deletePostSuccess, (state, action) => {
    return postsAdapter.removeOne(action.id, state);
  }),
  on(updateEPostSuccess, (state, action) => {
    return postsAdapter.updateOne(action.post, state);
  })
);
//*/
