
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export type NotificationType = {
  id: string;
  title: string;
  message: string;
  type: "job" | "application" | "chat" | "system";
  read: boolean;
  createdAt: Date;
  link?: string;
};

type NotificationsContextType = {
  notifications: NotificationType[];
  unreadCount: number;
  addNotification: (notification: Omit<NotificationType, "id" | "createdAt" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
};

const NotificationsContext = createContext<NotificationsContextType>({} as NotificationsContextType);

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  
  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Load notifications from localStorage on mount
  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      try {
        const parsedNotifications = JSON.parse(storedNotifications);
        // Convert string dates back to Date objects
        const formattedNotifications = parsedNotifications.map((n: any) => ({
          ...n,
          createdAt: new Date(n.createdAt)
        }));
        setNotifications(formattedNotifications);
      } catch (error) {
        console.error("Failed to parse stored notifications:", error);
      }
    }
  }, []);
  
  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);
  
  // Add a new notification
  const addNotification = (notification: Omit<NotificationType, "id" | "createdAt" | "read">) => {
    const newNotification: NotificationType = {
      ...notification,
      id: `notif_${Date.now()}`,
      createdAt: new Date(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for the new notification
    toast.info(notification.title, {
      description: notification.message,
      action: notification.link ? {
        label: "View",
        onClick: () => {
          window.location.href = notification.link!;
          markAsRead(newNotification.id);
        }
      } : undefined
    });
  };
  
  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === id ? { ...n, read: true } : n
      )
    );
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };
  
  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };
  
  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications
  };
  
  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};
