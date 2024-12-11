import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import type { Notification } from '../../types/notification';
import { useNotificationStore } from '../../store/notificationStore';

const icons = {
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
};

const colors = {
  success: 'bg-green-50 text-green-800 border-green-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  error: 'bg-red-50 text-red-800 border-red-200',
};

const iconColors = {
  success: 'text-green-500',
  info: 'text-blue-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
};

interface Props {
  notification: Notification;
}

export default function NotificationToast({ notification }: Props) {
  const removeNotification = useNotificationStore((state) => state.removeNotification);
  const Icon = notification.icon ? () => notification.icon : icons[notification.type];

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg border
        shadow-sm ${colors[notification.type]} animate-slide-in`}
    >
      <div className="flex items-center space-x-3">
        <Icon className={iconColors[notification.type]} size={20} />
        <p className="font-medium">{notification.message}</p>
      </div>
      <button
        onClick={() => removeNotification(notification.id)}
        className="text-gray-400 hover:text-gray-600"
      >
        <X size={16} />
      </button>
    </div>
  );
}