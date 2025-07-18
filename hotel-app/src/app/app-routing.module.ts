import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"new", component: ReservationFormComponent},
  {path:"list", component: ReservationListComponent},
  // Here we want to edit a specific property in the array, therefore, we passed the id of that property
  {path:"edit/:id", component:ReservationFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
