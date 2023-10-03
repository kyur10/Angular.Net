import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  getRouterState,
  getCurrentRoute,
} from 'src/app/store/router/router.selector';
import { PostEntityState, postsAdapter } from './posts-entity.state';

export const POST_ENTITY_STATE_NAME = 'postsentity';

/** Using ngrx/entity: */
///*
const getEntityPostsState = createFeatureSelector<PostEntityState>(
  POST_ENTITY_STATE_NAME
);
const postsEntitySelectors = postsAdapter.getSelectors();
export const getEntityPosts = createSelector(
  getEntityPostsState,
  postsEntitySelectors.selectAll
);
export const getEntityPostsAgain = createSelector(
  getEntityPostsState,
  postsEntitySelectors.selectEntities
);
export const getEntityPostById = createSelector(
  getEntityPostsState,
  getCurrentRoute,
  (state, route) => {
    // debugger;
    let posts = state.entities;
    if (posts) {
      let routeId = route.params['id'];
      let post = posts[routeId];
      return post;
    }
    return null;
  }
);
/** w/o current route */
/*
export const getEntityPostById = createSelector(
  getEntityPostsState,
  getRouterState,
  (state, route) => {
    // debugger;
    let posts = state.entities;
    if (posts) {
      let routeId = route.state.params['id'];
      let post = posts[routeId];
      return post;
    }
    return null;
  }
);
//*/
//*/
