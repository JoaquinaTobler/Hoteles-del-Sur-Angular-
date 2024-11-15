import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomDataService } from '../../services/room-data.service';
import { AvailabilityService } from '../../services/availability.service';
import { CustomValidators } from '../../validators/custom-validators';


@Component({
  selector: 'app-add-rooms',
  templateUrl: './add-rooms.component.html',
  styleUrls: ['./add-rooms.component.css']
})
export class AddRoomsComponent implements OnInit {

  roomForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private roomDataService: RoomDataService,
    private router: Router
  ) {
    this.roomForm = this.fb.group({
      numero: ['', Validators.required, CustomValidators.idValidatorRoom],
      type: ['', Validators.required],
      capacity: ['', Validators.required, Validators.min(1)],
      pricePerNight: ['', Validators.required, Validators.min(0)],
      imageUrl: ['', [Validators.required, CustomValidators.idValidator]]
    });
  }

  ngOnInit(): void { }

  async onSubmit(): Promise<void> {
    if (this.roomForm.valid) {
      const newRoom = this.roomForm.value;

      this.roomDataService.createRoom(newRoom).subscribe(
        () => {},
        (error) => console.error('Error al añadir la habitación:', error)
      );

    } else {
      console.log('El formulario es inválido');
    }
  }
}
