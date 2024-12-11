export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  icon?: React.ReactNode;
  duration?: number;
}

export interface NotificationState {
  notifications: Notification[];
}