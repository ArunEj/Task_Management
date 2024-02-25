import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from '../service/service.service';
import { DateAdapter } from '@angular/material/core';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  public createForm!: FormGroup;
  private id: number = 0;
  private task: any = [];
  public date: any;
  public submitted:boolean = false;

  constructor(private fb: FormBuilder,
              public service: Service, private dateAdapter:DateAdapter<Date>,
              private router: Router) {
                this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy, Date Adapter for date format
               }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: ['', [Validators.required]],
      date:  ['', [Validators.required]],
      description: []
    })
    this.getTaskList();
  }

  private getTaskList() {
    if(!localStorage.getItem('task')) {
      return;
    }
    let arrData = localStorage.getItem('task');
    //@ts-ignore
    this.task = JSON.parse(arrData);
    if(this.task.length > 0) {
      this.id = this.task[this.task.length-1].id;
    }
  }

  public create() {
    this.submitted = true;
    if(this.createForm.invalid) {
      return;
    }
    let inputData = {
      id: this.task.length > 0 ? this.id + 1 : 1,
      title: this.createForm.controls.title.value,
      date: this.createForm.controls.date.value,
      description: this.createForm.controls.description.value,
      status: false
    }
    this.task.push(inputData);
    localStorage.setItem('task', JSON.stringify(this.task));
    this.service.successAlert('Created');
    this.back();
  }

  private resetForm() {
    this.createForm.reset();
  }

  public back() {
    this.resetForm();
    this.router.navigate(['']);
  }
}
