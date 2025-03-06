import { RouterModule, Routes } from '@angular/router';
//import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { TableComponent } from './table/table.component';

export const routes: Routes = [
//  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '', component: TableComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // กำหนด Routing ให้ App
  exports: [RouterModule]
})
export class AppRoutingModule { }
