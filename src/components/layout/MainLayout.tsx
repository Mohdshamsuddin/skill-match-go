
import { useState } from "react";
import { Outlet, NavLink, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNotifications } from "@/contexts/NotificationsContext";
import { 
  Home, 
  Briefcase, 
  User, 
  MessageCircle, 
  Settings,
  BookmarkCheck,
  Bell,
  Wand
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";
import LanguageSelector from "@/components/common/LanguageSelector";

const MainLayout = () => {
  const { currentUser, logout } = useAuth();
  const { translate } = useLanguage();
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    { path: "/dashboard", icon: <Home size={24} />, label: "Home" },
    { path: "/jobs", icon: <Briefcase size={24} />, label: "Jobs" },
    { path: "/saved-jobs", icon: <BookmarkCheck size={24} />, label: "Saved" },
    { path: "/chat", icon: <MessageCircle size={24} />, label: "Chat" },
    { path: "/profile", icon: <User size={24} />, label: "Profile" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      // The redirect will be handled by the AuthContext
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h1 className="text-xl font-bold text-primary">SkillLink</h1>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <LanguageSelector />
            
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Bell size={24} />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-secondary text-secondary-foreground">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
              
              {showNotifications && (
                <NotificationDropdown 
                  onClose={() => setShowNotifications(false)} 
                />
              )}
            </div>
            
            <Button size="sm" variant="outline" onClick={handleLogout}>
              {translate("logout")}
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
      
      {/* Mobile navigation */}
      <nav className="sticky bottom-0 bg-white border-t shadow-sm md:hidden">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center justify-center py-2 px-1
                ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'}
              `}
            >
              <div className="flex items-center justify-center h-6">
                {item.icon}
              </div>
              <span className="text-xs mt-1">{translate(item.label.toLowerCase())}</span>
            </NavLink>
          ))}
        </div>
      </nav>
      
      {/* Desktop sidebar - hidden on mobile */}
      <nav className="fixed left-0 top-0 h-full w-64 bg-white border-r shadow-sm p-4 hidden md:block">
        <div className="flex flex-col h-full">
          <div className="mb-6 flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <h1 className="text-2xl font-bold text-primary">SkillLink</h1>
            </Link>
          </div>
          
          <div className="flex flex-col space-y-1 flex-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center px-4 py-3 rounded-lg text-base font-medium
                  ${isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-primary'}
                `}
              >
                <div className="mr-3">{item.icon}</div>
                <span>{translate(item.label.toLowerCase())}</span>
              </NavLink>
            ))}
            
            <div className="flex-1"></div>
            
            <NavLink
              to="/settings"
              className={({ isActive }) => `
                flex items-center px-4 py-3 rounded-lg text-base font-medium
                ${isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-primary'}
              `}
            >
              <Settings size={24} className="mr-3" />
              <span>{translate("settings")}</span>
            </NavLink>
          </div>
          
          {currentUser && (
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center p-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={20} className="text-gray-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{currentUser.displayName || "User"}</p>
                  <p className="text-xs text-gray-500">{currentUser.email || currentUser.phoneNumber}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;
