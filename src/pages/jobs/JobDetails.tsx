
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNotifications } from "@/contexts/NotificationsContext";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Briefcase, 
  DollarSign, 
  Bookmark, 
  Building,
  Share2,
  ArrowLeft,
  Phone,
  MessageCircle,
  Mic,
  CheckCircle,
  AlertCircle,
  BookmarkCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

// Mock job details
const mockJobs = [
  {
    id: "1",
    title: "Construction Helper",
    company: "ABC Builders",
    location: "Mumbai, Maharashtra",
    address: "123 Construction Site, Andheri East, Mumbai",
    distance: "2.5 km",
    salary: "₹600 per day",
    postedTime: "2 hours ago",
    postedDate: "2023-05-12",
    type: "Daily Wage",
    category: "Construction",
    skills: ["Physical Labor", "Lifting", "Basic Construction"],
    description: "We need helpers for a construction site. Daily wage basis with possibility of extension. Job responsibilities include carrying construction materials, assisting skilled workers, site cleaning, and other general tasks. Must be physically fit and able to work in outdoor conditions.",
    requirements: [
      "Physically fit and able to lift heavy objects",
      "Previous construction site experience preferred",
      "Ability to follow instructions",
      "Availability for full day work (8AM - 5PM)"
    ],
    benefits: [
      "Daily payment",
      "Lunch provided",
      "Transport allowance for workers from far areas"
    ],
    duration: "15 days",
    startDate: "2023-05-20",
    applyBy: "2023-05-15",
    openings: 5,
    contactPerson: "Rajesh Sharma",
    contactPhone: "+91 98765 43210",
    mapUrl: "https://maps.google.com/?q=19.1136,72.8697",
    companyInfo: "ABC Builders is a leading construction company with over 15 years of experience in residential and commercial projects."
  },
  {
    id: "2",
    title: "Plumber",
    company: "City Plumbing Services",
    location: "Delhi, NCR",
    address: "45 Service Complex, Rohini, Delhi",
    distance: "4.1 km",
    salary: "₹800 per day",
    postedTime: "1 day ago",
    postedDate: "2023-05-11",
    type: "Contract",
    category: "Plumbing",
    skills: ["Pipe Fitting", "Repairs", "Water Systems"],
    description: "Experienced plumber needed for residential repairs and installations. Responsibilities include installing fixtures, repairing leaks, maintaining water systems, and ensuring compliance with local regulations.",
    requirements: [
      "At least 2 years of plumbing experience",
      "Knowledge of plumbing tools and techniques",
      "Ability to read blueprints and specifications",
      "Good problem-solving skills"
    ],
    benefits: [
      "Competitive daily wage",
      "Tools provided",
      "Transport allowance"
    ],
    duration: "3 months",
    startDate: "2023-05-25",
    applyBy: "2023-05-20",
    openings: 2,
    contactPerson: "Amit Kumar",
    contactPhone: "+91 87654 32109",
    mapUrl: "https://maps.google.com/?q=28.7041,77.1025",
    companyInfo: "City Plumbing Services provides quality plumbing solutions for residential and commercial properties across Delhi NCR."
  },
];

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { translate } = useLanguage();
  const { addNotification } = useNotifications();
  const [isSaved, setIsSaved] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [applicationNote, setApplicationNote] = useState("");
  const [recording, setRecording] = useState(false);
  const [applied, setApplied] = useState(false);
  
  const job = mockJobs.find(job => job.id === id);
  
  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">{translate("job_not_found")}</h2>
          <p className="text-gray-600 mb-6">{translate("job_not_found_description")}</p>
          <Link to="/jobs">
            <Button>
              {translate("back_to_jobs")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleBookmark = () => {
    setIsSaved(!isSaved);
    
    if (!isSaved) {
      toast.success(translate("job_saved"));
      
      addNotification({
        title: "Job Saved",
        message: `You saved "${job.title}" to your bookmarks.`,
        type: "job",
        link: "/saved-jobs"
      });
    } else {
      toast.info(translate("job_unsaved"));
    }
  };
  
  const handleApply = () => {
    setIsApplying(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsApplying(false);
      setApplied(true);
      
      toast.success(translate("application_submitted"));
      
      addNotification({
        title: "Application Submitted",
        message: `You applied for "${job.title}" at ${job.company}.`,
        type: "application",
        link: "/applications"
      });
    }, 1500);
  };
  
  const startVoiceRecording = () => {
    setRecording(true);
    toast.info("Recording started...");
    
    // Simulate recording process
    setTimeout(() => {
      setRecording(false);
      setApplicationNote("I am interested in this job and have 3 years of experience in similar roles. I am available to start immediately and can work the required hours.");
      toast.success("Voice recording converted to text!");
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Link to="/jobs" className="flex items-center text-primary hover:text-primary/80">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {translate("back_to_jobs")}
        </Link>
      </div>
      
      {/* Job Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <p className="text-xl text-gray-700 mt-1">{job.company}</p>
            
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-y-2 sm:gap-x-4 mt-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="mr-2 h-5 w-5" />
                <span>{job.location} ({job.distance})</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Briefcase className="mr-2 h-5 w-5" />
                <span>{job.type}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <DollarSign className="mr-2 h-5 w-5" />
                <span>{job.salary}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Clock className="mr-2 h-5 w-5" />
                <span>{job.postedTime}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleBookmark}
              className={isSaved ? "bg-secondary/10 text-secondary" : ""}
            >
              {isSaved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
            </Button>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => {
                toast.success("Job link copied to clipboard!");
                navigator.clipboard.writeText(window.location.href);
              }}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Apply Button */}
        <div className="mt-6">
          {applied ? (
            <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 cursor-default" size="lg" disabled>
              <CheckCircle className="mr-2 h-5 w-5" />
              {translate("applied")}
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto" size="lg">
                  {translate("apply_now")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{translate("apply_for")} {job.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <h4 className="font-medium mb-1">{job.company}</h4>
                    <p className="text-sm text-gray-500">{job.location}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {translate("application_note")}
                    </label>
                    <div className="relative">
                      <Textarea 
                        value={applicationNote}
                        onChange={(e) => setApplicationNote(e.target.value)}
                        placeholder={translate("application_note_placeholder")}
                        className="min-h-[120px]"
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute bottom-2 right-2 h-8 w-8 rounded-full p-0"
                        onClick={startVoiceRecording}
                        disabled={recording}
                      >
                        {recording ? <Spinner size="sm" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {translate("voice_note_tip")}
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">{translate("cancel")}</Button>
                  </DialogClose>
                  <Button 
                    onClick={handleApply} 
                    disabled={isApplying}
                  >
                    {isApplying ? (
                      <>
                        <Spinner size="sm" className="mr-2" />
                        {translate("applying")}
                      </>
                    ) : translate("submit_application")}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      
      {/* Job Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>{translate("job_description")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{job.description}</p>
              
              <div>
                <h3 className="font-semibold mb-2">{translate("requirements")}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">{translate("benefits")}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {job.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">{translate("skills_required")}</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <Badge key={index}>{skill}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Company Info */}
          <Card>
            <CardHeader>
              <CardTitle>{translate("company_information")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{job.company}</h3>
                  <p className="text-gray-600 mt-2">{job.companyInfo}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Job Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{translate("job_summary")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Calendar className="text-gray-500 mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">{translate("posted_on")}</p>
                  <p className="font-medium">{new Date(job.postedDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="text-gray-500 mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">{translate("apply_by")}</p>
                  <p className="font-medium">{new Date(job.applyBy).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="text-gray-500 mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">{translate("start_date")}</p>
                  <p className="font-medium">{new Date(job.startDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="text-gray-500 mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">{translate("duration")}</p>
                  <p className="font-medium">{job.duration}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Briefcase className="text-gray-500 mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">{translate("openings")}</p>
                  <p className="font-medium">{job.openings} positions</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin className="text-gray-500 mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">{translate("location")}</p>
                  <p className="font-medium">{job.address}</p>
                </div>
              </div>
              
              <div className="pt-4">
                <a 
                  href={job.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full block"
                >
                  <Button className="w-full">
                    {translate("view_on_map")}
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
          
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>{translate("contact_information")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{job.contactPerson}</p>
              
              <div className="mt-4 space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="mr-2 h-5 w-5" />
                  {job.contactPhone}
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {translate("send_message")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
