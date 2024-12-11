import { create } from 'zustand';
import type { Notification, NotificationState } from '../types/notification';

interface NotificationStore extends NotificationState {
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],

  addNotification: (notification) => {
    const id = Math.random().toString(36).substring(7);
    const duration = notification.duration || 3000;

    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id },
      ],
    }));

    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    }, duration);
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
}));