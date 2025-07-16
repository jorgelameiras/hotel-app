import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  
  reservationForm: FormGroup = new FormGroup({});

  // Dependency injection in Angular
  // Learn more about this
  constructor(private formBuilder: FormBuilder) {
    
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
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    if(this.reservationForm.valid) {
      console.log("Valid");
    }

  }
}
