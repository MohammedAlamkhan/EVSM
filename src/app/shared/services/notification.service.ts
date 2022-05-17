import { Injectable } from '@angular/core';
import { NotificationMessage, NotificationType } from '../../Models/NotificationMessage';
import { NotificationComponent } from '../notification/notification.component';
import {MatSnackBar, MatSnackBarModule,MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationQueue: NotificationMessage[] = [];
  private currentlyShowingMessage: boolean = false;

  constructor(private snackBar: MatSnackBar) {}

  show(notification: string, type: NotificationType = NotificationType.Info) {
      if(notification === '' || notification === null || notification === undefined){
          return;
      }
      const notificationData = new NotificationMessage();
      notificationData.notification = notification;
      notificationData.type = type;
      this.notificationQueue.push(notificationData);
      this.showNextNotification();
  }

  private showNextNotification() {
      if (!this.currentlyShowingMessage) {
          const notificationData = this.notificationQueue.shift();
          if (notificationData !== undefined) {
              this.currentlyShowingMessage = true;
              let snackBarRef = this.snackBar.openFromComponent(NotificationComponent, {data: notificationData, duration: 5000});
              snackBarRef.afterDismissed().subscribe(() => {
                  this.currentlyShowingMessage = false;
                  this.showNextNotification();
              })
          }
      }
  }
}