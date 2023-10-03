import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';

import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { getEntityPosts } from '../state/entity/posts-entity.selectors';
import { deletePost, loadPost } from '../state/posts.action';
import { getPosts } from '../state/posts.selector';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit, OnDestroy {
  posts: Observable<Post[]>;
  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    this._store.dispatch(setLoadingSpinner({ status: true }));
    this._store.dispatch(loadPost());
    /** w/o ngrx/entity: */
    this.posts = this._store.select(getPosts);
    /** using ngrx/entity: */
    // this.posts = this._store.select(getEntityPosts);
  }

  onDeletePost(id: number) {
    this._store.dispatch(setLoadingSpinner({ status: true }));
    this._store.dispatch(deletePost({ id }));
  }

  ngOnDestroy(): void {}
}
