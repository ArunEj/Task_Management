import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Service } from '../service/service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  public taskList: any = [];
  public displayedColumns: string[] = ['s.no', 'title', 'date', 'status', 'action'];

  dataSource = new MatTableDataSource(this.taskList);
  @ViewChild(MatTable, { static: true }) table: MatTable<any> | undefined;
  
  constructor(public router: Router, private service: Service) { }

  ngOnInit(): void {
    this.taskList = this.service.getTaskList();
  }

  public goToCreatePage() {
    this.router.navigate(['create']);
  }
}
