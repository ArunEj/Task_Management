import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskViewComponent } from './task-view/task-view.component';

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent
  },
  {
    path: 'create',
    component: TaskCreateComponent
  },
  {
    path: 'detail/:id',
    component: TaskViewComponent
  },
  {
    path: 'edit/:id',
    component: TaskEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
