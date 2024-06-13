import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './User-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly http:HttpClient = inject(HttpClient)


  url = 'http://localhost:3000/users'

  constructor() { }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
  }

  createUser(dataToSend: User): Observable<User> {
    console.log(dataToSend);
    
    return this.http.post<User>(this.url, dataToSend)
  }


}
