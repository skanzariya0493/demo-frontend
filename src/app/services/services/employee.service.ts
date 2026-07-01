import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  api =
    'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get(this.api);
  }
}
