import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Service } from '../service/service.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  public editForm!: FormGroup;
  public taskDetailObj: any = {};
  public taskList: any = [];
  public submitted:boolean = false;
  private id: any;
  
  constructor(private fb: FormBuilder, private router: Router, private service: Service,
    private route: ActivatedRoute, private dateAdapter:DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
   }

  ngOnInit(): void {
    this.taskList = this.service.getTaskList();
    this.id = this.route.snapshot.params['id'];
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      date:  ['', [Validators.required]],
      description: [],
      status: []
    })
    this.getDetailData();
  }

  private getDetailData() {
    //@ts-ignore
    this.taskDetailObj = this.taskList.find(task => task.id == this.id);
    this.editForm.patchValue(this.taskDetailObj);
  }

  private resetForm() {
    this.editForm.reset();
  }

  public back() {
    this.resetForm();
    this.router.navigate(['']);
  }

  public update() {
    this.submitted = true;
    if(this.editForm.invalid) {
      return;
    }
    //@ts-ignore
    this.taskList.forEach(element => {
      if(element.id == this.taskDetailObj.id) {
        element.title = this.editForm.controls.title.value;
        element.date = this.editForm.controls.date.value;
        element.description = this.editForm.controls.description.value;
        element.status = this.editForm.controls.status.value;
      }
    });
    localStorage.setItem('task',JSON.stringify(this.taskList));
    this.service.successAlert('Updated');
    this.back();
  }
}
