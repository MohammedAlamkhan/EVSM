export enum NotificationType{
    Error = 1,
    Warning = 2,
    Info = 3
}

export class NotificationMessage{
    notification: string
    type: NotificationType
}