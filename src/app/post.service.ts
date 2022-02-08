import { Injectable } from '@angular/core';
import { Post } from './types';
import { POSTS } from './posts';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // // URL absolue
  // serverUrl = 'https://my-json-server.typicode.com';
  // // chemin relatif sur le serveur
  // postsPath = '/bhubr/album-api/posts';

  serverUrl = 'https://album-api.benoithubert.me';
  postsPath = '/api/v2/posts'

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

/**
 * Error handler
 * @param error
 * @returns 
 */
    private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 0) {
      errorMessage = 'Network error! Please check your connection or come back later!'
    } else if (error.status === 401) {
      errorMessage = 'You have been disconnected. Please login again';
      // erreurs dues à des données incorrectes envoyées (par le serveur renvoie une 400 bad request)
    } else {
      errorMessage = 'There are missing or misformated fields';
    }
    return throwError(errorMessage);
  }

  private getHeaders(){
    return this.authenticationService.token
      ? new HttpHeaders({ Authorization: `Bearer ${this.authenticationService.token}`})
      : new HttpHeaders({})
  }

  getAllPosts(): Promise<Post[]> {
    return this.http
      .get<Post[]>(
        `${this.serverUrl}${this.postsPath}`
      )
      .toPromise();
  }
  
  // getAllPosts(): Observable<Post[]> {
  //   return this.http
  //     .get<Post[]>(
  //       `${this.serverUrl}${this.postsPath}`
  //     )
  //     .pipe(
  //       catchError(this.handleError)
  //     )
  // }

  getPost(id: number): Promise<Post | undefined> {
    return this.http
      .get<Post>(
        `${this.serverUrl}${this.postsPath}/` + id
      )
      .toPromise();
  }

  // postPost(title: string, description: string, picture: string): Promise<Post> {
  //   return this.http
  //       .post<Post>(
  //           `${this.serverUrl}${this.postsPath}`,
  //           {title, description, picture}
  //       )
  //       .toPromise();
  // }

  // createPost(postData: Partial<Post>): Promise<Post> {
  //   return this.http
  //     .post<Post>(
  //       `${this.serverUrl}${this.postsPath}`,
  //       postData,
  //       {headers: this.getHeaders()}
  //     )
  //     .toPromise();
  // }
  createPost(postData: Partial<Post>): Observable<Post> {
    return this.http
      .post<Post>(
        `${this.serverUrl}${this.postsPath}`,
        postData,
        {headers: this.getHeaders()}
      )
      .pipe(
        catchError(this.handleError)
      )
  }

  deletePost(postId: number): Promise<{}> {
    return this.http
      .delete<{}>(
        `${this.serverUrl}${this.postsPath}/${postId}`,
      )
      .toPromise();
  }
}
