import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  // This is happening before the ngOnInt lifecycle hook. Getting loaded before 
  constructor(){

    let savedReservations = localStorage.getItem("reservations");
    this.reservations = savedReservations? JSON.parse(savedReservations) : [];
  }

  // CRUD --> Create  Read  Use  Delete

  /* USE */
  // Here we are returning all reservations
  getReservations(): Reservation[] {
    return this.reservations;
  }

  /* USE */
  // Here we return reservation by id passed
  getReservation(id: string): Reservation | undefined {
    // Using the find method to search the array.
    // "(res => res.id === id)" is an arrow function used in conjunction with .find()/.filter() to make sure the id element matches a given id value.
    // Checks every element in res until they find one in res.id === id.
    return this.reservations.find(res => res.id === id);
  }

  /* CREATE */
  // When using a database the primary key identifier will "automatically" assign a key to each variable in the array.
  // Since we are not using a databse we are going to do this here.
  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString();

    this.reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }



  /* DELETE */
  deleteReservation(id: string): void {
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(index, 1);
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  /* READ */
  updateReservation(updatedReservation: Reservation): void {
    let index = this.reservations.findIndex(res => res.id === updatedReservation.id);
    this.reservations[index] = updatedReservation;
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }
  
}
