import { Injectable } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  data:Subject<string> = new Subject<string>();

  constructor( private firebase:AngularFireDatabase, private hc:HttpClient) { }
 employeeList :AngularFireList<any>
  form:FormGroup = new FormGroup({
    $key : new FormControl(null),
    fullName: new FormControl('',Validators.required),
    email : new FormControl('',Validators.required),
    mobile : new FormControl('',[Validators.required,Validators.minLength(8)]),
    city : new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate : new FormControl(''),
    isParmanent : new FormControl(false) 

  })
  getSearch(){
    return this.hc.get("https://api.github.com/search/users?q=search");
  }
intialzeFormGroup(){
  this.form.setValue({
    $key : null,
    fullName: '',
    email : '',
    mobile : '',
    city : '',
    gender: '1',
    department:0,
    hireDate : '',
    isParmanent:false
  })
}
getEmployees(){
  this.employeeList = this.firebase.list('employees');
  return this.employeeList.snapshotChanges();
}
insertEmployees(employee){
  this.employeeList.push({
    fullName :employee.fullName,
    email:employee.email,
    mobile:employee.mobile,
    city:employee.city,
    gender:employee.gender,
    department:employee.department,
    hireDateD:employee.hireDate,
    isParmanent:employee.isParmanent

  })

}
updateEmployees(employee){
  this.employeeList.update(employee.$key,{
    fullName :employee.fullName,
    email:employee.email,
    mobile:employee.mobile,
    city:employee.city,
    gender:employee.gender,
    department:employee.department,
    hireDateD:employee.hireDate,
    isParmanent:employee.isParmanent
  })
}
deleteEmployees($key:string){
  this.employeeList.remove($key);
}
}
