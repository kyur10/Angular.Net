import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { AddPostComponent } from './add-post/add-post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { postsReducer } from './state/posts.reducer';
import { PostEffect } from './state/posts.effect';
import { POST_STATE_NAME } from './state/posts.selector';
import { postsEntityReducer } from './state/entity/posts-entity.reducer';
import { PostEntityEffect } from './state/entity/posts-entity.effect';
import { POST_ENTITY_STATE_NAME } from './state/entity/posts-entity.selectors';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    children: [
      { path: 'add', component: AddPostComponent },
      { path: 'edit/:id', component: EditPostComponent },
    ],
  },
];

@NgModule({
  declarations: [AddPostComponent, PostsListComponent, EditPostComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    /** ngrx/entity: */
    // EffectsModule.forFeature([PostEntityEffect]),
    // StoreModule.forFeature(POST_ENTITY_STATE_NAME, postsEntityReducer),
    /** w/o ngrx/entity: */
    EffectsModule.forFeature([PostEffect]),
    StoreModule.forFeature(POST_STATE_NAME, postsReducer),
  ],
})
export class PostsModule {}
