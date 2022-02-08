import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User, TokenUserPayload } from './types';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<User | null>;
  //public currentUser: Observable<User | null>;

  public token: string = localStorage.getItem('token') || '';

  serverUrl = 'https://album-api.benoithubert.me';
  registerPath = '/api/v2/auth/register'
  loginPath = '/api/v2/auth/login'

  constructor(private http: HttpClient) {
    const storedUserJSON = localStorage.getItem('currentUser');
    const storedUser = storedUserJSON ? JSON.parse(storedUserJSON) : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    //this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Error handler
   * @param error
   * @returns 
   */
   private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 0) {
      errorMessage = 'Network error! Please check your connection or come back later!'
    } else {
      errorMessage = error.error.errors.map((err: { msg: string }) => err.msg).join('. ');
    }
    return throwError(errorMessage);
  }

  public register(login: string, pwd: string): Observable<{}>{
    return this.http.post<{}>(
    `${this.serverUrl}${this.registerPath}`,
    { login, pwd }
    )
    .pipe(
      catchError(this.handleError)
    );
  }

  public login(login: string, pwd: string): Observable<TokenUserPayload>{
    return this.http.post<TokenUserPayload>(
    `${this.serverUrl}${this.loginPath}`,
    { login, pwd })
    .pipe(
        catchError(this.handleError),
        map((payload: TokenUserPayload) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', JSON.stringify(payload.token));
        localStorage.setItem('currentUser', JSON.stringify(payload.user));

        // On dit au currentUserSubject d'émettre comme valeur l'objet représentant l'user (id et login)
        this.currentUserSubject.next(payload.user);
        this.token = payload.token;
        return payload; })
      );
  }

  logout(){
    this.currentUserSubject.next(null)
    this.token = '';
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }
}