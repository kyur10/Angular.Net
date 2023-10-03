import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { addPost } from '../state/posts.action';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;
  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
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

  onAddPost() {
    // console.log(this.postForm.value);
    const post: Post = {
      title: this.postForm.value.title,
      body: this.postForm.value.description,
    };
    this._store.dispatch(setLoadingSpinner({ status: true }));
    this._store.dispatch(addPost({ post }));
  }

  showDescriptionErrors() {
    let tem: any;
    const desciptionForm = this.postForm.get('description');
    if (desciptionForm?.touched && !desciptionForm.valid) {
      tem = desciptionForm.errors;
      console.log(tem);
      // if (tem.required) {
      //   console.log('entered');
      //   return 'Desc required';
      // }
      // if (tem.minLength) {
      //   return 'min length required';
      // }
    }
    return;
  }
}
