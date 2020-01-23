import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent} from './layout/layout.component';
import { LoginFormComponent } from './login-form/login-form.component';


const routes: Routes = [
  {path:'',component: LayoutComponent},
  {path: 'login', component: LoginFormComponent },
  {path: 'categories/:category', component:LayoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
