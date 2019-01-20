import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { DepartmentsService } from 'src/app/shared/departments.service';
import { NotficationService } from 'src/app/shared/notfication.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor( private service:EmployeeService,private dep:DepartmentsService,private not:NotficationService) { }
 
  onclear(){
    this.service.form.reset();
    this.service.intialzeFormGroup();
  }
  ngOnInit() {
 this.service.getEmployees()
  }
  onsubmit(){
    if(this.service.form.valid){
this.service.insertEmployees(this.service.form.value)
this.service.form.reset();
this.service.intialzeFormGroup();
this.not.success('::submitted  successfully ')

    }
  }
  

}
