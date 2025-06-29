import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MainlayoutComponent } from './components/mainlayout/mainlayout.component';
import { TopstripComponent } from './components/topstrip/topstrip.component';
import { StudentsComponent } from './pages/students/students.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { UsersComponent } from './pages/users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FooterComponent } from './components/footer/footer.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { FormsModule } from '@angular/forms';
import { AddStudentComponent } from './pages/students/add-student/add-student.component';
import { AddTeacherComponent } from './pages/teachers/add-teacher/add-teacher.component';
import { AddClassComponent } from './pages/classes/add-class/add-class.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { EnrollmentComponent } from './pages/enrollment/enrollment.component';
import { GradeComponent } from './pages/grade/grade.component';
import { SchoolEventComponent } from './pages/school-event/school-event.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { TeacherAssignmentComponent } from './pages/teacher-assignment/teacher-assignment.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    LoginComponent,
    MainlayoutComponent,
    TopstripComponent,
    UsersComponent,
    StudentsComponent,
    TeachersComponent,
    ClassesComponent,
    FooterComponent,
    BreadcrumbComponent,
    LoaderComponent,
    AddUserComponent,
    AddStudentComponent,
    AddTeacherComponent,
    AddClassComponent,
    AttendanceComponent,
    EnrollmentComponent,
    GradeComponent,
    SchoolEventComponent,
    SubjectComponent,
    TeacherAssignmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
