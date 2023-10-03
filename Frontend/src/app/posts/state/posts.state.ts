import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Post } from 'src/app/models/posts.model';

// /* Without using ngrx/entity
export interface PostState {
  posts: Post[];
}

export const initialState: PostState = {
  posts: null,
  // posts: [
  //   { id: '1', title: 'Title 1', body: 'Sample Description 1' },
  //   { id: '2', title: 'Title 2', body: 'Sample Description 2 ' },
  // ],
};
//*/
