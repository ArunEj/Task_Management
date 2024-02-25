import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {
  id = '';
  public taskList: any = [];
  public taskDetailObj: any = {};
  status = new FormControl('');

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id= this.route.snapshot.params['id'];
    this.getTaskList();
  }

  public getTaskList() {
    let arrData = localStorage.getItem('task');
    //@ts-ignore
    this.taskList = JSON.parse(arrData);
    this.getDetailData();
  }

  private getDetailData() {
    //@ts-ignore
    this.taskDetailObj = this.taskList.find(task => task.id == this.id);
  }

  public back() {
    this.router.navigate(['']);
  }

  public delete() {
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
          if (this.taskList[i].id == this.taskDetailObj.id) {
              this.taskList.splice(i, 1);
          }
        };
        localStorage.setItem("task", JSON.stringify(this.taskList));
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success"
        });
        this.back();
      }
    });
  }

  public edit() {
    this.router.navigate(['edit/'+this.id]);
  }

  public update() {
    localStorage.setItem('task',JSON.stringify(this.taskList));
    Swal.fire({
      icon: "success",
      title: "Task Updated Successfully",
      showConfirmButton: false,
      timer: 1500
    });
    this.back();
  }
}
