import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { FormTemplatesComponent } from './components/form-templates/form-templates.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'form-template', component:FormTemplatesComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
