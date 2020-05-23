import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { User } from 'shared/Models/user';
import { PaginatedResult } from 'shared/Models/Pagination';
import { map } from 'rxjs/operators';
import { Message } from 'shared/Models/message';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getUsers(
    page?,
    itemsPerPage?,
    userPrams?,
    likesPrams?
  ): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<
      User[]
    >();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userPrams != null) {
      params = params.append('minAge', userPrams.minAge);
      params = params.append('maxAge', userPrams.maxAge);
      params = params.append('gender', userPrams.gender);
      params = params.append('orderBy', userPrams.orderBy);
    }

    if (likesPrams === 'Likers') {
      params = params.append('likers', 'true');
    }

    if (likesPrams === 'Likees') {
      params = params.append('likees', 'true');
    }
    return this.http
      .get<User[]>(this.url + 'user', { observe: 'response', params })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }
  getUser(id): Observable<User> {
    return this.http.get<User>(this.url + 'user/' + id);
  }
  updateUser(id: number, user: User) {
    return this.http.put(this.url + 'user/' + id, user);
  }
  setMainPhoto(userId: number, id: number) {
    return this.http.post(
      this.url + 'user/' + userId + '/photos/' + id + '/setMain',
      {}
    );
  }
  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.url + 'user/' + userId + '/photos/' + id);
  }
  sendLike(id: number, recipientId: number) {
    return this.http.post(this.url + 'user/' + id + '/like/' + recipientId, {});
  }

  getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<
      Message[]
    >();
    let params = new HttpParams();
    params = params.append('MessageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<Message[]>(this.url + 'user/' + id + '/messages', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  getMessageThread(id: number, recipientId: number) {
    return this.http.get<Message[]>(
      this.url + 'user/' + id + '/messages/thread/' + recipientId
    );
  }
  sendMessages(id: number, messages: Message) {
    return this.http.post(this.url + 'user/' + id + '/messages', messages);
  }
}
