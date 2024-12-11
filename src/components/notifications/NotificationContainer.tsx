import React from 'react';
import { useNotificationStore } from '../../store/notificationStore';
import NotificationToast from './NotificationToast';

export default function NotificationContainer() {
  const notifications = useNotificationStore((state) => state.notifications);

  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 flex flex-col items-center space-y-2 pointer-events-none px-4">
      {notifications.map((notification) => (
        <div key={notification.id} className="pointer-events-auto w-full max-w-sm">
          <NotificationToast notification={notification} />
        </div>
      ))}
    </div>
  );
}