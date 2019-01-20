import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import {MatTableDataSource, MatSort, MatPaginator,MatDialog,MatDialogRef} from '@angular/material';
import { EmployeeComponent } from '../employee/employee.component';
import { Search } from 'src/app/search';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  
  list : Search;
  constructor(private es:EmployeeService,private dialog:MatDialog) { 
    this.es.getSearch().subscribe((data)=>{
      console.log('data---',data)
      
   // this.list = data.items;

    })
  }
  listData :MatTableDataSource<any>
  dialogRef:MatDialogRef<any>
displayedColumns:string []=  ['fullName','mobile','email','city','action']
@ViewChild(MatSort) sort:MatSort;
@ViewChild(MatPaginator) paginator:MatPaginator;
searchKey:string;
  ngOnInit() {
    this.es.getSearch();
    
    this.es.getEmployees().subscribe(
      list =>{ 
        let array = list.map(item =>{
        return{
          $key:item.key,
          ...item.payload.val()
        }
      })
      this.listData = new MatTableDataSource(array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    })};
    onSearchClear(){
      this.searchKey = '';
      this.applyFilter()
    }
    applyFilter(){
      this.listData.filter = this.searchKey.trim().toLowerCase()
    }
    openDialog(): void {
      this.dialog.open(EmployeeComponent, {
        width: '550px',
      

});
      
      this.dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        //this.dialogRef = this.listData;
      });
    }
    m1(value:any){
      this.es.getSearch().subscribe((data)=>{
        this.list =<Search>data;


      });
    }
    
    
  }

