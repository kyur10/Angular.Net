import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { getEntityPostById } from '../state/entity/posts-entity.selectors';
import { updatePost } from '../state/posts.action';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _store: Store<AppState>
  ) {}
  post: Post;
  postForm: FormGroup;
  postSubscription: Subscription;

  ngOnInit(): void {
    this.createAltForm();
    /** using ngrx/entity: */
    /*
    this.postSubscription = this._store
      .select(getEntityPostById)
      .subscribe((v: Post) => {
        if (v) {
          this.post = v;
          this.postForm.patchValue({
            title: v.title,
            description: v.body,
          });
        }
      });
    //*/

    /** using ngrx/router-store: */
    // /*
    this.postSubscription = this._store
      .select(getPostById)
      .subscribe((v: Post) => {
        if (v) {
          this.post = v;
          this.postForm.patchValue({
            title: v.title,
            description: v.body,
          });
        }
      });
    //*/

    /** w/o ngrx/router-store: */
    /** Comment [this.createAltForm();] to use this: */
    /*
    this._route.paramMap.subscribe((v) => {
      const id = v.get('id');
      if (id != null) {
        this._store.select(getPostById(id)).subscribe((v) => {
          // console.log(v);
          if (v != null) this.post = v;
          this.createForm();
        });
      }
    });
    //*/
  }

  onSubmit() {
    const title = this.postForm.value.title;
    const description = this.postForm.value.description;
    const post: Post = {
      id: this.post.id,
      title,
      body: description,
    };
    this._store.dispatch(setLoadingSpinner({ status: true }));
    this._store.dispatch(updatePost({ post }));
    this._router.navigate(['/posts']);
  }

  createAltForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [
        Validators.required,
        Validators.minLength(2),
      ]),
      description: new FormControl(this.post.body, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  ngOnDestroy(): void {
    if (this.postSubscription) this.postSubscription.unsubscribe();
  }
}
