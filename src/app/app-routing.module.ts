import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResultComponent} from './result/result.component';
import {SignComponent} from './sign/sign.component';


const routes: Routes = [
  {path: '', component: SignComponent},
  {path: 'contact', component: ResultComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
