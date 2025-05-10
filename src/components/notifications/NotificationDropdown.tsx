
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNotifications } from "@/contexts/NotificationsContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDistanceToNow } from "date-fns";
import { Check, Bell, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type NotificationDropdownProps = {
  onClose: () => void;
};

const NotificationDropdown = ({ onClose }: NotificationDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, markAsRead, markAllAsRead, clearNotifications } = useNotifications();
  const { translate } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "job":
        return <div className="rounded-full bg-blue-100 p-2 text-blue-600"><Bell size={16} /></div>;
      case "application":
        return <div className="rounded-full bg-green-100 p-2 text-green-600"><Check size={16} /></div>;
      case "chat":
        return <div className="rounded-full bg-purple-100 p-2 text-purple-600"><Bell size={16} /></div>;
      default:
        return <div className="rounded-full bg-gray-100 p-2 text-gray-600"><Bell size={16} /></div>;
    }
  };

  return (
    <div 
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border overflow-hidden z-50"
    >
      <div className="p-3 border-b flex justify-between items-center">
        <h3 className="font-semibold">{translate("notifications")}</h3>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={markAllAsRead}
            className="text-xs"
          >
            {translate("mark_all_read")}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearNotifications}
            className="text-destructive hover:bg-destructive/10"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
      
      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length > 0 ? (
          <div>
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-3 border-b hover:bg-gray-50 flex items-start ${
                  !notification.read ? 'bg-blue-50/30' : ''
                }`}
              >
                <div className="mr-3 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  {notification.link ? (
                    <Link 
                      to={notification.link}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                    </Link>
                  ) : (
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                  )}
                  <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </p>
                </div>
                {!notification.read && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-6 w-6" 
                    onClick={() => markAsRead(notification.id)}
                  >
                    <Check size={14} />
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            <p>{translate("no_notifications")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
