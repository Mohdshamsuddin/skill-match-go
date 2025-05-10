
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNotifications } from "@/contexts/NotificationsContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import {
  Bell,
  Globe,
  Lock,
  Monitor,
  Moon,
  Sun,
  Languages
} from "lucide-react";

const Settings = () => {
  const { logout } = useAuth();
  const { translate, currentLanguage, setLanguage, availableLanguages } = useLanguage();
  const { addNotification } = useNotifications();
  
  const [notificationSettings, setNotificationSettings] = useState({
    jobAlerts: true,
    applicationUpdates: true,
    chatMessages: true,
    systemUpdates: false,
  });
  
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [dataUsage, setDataUsage] = useState<'low' | 'medium' | 'high'>('medium');
  
  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast.success(`${key} notifications ${notificationSettings[key] ? 'disabled' : 'enabled'}`);
  };
  
  const handleSaveSettings = () => {
    toast.success(translate("settings_saved"));
    
    addNotification({
      title: "Settings Updated",
      message: "Your settings have been updated successfully.",
      type: "system"
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{translate("settings")}</h1>
      
      <Tabs defaultValue="preferences" className="space-y-8">
        <TabsList>
          <TabsTrigger value="preferences">{translate("preferences")}</TabsTrigger>
          <TabsTrigger value="notifications">{translate("notifications")}</TabsTrigger>
          <TabsTrigger value="account">{translate("account")}</TabsTrigger>
        </TabsList>
        
        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          {/* Language Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Languages className="h-5 w-5 mr-2" />
                {translate("language_settings")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base mb-4 block">
                  {translate("select_language")}
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {availableLanguages.map((language) => (
                    <button
                      key={language.code}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        currentLanguage === language.code
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-gray-50'
                      }`}
                      onClick={() => setLanguage(language.code)}
                    >
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 mr-3 text-gray-500" />
                        <span>{language.name}</span>
                      </div>
                      {currentLanguage === language.code && (
                        <div className="h-3 w-3 rounded-full bg-primary"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Monitor className="h-5 w-5 mr-2" />
                {translate("appearance")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base mb-4 block">
                  {translate("theme")}
                </Label>
                <RadioGroup 
                  value={theme} 
                  onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  <div>
                    <RadioGroupItem 
                      value="light" 
                      id="light" 
                      className="sr-only" 
                    />
                    <Label
                      htmlFor="light"
                      className={`flex flex-col items-center justify-between p-4 rounded-lg border ${
                        theme === 'light'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-gray-50'
                      } cursor-pointer`}
                    >
                      <Sun className="h-6 w-6 mb-2" />
                      <span>{translate("light")}</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem 
                      value="dark" 
                      id="dark" 
                      className="sr-only" 
                    />
                    <Label
                      htmlFor="dark"
                      className={`flex flex-col items-center justify-between p-4 rounded-lg border ${
                        theme === 'dark'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-gray-50'
                      } cursor-pointer`}
                    >
                      <Moon className="h-6 w-6 mb-2" />
                      <span>{translate("dark")}</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem 
                      value="system" 
                      id="system" 
                      className="sr-only" 
                    />
                    <Label
                      htmlFor="system"
                      className={`flex flex-col items-center justify-between p-4 rounded-lg border ${
                        theme === 'system'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-gray-50'
                      } cursor-pointer`}
                    >
                      <Monitor className="h-6 w-6 mb-2" />
                      <span>{translate("system")}</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
          
          {/* Data Usage Settings */}
          <Card>
            <CardHeader>
              <CardTitle>{translate("data_usage")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base mb-4 block">
                  {translate("data_saving_mode")}
                </Label>
                <RadioGroup 
                  value={dataUsage} 
                  onValueChange={(value) => setDataUsage(value as 'low' | 'medium' | 'high')}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low">
                      {translate("low")} - {translate("low_data_description")}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">
                      {translate("medium")} - {translate("medium_data_description")}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high">
                      {translate("high")} - {translate("high_data_description")}
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                {translate("notification_settings")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="jobAlerts" className="text-base">
                      {translate("job_alerts")}
                    </Label>
                    <p className="text-sm text-gray-500">
                      {translate("job_alerts_description")}
                    </p>
                  </div>
                  <Switch
                    id="jobAlerts"
                    checked={notificationSettings.jobAlerts}
                    onCheckedChange={() => handleNotificationChange('jobAlerts')}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="applicationUpdates" className="text-base">
                      {translate("application_updates")}
                    </Label>
                    <p className="text-sm text-gray-500">
                      {translate("application_updates_description")}
                    </p>
                  </div>
                  <Switch
                    id="applicationUpdates"
                    checked={notificationSettings.applicationUpdates}
                    onCheckedChange={() => handleNotificationChange('applicationUpdates')}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="chatMessages" className="text-base">
                      {translate("chat_messages")}
                    </Label>
                    <p className="text-sm text-gray-500">
                      {translate("chat_messages_description")}
                    </p>
                  </div>
                  <Switch
                    id="chatMessages"
                    checked={notificationSettings.chatMessages}
                    onCheckedChange={() => handleNotificationChange('chatMessages')}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="systemUpdates" className="text-base">
                      {translate("system_updates")}
                    </Label>
                    <p className="text-sm text-gray-500">
                      {translate("system_updates_description")}
                    </p>
                  </div>
                  <Switch
                    id="systemUpdates"
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={() => handleNotificationChange('systemUpdates')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                {translate("account_security")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Button variant="outline" className="w-full text-base justify-start h-12">
                  {translate("change_password")}
                </Button>
              </div>
              <div>
                <Button variant="outline" className="w-full text-base justify-start h-12">
                  {translate("update_email")}
                </Button>
              </div>
              <div>
                <Button variant="outline" className="w-full text-base justify-start h-12">
                  {translate("update_phone")}
                </Button>
              </div>
              <div className="pt-4">
                <Button 
                  variant="destructive" 
                  className="w-full text-base h-12"
                  onClick={() => logout()}
                >
                  {translate("logout")}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-destructive">
                {translate("danger_zone")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Button 
                  variant="outline" 
                  className="w-full text-destructive border-destructive/20 hover:bg-destructive/10"
                >
                  {translate("delete_account")}
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  {translate("delete_account_warning")}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 flex justify-end">
        <Button size="lg" onClick={handleSaveSettings}>
          {translate("save_settings")}
        </Button>
      </div>
    </div>
  );
};

export default Settings;
