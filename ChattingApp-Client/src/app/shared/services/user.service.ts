import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { User } from 'shared/Models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'user');
  }
  getUser(id): Observable<User> {
    return this.http.get<User>(this.url + 'user/' + id);
  }
  updateUser(id: number, user: User) {
    return this.http.put(this.url + 'user/' + id, user);
  }
}
