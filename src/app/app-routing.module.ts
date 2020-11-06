import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { DeleteComponent } from './pages/crud/delete/delete.component';
import { DetailComponent } from './pages/crud/detail/detail.component';
import { EditComponent } from './pages/crud/edit/edit.component';
import { NewComponent } from './pages/crud/new/new.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'crud', component: IndexComponent},
  { path: 'crud/detail/:id', component:DetailComponent}, 
  { path: 'crud/edit/:id', component:EditComponent},
  { path: 'crud/new', component:NewComponent},  
  { path: 'crud/delete/:id/:image', component:DeleteComponent},            
  {path: '**', component: ErrorComponent}    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
