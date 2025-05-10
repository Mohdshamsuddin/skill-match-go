
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  ClipboardCheck,
  ClipboardList,
  CheckCircle2,
  XCircle,
  Search,
  Building,
  MessageCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock application data
const mockApplications = [
  {
    id: "1",
    jobId: "1",
    jobTitle: "Construction Helper",
    company: "ABC Builders",
    location: "Mumbai, Maharashtra",
    appliedDate: "2023-05-12T08:30:00",
    status: "under_review",
    feedback: null,
    interviewDate: null
  },
  {
    id: "2",
    jobId: "2",
    jobTitle: "Plumber",
    company: "City Plumbing Services",
    location: "Delhi, NCR",
    appliedDate: "2023-05-10T14:15:00",
    status: "selected",
    feedback: "Your experience with residential plumbing systems is a good match for our needs.",
    interviewDate: "2023-05-17T14:30:00"
  },
  {
    id: "3",
    jobId: "3",
    jobTitle: "Domestic Helper",
    company: "Private Household",
    location: "Bangalore, Karnataka",
    appliedDate: "2023-05-08T09:45:00",
    status: "rejected",
    feedback: "We found someone who lives closer to the location.",
    interviewDate: null
  },
  {
    id: "4",
    jobId: "4",
    jobTitle: "Security Guard",
    company: "Secure Facilities Ltd.",
    location: "Chennai, Tamil Nadu",
    appliedDate: "2023-05-11T16:20:00",
    status: "interview_scheduled",
    feedback: "We're impressed with your background. Let's discuss further.",
    interviewDate: "2023-05-15T10:00:00"
  }
];

const ApplicationStatus = () => {
  const { translate } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const [applications, setApplications] = useState(mockApplications);
  
  // Filter applications based on active tab
  const filteredApplications = applications.filter(app => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return app.status === "under_review";
    if (activeTab === "scheduled") return app.status === "interview_scheduled";
    if (activeTab === "selected") return app.status === "selected";
    if (activeTab === "rejected") return app.status === "rejected";
    return true;
  });
  
  // Calculate statistics
  const totalApplications = applications.length;
  const underReviewCount = applications.filter(app => app.status === "under_review").length;
  const interviewCount = applications.filter(app => app.status === "interview_scheduled").length;
  const selectedCount = applications.filter(app => app.status === "selected").length;
  const rejectedCount = applications.filter(app => app.status === "rejected").length;
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "under_review":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Under Review</Badge>;
      case "interview_scheduled":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Interview Scheduled</Badge>;
      case "selected":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Selected</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      default:
        return null;
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "under_review":
        return <ClipboardList className="h-5 w-5 text-blue-600" />;
      case "interview_scheduled":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "selected":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{translate("application_status")}</h1>
      
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="bg-gray-100 p-3 rounded-full mr-4">
                <ClipboardCheck className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{translate("total")}</p>
                <h3 className="text-xl font-bold">{totalApplications}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <ClipboardList className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{translate("under_review")}</p>
                <h3 className="text-xl font-bold">{underReviewCount}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{translate("interviews")}</p>
                <h3 className="text-xl font-bold">{interviewCount}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{translate("selected")}</p>
                <h3 className="text-xl font-bold">{selectedCount}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Success Rate */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{translate("application_success_rate")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">
                {translate("success_rate")}
              </span>
              <span className="text-sm font-medium">
                {totalApplications > 0 ? Math.round((selectedCount / totalApplications) * 100) : 0}%
              </span>
            </div>
            <Progress value={totalApplications > 0 ? (selectedCount / totalApplications) * 100 : 0} />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">
                {translate("interview_rate")}
              </span>
              <span className="text-sm font-medium">
                {totalApplications > 0 ? Math.round((interviewCount / totalApplications) * 100) : 0}%
              </span>
            </div>
            <Progress value={totalApplications > 0 ? (interviewCount / totalApplications) * 100 : 0} />
          </div>
        </CardContent>
      </Card>
      
      {/* Applications List */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="all">{translate("all")}</TabsTrigger>
          <TabsTrigger value="pending">{translate("under_review")}</TabsTrigger>
          <TabsTrigger value="scheduled">{translate("interviews")}</TabsTrigger>
          <TabsTrigger value="selected">{translate("selected")}</TabsTrigger>
          <TabsTrigger value="rejected">{translate("rejected")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          {filteredApplications.length > 0 ? (
            <div className="space-y-6">
              {filteredApplications.map((application) => (
                <Card key={application.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <Link to={`/jobs/${application.jobId}`}>
                            <h3 className="text-xl font-semibold hover:text-primary">
                              {application.jobTitle}
                            </h3>
                          </Link>
                          {getStatusBadge(application.status)}
                        </div>
                        
                        <div className="flex items-center mt-2">
                          <Building className="h-4 w-4 text-gray-500 mr-2" />
                          <p className="text-gray-700">{application.company}</p>
                        </div>
                        
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                          <p className="text-gray-600">{application.location}</p>
                        </div>
                        
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 text-gray-500 mr-2" />
                          <p className="text-gray-600">
                            {translate("applied_on")}: {new Date(application.appliedDate).toLocaleDateString()}
                          </p>
                        </div>
                        
                        {/* Feedback if available */}
                        {application.feedback && (
                          <div className="mt-4 bg-gray-50 p-3 rounded-md">
                            <p className="text-sm font-medium mb-1">{translate("employer_feedback")}:</p>
                            <p className="text-sm text-gray-600">{application.feedback}</p>
                          </div>
                        )}
                        
                        {/* Interview date if scheduled */}
                        {application.interviewDate && (
                          <div className="mt-4 bg-yellow-50 p-3 rounded-md">
                            <p className="text-sm font-medium mb-1">{translate("interview_scheduled")}:</p>
                            <p className="text-sm text-gray-800">
                              {new Date(application.interviewDate).toLocaleString()}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-start md:items-end gap-2">
                        <div className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-100">
                          {getStatusIcon(application.status)}
                        </div>
                        
                        <div className="flex gap-2 mt-2">
                          <Link to={`/jobs/${application.jobId}`}>
                            <Button variant="outline" size="sm">
                              {translate("view_job")}
                            </Button>
                          </Link>
                          
                          {application.status === "interview_scheduled" && (
                            <Button size="sm">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {translate("contact")}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <Search className="h-12 w-12 text-gray-400 mx-auto" />
              <h2 className="mt-4 text-xl font-semibold">{translate("no_applications_found")}</h2>
              <p className="text-gray-500 mt-2">{translate("no_applications_description")}</p>
              <Link to="/jobs">
                <Button className="mt-6">
                  {translate("browse_jobs")}
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApplicationStatus;
