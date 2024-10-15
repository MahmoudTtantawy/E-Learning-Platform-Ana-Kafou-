import { NotFoundComponent } from './not-found/not-found.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { StudentSignUPComponent } from './Auth/Registeration/student-sign-up/student-sign-up.component';
import { ForgetPasswordComponent } from './Auth/forget-password/forget-password.component';

import { CourseListComponent } from './Course/course-list/course-list.component';
import { CourseDetailComponent } from './Course/course-detail/course-detail.component';
import { TestListComponent } from './Test/test-list/test-list.component';
import { authGuard } from './Guard/auth.guard';
import { CourseCreateComponent } from './Course/course-create/course-create.component';
import { CourseUpdateComponent } from './Course/course-update/course-update.component';
import { CourseViewComponent } from './Course/course-view/course-view.component';
import { CreateComponent } from './Create-Teacher-Moderator/Create/create/create.component';
import { UpdateComponent } from './Create-Teacher-Moderator/update/update/update.component';
import { IndexComponent } from './Create-Teacher-Moderator/index/index/index.component';
import { AdminComponent } from './Dashboard/admin/admin.component';
import { UserManagmentComponent } from './Dashboard/admin/user-managment/user-managment.component';
import { PaymentComponent } from './Payment/payment/payment.component';
import { PaymentMangementComponent } from './Dashboard/admin/payment-mangement/payment-mangement.component';
import { TrashedComponent } from './Create-Teacher-Moderator/trashed/trashed/trashed.component';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { TestCreateComponent } from './Test/test-create/test-create.component';
import { TestUpdateComponent } from './Test/test-update/test-update.component';
import { TestManagementComponent } from './Test/test-management/test-management.component';
import { ProfileViewComponent } from './Dashboard/student/student-profile-view/student-profile-view.component';
import { ProfileEditComponent } from './Dashboard/student/student-profile-edit/student-profile-edit.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { isAdminGuard } from './Guard/is-admin.guard';
import { isModeratorGuard } from './Guard/is-moderator.guard';
import { RestoreUserComponent } from './Dashboard/admin/user-management/restore-user/restore-user.component';
import { CourseSessionComponent } from './Course/course-session/course-session.component';
import { TestDetailComponent } from './Test/test-detail/test-detail.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Ana Kafuo ',
  },
  {
    path: 'AdminDashboardComponent',
    component: AdminDashboardComponent,
    title: 'AdminDashboardComponent ',
  },
  {
    path: 'signin',
    component: SignInComponent,
    title: 'Sign In',
  },
  {
    path: 'studentSignup',
    component: StudentSignUPComponent,
    title: 'Student Sign Up',
  },
  {
    path: 'tests',
    component: TestListComponent,
    title: 'All Tests',
    canActivate: [authGuard]
  },
  {
    path: 'test-create',
    component: TestCreateComponent,
    title: 'Create Tests',
    canActivate: [isModeratorGuard, authGuard]
  },
  {
    path: 'test/:id/update',
    component: TestUpdateComponent,
    title: 'Update Tests',
    canActivate: [isModeratorGuard, authGuard]
  }, {
    path: 'test/:id',
    component: TestManagementComponent,
    title: 'Exam',
    canActivate: [authGuard]
  },{
    path: 'test-answer/:id',
    component: TestDetailComponent,
    title: 'Exam  Answer',
    canActivate: [authGuard]
  },
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent,
    title: 'Forget Password',
  },
  {
    path: 'createorganizer',
    component: CreateComponent,
    title: 'Create Organizer',
    canActivate: [isAdminGuard, authGuard]

  },
  {
    path: 'updateorganizer/:id',
    component: UpdateComponent,
    title: 'Update Organizer',
    canActivate: [isAdminGuard, authGuard]

  },
  {
    path: 'allorganizer',
    component: IndexComponent,
    title: 'All Organizer',
    canActivate: [isAdminGuard, authGuard]

  },
  {
    path: 'courses',
    component: CourseListComponent,
    title: 'Our Courses',
    // canActivate: [authGuard]
  },

  {
    path: 'course/:id',
    component: CourseDetailComponent,
    title: 'Course Detail',
    canActivate: [authGuard]
  },
  {
    path: 'course-session/:id/:videoId',
    component: CourseSessionComponent,
    title: 'Course Session',
  },
  {
    path: 'coursecreate',
    component: CourseCreateComponent,
    title: 'Create Course',
    canActivate: [isModeratorGuard, authGuard]

  },
  {
    path: 'courseupdate/:id',
    component: CourseUpdateComponent,
    title: 'Update Course',
    canActivate: [isModeratorGuard, authGuard]

  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    title: 'Admin',
    canActivate: [isModeratorGuard, authGuard]
  },
  {
    path: 'admin/courses',
    component: CourseViewComponent,
    title: 'Courses',
    canActivate: [isModeratorGuard, authGuard]

  },
  {
    path: 'admin/user-managment',
    component: UserManagmentComponent,
    title: 'User Managment',
    canActivate: [isModeratorGuard, authGuard]

  },
  {
    path: 'admin/payment',
    component: PaymentMangementComponent,
    title: 'Payments',
        canActivate: [isAdminGuard, authGuard]
  },
  {
    path: 'createorganizer',
    component: CreateComponent,
    title: 'Create Organizer',
    canActivate: [isAdminGuard, authGuard]
  },
  {
    path: 'updateorganizer/:id',
    component: UpdateComponent,
    title: 'Update Organizer',
        canActivate: [isAdminGuard, authGuard]
  },
  {
    path: 'allorganizer',
    component: IndexComponent,
    title: 'All Organizer',
    canActivate: [isAdminGuard, authGuard]
  },
  {
    path: 'trashorganizer',
    component: TrashedComponent,
    title: 'Trashed organizer',
    canActivate: [isAdminGuard, authGuard]

  },
  {
    path: 'payment/:id',
    component: PaymentComponent,
    title: 'Payment',
    canActivate: [authGuard]
  },
  {
    path: 'teachers',
    component: TeacherComponent,
    title: 'teachers',
    // canActivate: [authGuard]
  },
  {
    path: 'teacherprofile/:id',
    component: TeacherProfileComponent,
    title: 'teacherProfile',
    canActivate: [authGuard]
  },
  {
    path: 'profile/:id',
    component: ProfileViewComponent,
    title: 'Profile View',
    canActivate: [authGuard]
  },
  {
    path: 'edit-profile',
    component: ProfileEditComponent,
    title: 'Edit Profile',
    canActivate: [authGuard]
  },

  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    title: 'unAuthorized',
    canActivate: [authGuard]
  },
  {
    path:'admin/restoreuser',
    component: RestoreUserComponent,
    title: 'Restore User',
    canActivate: [isAdminGuard, authGuard]
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Error',
  }

];
