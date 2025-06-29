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
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { AddStudentComponent } from './pages/students/add-student/add-student.component';
import { AddTeacherComponent } from './pages/teachers/add-teacher/add-teacher.component';
import { AddClassComponent } from './pages/classes/add-class/add-class.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { EnrollmentComponent } from './pages/enrollment/enrollment.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { TeacherAssignmentComponent } from './pages/teacher-assignment/teacher-assignment.component';
import { SchoolEventComponent } from './pages/school-event/school-event.component';
import { GradeComponent } from './pages/grade/grade.component';

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
      { path: 'users/add', component: AddUserComponent },
      { path: 'users/edit/:id', component: AddUserComponent },
      
      { path: 'students', component: StudentsComponent },
      {path: 'students/add', component: AddStudentComponent},
      {path: 'students/edit/:id', component: AddStudentComponent} ,

      { path: 'teachers', component: TeachersComponent },
      {path: 'teachers/add', component: AddTeacherComponent},
      {path: 'teachers/edit/:id', component: AddTeacherComponent},

      { path: 'classes', component: ClassesComponent },
      {path: 'classes/add', component: AddClassComponent},
      {path: 'classes/edit/:id', component: AddClassComponent},

       { path: 'attendance', component: AttendanceComponent },
       { path: 'enrollment', component: EnrollmentComponent },
       { path: 'subject', component: SubjectComponent },
      { path: 'assignment', component: TeacherAssignmentComponent },
      { path: 'event', component: SchoolEventComponent },
      { path: 'grade', component: GradeComponent },
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
