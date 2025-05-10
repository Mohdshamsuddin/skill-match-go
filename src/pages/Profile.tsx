
import { useState, useRef, ChangeEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNotifications } from "@/contexts/NotificationsContext";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { X, Plus, Upload, User } from "lucide-react";

// Mock list of available skills
const AVAILABLE_SKILLS = [
  "Masonry", "Plumbing", "Electrical Work", "Carpentry", "Painting",
  "Welding", "Gardening", "Cleaning", "Driving", "Security",
  "Cooking", "Housekeeping", "Laundry", "Child Care", "Elder Care",
  "Machine Operation", "Loading/Unloading", "Warehouse Work", "Delivery",
  "Construction Labor", "Agricultural Labor", "Factory Work"
];

const Profile = () => {
  const { currentUser, updateUserProfile, loading } = useAuth();
  const { translate } = useLanguage();
  const { addNotification } = useNotifications();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const idProofInputRef = useRef<HTMLInputElement>(null);
  
  const [profileData, setProfileData] = useState({
    displayName: currentUser?.displayName || "",
    phoneNumber: currentUser?.phoneNumber || "",
    age: "",
    gender: "",
    address: "",
    skills: [] as string[],
    experience: "",
    photoURL: currentUser?.photoURL || "",
    idProof: "",
    idProofType: "aadhar",
    education: "",
    languages: [] as string[]
  });
  
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [availableLanguages] = useState([
    "English", "Hindi", "Tamil", "Telugu", "Bengali", "Kannada", 
    "Malayalam", "Marathi", "Gujarati", "Punjabi", "Urdu"
  ]);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target) {
          setProfileData(prev => ({
            ...prev,
            photoURL: event.target?.result as string
          }));
        }
      };
      
      reader.readAsDataURL(file);
      toast.success(translate("photo_uploaded"));
    }
  };
  
  const handleIdProofUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // In a real app, you'd upload this to storage
      setProfileData(prev => ({
        ...prev,
        idProof: file.name
      }));
      toast.success(translate("id_proof_uploaded"));
    }
  };
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const addSkill = () => {
    if (selectedSkill && !profileData.skills.includes(selectedSkill)) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, selectedSkill]
      }));
      setSelectedSkill("");
    }
  };
  
  const removeSkill = (skill: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };
  
  const addLanguage = () => {
    if (selectedLanguage && !profileData.languages.includes(selectedLanguage)) {
      setProfileData(prev => ({
        ...prev,
        languages: [...prev.languages, selectedLanguage]
      }));
      setSelectedLanguage("");
    }
  };
  
  const removeLanguage = (language: string) => {
    setProfileData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== language)
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // In a real app, you would save all fields to the user profile
      await updateUserProfile({
        displayName: profileData.displayName,
        photoURL: profileData.photoURL
      });
      
      addNotification({
        title: "Profile Updated",
        message: "Your profile information has been updated successfully.",
        type: "system"
      });
      
      toast.success(translate("profile_updated"));
    } catch (error) {
      console.error(error);
      toast.error(translate("profile_update_error"));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{translate("profile")}</h1>
      
      <Tabs defaultValue="basic">
        <TabsList className="mb-8">
          <TabsTrigger value="basic">{translate("basic_info")}</TabsTrigger>
          <TabsTrigger value="skills">{translate("skills_experience")}</TabsTrigger>
          <TabsTrigger value="documents">{translate("documents")}</TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSubmit}>
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>{translate("basic_information")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Photo */}
                <div className="flex flex-col items-center mb-6">
                  <div 
                    className="relative w-32 h-32 rounded-full border-2 border-primary mb-4 overflow-hidden bg-gray-100"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {profileData.photoURL ? (
                      <img 
                        src={profileData.photoURL} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User size={64} className="text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <Upload size={24} className="text-white" />
                    </div>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {translate("change_photo")}
                  </Button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handlePhotoUpload}
                  />
                </div>
                
                {/* Name */}
                <div>
                  <Label htmlFor="displayName" className="text-base">
                    {translate("full_name")}
                  </Label>
                  <Input
                    id="displayName"
                    name="displayName"
                    value={profileData.displayName}
                    onChange={handleInputChange}
                    className="mt-1 h-12"
                  />
                </div>
                
                {/* Phone Number */}
                <div>
                  <Label htmlFor="phoneNumber" className="text-base">
                    {translate("phone")}
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleInputChange}
                    className="mt-1 h-12"
                  />
                </div>
                
                {/* Age */}
                <div>
                  <Label htmlFor="age" className="text-base">
                    {translate("age")}
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={profileData.age}
                    onChange={handleInputChange}
                    className="mt-1 h-12"
                    min="18"
                    max="100"
                  />
                </div>
                
                {/* Gender */}
                <div>
                  <Label htmlFor="gender" className="text-base">
                    {translate("gender")}
                  </Label>
                  <select
                    id="gender"
                    name="gender"
                    value={profileData.gender}
                    onChange={handleInputChange}
                    className="mt-1 h-12 w-full rounded-md border border-input px-3 py-2"
                  >
                    <option value="">{translate("select_gender")}</option>
                    <option value="male">{translate("male")}</option>
                    <option value="female">{translate("female")}</option>
                    <option value="other">{translate("other")}</option>
                  </select>
                </div>
                
                {/* Address */}
                <div>
                  <Label htmlFor="address" className="text-base">
                    {translate("address")}
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    className="mt-1"
                    rows={3}
                  />
                </div>
                
                {/* Languages */}
                <div>
                  <Label className="text-base mb-2 block">
                    {translate("languages")}
                  </Label>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {profileData.languages.map((language) => (
                      <Badge key={language} variant="secondary" className="text-sm px-3 py-1 flex items-center">
                        {language}
                        <button 
                          type="button" 
                          className="ml-2 text-gray-500 hover:text-gray-700"
                          onClick={() => removeLanguage(language)}
                        >
                          <X size={14} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="flex-1 rounded-md border border-input h-10 px-3 py-2"
                    >
                      <option value="">{translate("select_language")}</option>
                      {availableLanguages.map((language) => (
                        <option key={language} value={language}>
                          {language}
                        </option>
                      ))}
                    </select>
                    <Button 
                      type="button"
                      onClick={addLanguage}
                      disabled={!selectedLanguage}
                    >
                      <Plus size={16} className="mr-1" />
                      {translate("add")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>{translate("skills_and_experience")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Education */}
                <div>
                  <Label htmlFor="education" className="text-base">
                    {translate("education")}
                  </Label>
                  <select
                    id="education"
                    name="education"
                    value={profileData.education}
                    onChange={handleInputChange}
                    className="mt-1 h-12 w-full rounded-md border border-input px-3 py-2"
                  >
                    <option value="">{translate("select_education")}</option>
                    <option value="none">{translate("no_formal_education")}</option>
                    <option value="primary">{translate("primary")}</option>
                    <option value="middle">{translate("middle")}</option>
                    <option value="secondary">{translate("secondary")}</option>
                    <option value="higher_secondary">{translate("higher_secondary")}</option>
                    <option value="graduate">{translate("graduate")}</option>
                  </select>
                </div>
                
                {/* Skills */}
                <div>
                  <Label className="text-base mb-2 block">
                    {translate("skills")}
                  </Label>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {profileData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-sm px-3 py-1 flex items-center">
                        {skill}
                        <button 
                          type="button" 
                          className="ml-2 text-gray-500 hover:text-gray-700"
                          onClick={() => removeSkill(skill)}
                        >
                          <X size={14} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <select
                      value={selectedSkill}
                      onChange={(e) => setSelectedSkill(e.target.value)}
                      className="flex-1 rounded-md border border-input h-10 px-3 py-2"
                    >
                      <option value="">{translate("select_skill")}</option>
                      {AVAILABLE_SKILLS.map((skill) => (
                        <option key={skill} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </select>
                    <Button 
                      type="button"
                      onClick={addSkill}
                      disabled={!selectedSkill}
                    >
                      <Plus size={16} className="mr-1" />
                      {translate("add")}
                    </Button>
                  </div>
                </div>
                
                {/* Work Experience */}
                <div>
                  <Label htmlFor="experience" className="text-base">
                    {translate("work_experience")}
                  </Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    value={profileData.experience}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder={translate("experience_placeholder")}
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>{translate("documents")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* ID Proof Type */}
                <div>
                  <Label htmlFor="idProofType" className="text-base">
                    {translate("id_proof_type")}
                  </Label>
                  <select
                    id="idProofType"
                    name="idProofType"
                    value={profileData.idProofType}
                    onChange={handleInputChange}
                    className="mt-1 h-12 w-full rounded-md border border-input px-3 py-2"
                  >
                    <option value="aadhar">Aadhar Card</option>
                    <option value="pan">PAN Card</option>
                    <option value="voter">Voter ID</option>
                    <option value="driving">Driving License</option>
                    <option value="passport">Passport</option>
                  </select>
                </div>
                
                {/* ID Proof Upload */}
                <div>
                  <Label className="text-base mb-2 block">
                    {translate("upload_id_proof")}
                  </Label>
                  
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    {profileData.idProof ? (
                      <div>
                        <p className="font-medium">{profileData.idProof}</p>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          className="mt-2"
                          onClick={() => idProofInputRef.current?.click()}
                        >
                          {translate("replace")}
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          {translate("drag_drop_or")}
                        </p>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          className="mt-2"
                          onClick={() => idProofInputRef.current?.click()}
                        >
                          {translate("browse_files")}
                        </Button>
                      </div>
                    )}
                    <input 
                      type="file" 
                      ref={idProofInputRef} 
                      className="hidden" 
                      accept="image/*,.pdf"
                      onChange={handleIdProofUpload}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      {translate("supported_formats")}: JPEG, PNG, PDF
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <div className="mt-8">
            <Button type="submit" size="lg" disabled={loading}>
              {loading ? <Spinner size="sm" className="mr-2" /> : null}
              {translate("save_changes")}
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
};

export default Profile;
