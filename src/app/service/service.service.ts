import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor() { }

  //success sweet alert
  public successAlert(status: any) {
    Swal.fire({
      icon: "success",
      title: 'Task ' + status + ' Successfully',
      showConfirmButton: false,
      timer: 1500
    });
  }

  //get task list from localStorage
  public getTaskList() {
    let arrData = localStorage.getItem('task');
    //@ts-ignore
    return JSON.parse(arrData);
  }
}
