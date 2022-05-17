import { Component, Inject, OnInit } from '@angular/core';
import {MatSnackBar, MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
import { NotificationMessage, NotificationType } from '../../Models/NotificationMessage';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  public ErrorNotificationType = NotificationType.Error;
  public WarningNotificationType = NotificationType.Warning;
  public InfoNotificationType = NotificationType.Info;

  constructor(@Inject(MAT_SNACK_BAR_DATA) 
  public data: NotificationMessage, 
  public snackBar: MatSnackBar) { }



}
