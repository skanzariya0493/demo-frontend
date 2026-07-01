import { Component } from '@angular/core';
import { EmployeeService } from '../../services/services/employee.service';

@Component({
  selector: 'app-employees',
  imports: [],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {

  constructor(private employeeService: EmployeeService) {}
  ngOnInit() {

  this.employeeService
    .getEmployees()
    .subscribe((res:any)=>{

      console.log(res);

    });

}
}
