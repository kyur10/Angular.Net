import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  getRouterState,
  getCurrentRoute,
} from 'src/app/store/router/router.selector';
import { PostState } from './posts.state';

export const POST_STATE_NAME = 'posts';

/** w/o ngrx/entity: */
///*
const getPostsState = createFeatureSelector<PostState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostsState, (state) => {
  return state.posts;
});

// Using ngrx/route-store:
export const getPostById = createSelector(
  getPostsState,
  getCurrentRoute,
  (state, route) => {
    // debugger;
    let posts = state.posts;
    if (posts) {
      let routeId = route.params['id'];
      let post = posts.find((p) => p.id.toString() === routeId);
      return post;
    }
    return null;
    // return state.posts
    //   ? state.posts.find((p) => p.id.toString() === route.state.params['id'])
    //   : null;
  }
);

// w/o ngrx/route-store:
// export const getPostById = (id: string) =>
//   createSelector(getPostsState, (state) =>
//     state.posts.find((post) => post.id === id)
//   );
//*/
