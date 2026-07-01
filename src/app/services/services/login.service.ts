import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private api = environment.loginUrl;

  constructor(private http: HttpClient) {}

  login(data: LoginRequest) {
    return this.http.post(this.api, data);
  }
}
