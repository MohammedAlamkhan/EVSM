import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TableModule} from 'primeng/table';
import { SpinnerComponent } from './spinner/spinner.component';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [
    NotificationComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    ProgressSpinnerModule
  ],
  exports:[ MatSnackBarModule,
            MatButtonModule,
            MatIconModule,
            TableModule,
            SpinnerComponent,
            CalendarModule
  ],
  providers:[]
})
export class SharedModule { }
