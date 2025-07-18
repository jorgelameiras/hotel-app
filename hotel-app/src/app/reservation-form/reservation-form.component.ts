import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  
  reservationForm: FormGroup = new FormGroup({});

  // Dependency injection in Angular
  // Learn more about this
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      // This bassically creates a validation requeriment to submit the form,
      // if the date field is empty then you wont be able to submit the form
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      // Here we are creating an array inside of another array, in order to validate
      // if the text entered is actually an array
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    })
    
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id) {
      let reservation = this.reservationService.getReservation(id)

      if(reservation){
        this.reservationForm.patchValue(reservation);
      }

    }
  }

  onSubmit() {
    if(this.reservationForm.valid) {

      let reservation: Reservation = this.reservationForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      // Checking if the id exist, if it does go through an update.
      // Else add a new property
      if(id) {
        //Update
        this.reservationService.updateReservation(id, reservation);

      } else {
        //New
        this.reservationService.addReservation(reservation);
      }

      // When the user submits the reservation it will re-direct him to the list URL
      this.router.navigate(['/list']);
    }

  }
}
