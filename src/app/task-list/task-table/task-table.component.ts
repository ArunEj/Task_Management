import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Service } from 'src/app/service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit {

  @Input() tableData: any;
  private taskList: any = [];
  public dataSource: any;
  public displayedColumns: string[] = ['s.no', 'title', 'date', 'status', 'action'];

  constructor(private router: Router, private service: Service) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.taskList = this.service.getTaskList();
  }

  public goToDetailPage(element: any) {
    this.router.navigate(['detail/'+element.id]);
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public delete(element: any) {
    Swal.fire({
      title: "Are you sure Delete this Task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        for (var i =0; i < this.taskList.length; i++) {
          if (this.taskList[i].id == element.id) {
              this.taskList.splice(i, 1);
          }
        };
        localStorage.setItem("task", JSON.stringify(this.taskList));
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success"
        });
        this.dataSource = new MatTableDataSource(this.taskList);
      }
    });
  }
}
