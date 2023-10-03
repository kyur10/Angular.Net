import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { dummyAction } from 'src/app/auth/state/auth.actions';
import { Post } from 'src/app/models/posts.model';
import { PostsService } from 'src/app/services/posts.service';
import { AppState } from 'src/app/store/app.state';
import {
  setErrorMessage,
  setLoadingSpinner,
} from 'src/app/store/shared/shared.action';
import { getErrorMessage } from 'src/app/store/shared/shared.selector';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPost,
  loadPostSuccess,
  updatePost,
  updatePostSuccess,
} from './posts.action';
import { getPosts } from './posts.selector';

@Injectable()
export class PostEffect {
  constructor(
    private _store: Store<AppState>,
    private _actions$: Actions,
    private _postService: PostsService
  ) {}

  /** Using dummyAction for avoiding redundant http calls: */
  // /*
  loadDPosts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(loadPost),
      withLatestFrom(this._store.select(getPosts)),
      withLatestFrom(this._store.select(getErrorMessage)),
      exhaustMap(([[action, posts], error]) => {
        if (!posts?.length || posts.length === 0) {
          return this._postService.getPosts().pipe(
            map((posts: Post[]) => {
              this.setLoading(error);
              return loadPostSuccess({ posts });
            }),
            catchError((err) => {
              return this.setError(err);
            })
          );
        }
        this.setLoading(error);
        return of(dummyAction());
      })
    );
  });
  //*/

  addPosts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(addPost),
      withLatestFrom(this._store.select(getErrorMessage)),
      exhaustMap(([action, error]) => {
        return this._postService.addPost(action.post).pipe(
          map((v) => {
            this.setLoading(error);
            const post: Post = { ...action.post };
            post.id = v.id ? v.id : 0;
            return addPostSuccess({ post });
          }),
          catchError((err) => {
            return this.setError(err);
          })
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(deletePost),
      withLatestFrom(this._store.select(getErrorMessage)),
      switchMap(([action, error]) => {
        return this._postService.deletePost(action.id).pipe(
          map((data) => {
            this.setLoading(error);
            return deletePostSuccess({ id: action.id });
          }),
          catchError((err) => {
            return this.setError(err);
          })
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(updatePost),
      withLatestFrom(this._store.select(getErrorMessage)),
      switchMap(([action, error]) => {
        return this._postService.updatePost(action.post).pipe(
          map((post) => {
            this.setLoading(error);
            return updatePostSuccess({ post });
          }),
          catchError((err) => {
            return this.setError(err);
          })
        );
      })
    );
  });

  /** Reference for singlePostEffect */
  /* 
  getSinglePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/posts/details');
      }),
      map((r: RouterNavigatedAction) => {
        return r.payload.routerState['params']['id'];
      }),
      withLatestFrom(this.store.select(getPosts)),
      switchMap(([id, posts]) => {
        if (!posts.length) {
          return this.postsService.getPostById(id).pipe(
            map((post) => {
              const postData = [{ ...post, id }];
              return loadPostsSuccess({ posts: postData });
            })
          );
        }
        return of(dummyAction());
      })
    );
  });
  // */

  /** On success */
  // /*
  success$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(
          ...[
            addPostSuccess,
            loadPostSuccess,
            updatePostSuccess,
            deletePostSuccess,
          ]
        ),
        withLatestFrom(this._store.select(getErrorMessage)),
        tap(([action, error]) => {
          // debugger;
          if (error) this._store.dispatch(setErrorMessage({ message: '' }));
          // if (action.redirect) this._router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );
  //*/

  /** For: Loading and Error */
  private setLoading(error) {
    this._store.dispatch(setLoadingSpinner({ status: false }));
    if (error) this._store.dispatch(setErrorMessage({ message: null }));
  }
  private setError(err) {
    this._store.dispatch(setLoadingSpinner({ status: false }));
    console.log(err, '<- posts generic err');
    return of(setErrorMessage({ message: err.message }));
  }
  //*/
}
