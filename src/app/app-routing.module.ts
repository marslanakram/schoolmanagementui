import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainlayoutComponent } from './components/mainlayout/mainlayout.component';
import { UsersComponent } from './pages/users/users.component';
import { StudentsComponent } from './pages/students/students.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // {
  //   path:'',
  //   component: LoginComponent,
  //   pathMatch:'full'
  // },
  //  {
  //   path:'login',
  //   component: LoginComponent
  // },
  // {
  //   path:'',
  //   component: DashboardComponent,
  //   pathMatch:'full'
  // },
  //  {
  //   path:'dashboard',
  //   component: DashboardComponent,
  
  // }
   // Login outside layout
  { path: 'login', component: LoginComponent },

  // Default route redirect
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Protected routes inside layout
  {
    path: '',
    component: MainlayoutComponent,
    canActivate: [AuthGuard], // protect all children
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'teachers', component: TeachersComponent },
      { path: 'classes', component: ClassesComponent },
      
    ]
    // you can add a canActivate guard if needed
  },

  // Wildcard to catch unknown routes
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
