
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNotifications } from "@/contexts/NotificationsContext";
import { 
  BriefcaseBusiness, 
  Clock, 
  CheckCircle, 
  XCircle, 
  MapPin, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Mock data
const mockData = {
  jobsApplied: 12,
  interviewsScheduled: 3,
  jobsAccepted: 2,
  upcomingInterviews: [
    {
      id: "1",
      title: "Construction Worker",
      company: "ABC Construction",
      location: "Mumbai, Maharashtra",
      date: "2023-05-15T10:00:00",
      status: "confirmed"
    },
    {
      id: "2",
      title: "Plumber",
      company: "City Plumbing Services",
      location: "Delhi, NCR",
      date: "2023-05-17T14:30:00",
      status: "pending"
    }
  ],
  recentApplications: [
    {
      id: "3",
      title: "Painter",
      company: "Rainbow Painters",
      location: "Bangalore, Karnataka",
      appliedDate: "2023-05-10T09:15:00",
      status: "under_review"
    },
    {
      id: "4",
      title: "Electrician Helper",
      company: "Bright Electric Co.",
      location: "Chennai, Tamil Nadu",
      appliedDate: "2023-05-09T11:30:00",
      status: "rejected"
    },
    {
      id: "5",
      title: "Gardener",
      company: "Green Gardens Inc.",
      location: "Hyderabad, Telangana",
      appliedDate: "2023-05-08T16:45:00",
      status: "selected"
    }
  ],
  nearbyJobs: [
    {
      id: "6",
      title: "Housekeeping Staff",
      company: "Luxury Hotel",
      location: "2.5 km away",
      salary: "₹15,000 - ₹18,000/month",
      posted: "2 days ago"
    },
    {
      id: "7",
      title: "Security Guard",
      company: "Secure Facilities Ltd.",
      location: "3.2 km away",
      salary: "₹16,000/month",
      posted: "1 day ago"
    },
    {
      id: "8",
      title: "Delivery Person",
      company: "FastDelivery",
      location: "1.8 km away",
      salary: "₹18,000 - ₹22,000/month",
      posted: "Just now"
    }
  ]
};

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { translate } = useLanguage();
  const { addNotification } = useNotifications();

  // Simulate receiving a notification when the dashboard loads
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification({
        title: "New jobs in your area!",
        message: "5 new jobs matching your skills were posted nearby.",
        type: "job",
        link: "/jobs"
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [addNotification]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "confirmed":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Confirmed</span>;
      case "pending":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>;
      case "under_review":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Under Review</span>;
      case "selected":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Selected</span>;
      case "rejected":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Rejected</span>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      weekday: 'short',
      day: 'numeric', 
      month: 'short',
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {translate("welcome_back")}, {currentUser?.displayName || translate("worker")}!
      </h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary/10 mr-4">
                <BriefcaseBusiness className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {translate("jobs_applied")}
                </p>
                <h3 className="text-3xl font-bold">{mockData.jobsApplied}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary/10 mr-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {translate("interviews_scheduled")}
                </p>
                <h3 className="text-3xl font-bold">{mockData.interviewsScheduled}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary/10 mr-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {translate("jobs_accepted")}
                </p>
                <h3 className="text-3xl font-bold">{mockData.jobsAccepted}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Success Rate */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{translate("success_rate")}</CardTitle>
          <CardDescription>
            {translate("success_rate_description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">
                  {translate("application_success")}
                </span>
                <span className="text-sm font-medium">
                  {Math.round((mockData.jobsAccepted / mockData.jobsApplied) * 100)}%
                </span>
              </div>
              <Progress value={(mockData.jobsAccepted / mockData.jobsApplied) * 100} />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">
                  {translate("interview_conversion")}
                </span>
                <span className="text-sm font-medium">
                  {Math.round((mockData.interviewsScheduled / mockData.jobsApplied) * 100)}%
                </span>
              </div>
              <Progress value={(mockData.interviewsScheduled / mockData.jobsApplied) * 100} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Interviews */}
        <Card>
          <CardHeader>
            <CardTitle>{translate("upcoming_interviews")}</CardTitle>
            <CardDescription>
              {translate("be_prepared")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mockData.upcomingInterviews.length > 0 ? (
              <div className="space-y-4">
                {mockData.upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-start p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="font-semibold">{interview.title}</h4>
                        <div className="ml-2">
                          {getStatusBadge(interview.status)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{interview.company}</p>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <MapPin size={14} className="mr-1" />
                        <span>{interview.location}</span>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        <span>{formatDate(interview.date)}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      {translate("details")}
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-6">
                {translate("no_upcoming_interviews")}
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Link to="/applications" className="w-full">
              <Button variant="outline" className="w-full">
                {translate("view_all_applications")}
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>{translate("recent_applications")}</CardTitle>
            <CardDescription>
              {translate("your_recent_job_applications")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mockData.recentApplications.length > 0 ? (
              <div className="space-y-4">
                {mockData.recentApplications.map((application) => (
                  <div key={application.id} className="flex items-start p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="font-semibold">{application.title}</h4>
                        <div className="ml-2">
                          {getStatusBadge(application.status)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{application.company}</p>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <MapPin size={14} className="mr-1" />
                        <span>{application.location}</span>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        <span>Applied: {formatDate(application.appliedDate)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-6">
                {translate("no_recent_applications")}
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Link to="/applications" className="w-full">
              <Button variant="outline" className="w-full">
                {translate("view_all_applications")}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      
      {/* Nearby Jobs */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{translate("nearby_jobs")}</h2>
          <Link to="/jobs">
            <Button variant="outline" className="flex items-center">
              <span className="mr-2">{translate("view_all")}</span>
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockData.nearbyJobs.map((job) => (
            <Card key={job.id}>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin size={14} className="mr-1" />
                  <span>{job.location}</span>
                </div>
                <p className="text-sm font-medium">{job.salary}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-500">{job.posted}</span>
                  <Link to={`/jobs/${job.id}`}>
                    <Button size="sm">
                      {translate("view_job")}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
