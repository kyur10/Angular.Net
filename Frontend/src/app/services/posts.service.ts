import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, of, tap } from 'rxjs';
import { Post } from '../models/posts.model';
import { AppState } from '../store/app.state';

@Injectable()
export class PostsService {
  jUrl: string = `https://jsonplaceholder.typicode.com/posts`;
  url: string = `https://localhost:7029/api/posts`;
  constructor(private _http: HttpClient) {}

  addPost(post: Post) {
    return this._http.post<Post>(`${this.url}/addpost`, post);
  }

  updatePost(post: Post) {
    return this._http.put<Post>(`${this.url}/updatepost`, post);
  }

  getPosts() {
    return this._http.get<Post[]>(`${this.url}/getposts`);
  }

  getPostById(id: number) {
    let params: HttpParams = this.getIdParams(id);
    return this._http.get<Post>(`${this.url}/getpostbyid`, { params });
  }

  deletePost(id: number) {
    let params: HttpParams = this.getIdParams(id);
    return this._http.delete(`${this.url}/deletepost`, { params });
  }

  /*  Json placeholder */
  getJPosts() {
    return this._http.get<Post[]>(`${this.jUrl}`);
  }

  private getIdParams(id: number) {
    let params = new HttpParams();
    params = params.append('id', id);
    return params;
  }

  /*  for key value pairs 
  getPosts() {
    return this._http.get<Post[]>(`${this.url}/getposts`);
    .pipe(
      map((v) => {
        return v;
        const posts: Post[] = [];
        for (let key in v) {
          posts.push({ ...v[key], id: key });
        }
      })
      );
    }
    //*/

  /* hard-coded data
  getPosts() {
    debugger;
    let posts: Post[];
    posts = [
      { id: '1', title: 'Title 1', body: 'Sample Description 1' },
      { id: '2', title: 'Title 2', body: 'Sample Description 2 ' },
    ];
    return posts;
  }
  //*/
}
