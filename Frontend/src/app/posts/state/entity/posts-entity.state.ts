import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Post } from 'src/app/models/posts.model';

// /* Using ngrx/entity creating initialState
export interface PostEntityState extends EntityState<Post> {}
export const postsAdapter = createEntityAdapter<Post>();
export const initialEntityState: PostEntityState =
  postsAdapter.getInitialState();
//*/

/* custom optional properties:
export interface PostEntityState extends EntityState<Post> {
  count: number;
}
export const postsAdapter = createEntityAdapter<Post>({
  sortComparer: sortByName,
});
export const initialEntityState: PostEntityState = postsAdapter.getInitialState(
  { count: 0 }
);
export function sortByName(a: Post, b: Post) {
  const compare = a.title.localeCompare(b.title);
  if (compare == 0) return 0;
  return compare > 0 ? -1 : 1; // descending
}
//*/
