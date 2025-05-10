
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign, 
  BookmarkCheck,
  SearchX 
} from "lucide-react";
import { toast } from "sonner";

// Mock saved jobs
const mockSavedJobs = [
  {
    id: "2",
    title: "Plumber",
    company: "City Plumbing Services",
    location: "Delhi, NCR",
    distance: "4.1 km",
    salary: "₹800 per day",
    postedTime: "1 day ago",
    type: "Contract",
    savedAt: "2023-05-12T10:30:00",
    applyBy: "2023-05-20"
  },
  {
    id: "5",
    title: "Gardener",
    company: "Green Gardens Inc.",
    location: "Hyderabad, Telangana",
    distance: "5.5 km",
    salary: "₹500 per day",
    postedTime: "5 days ago",
    type: "Part-time",
    savedAt: "2023-05-11T16:45:00",
    applyBy: "2023-05-30"
  },
  {
    id: "6",
    title: "Delivery Person",
    company: "FastDelivery",
    location: "Pune, Maharashtra",
    distance: "2.0 km",
    salary: "₹18,000 - ₹22,000 per month",
    postedTime: "4 hours ago",
    type: "Full-time",
    savedAt: "2023-05-12T09:15:00",
    applyBy: "2023-05-22"
  }
];

const SavedJobs = () => {
  const { translate } = useLanguage();
  const [savedJobs, setSavedJobs] = useState(mockSavedJobs);

  const handleRemoveSavedJob = (id: string) => {
    setSavedJobs(savedJobs.filter(job => job.id !== id));
    toast.info(translate("job_removed_from_saved"));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{translate("saved_jobs")}</h1>
      
      {savedJobs.length > 0 ? (
        <div className="space-y-6">
          {savedJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <Link to={`/jobs/${job.id}`}>
                      <h3 className="text-xl font-semibold hover:text-primary">{job.title}</h3>
                    </Link>
                    <p className="text-gray-600">{job.company}</p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 sm:gap-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        <span>{job.location} ({job.distance})</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Briefcase size={16} className="mr-1" />
                        <span>{job.type}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <DollarSign size={16} className="mr-1" />
                        <span>{job.salary}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        <span>{job.postedTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-0 flex flex-col items-end">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <BookmarkCheck size={16} className="mr-1" />
                      <span>{translate("saved_on")} {new Date(job.savedAt).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleRemoveSavedJob(job.id)}
                      >
                        {translate("remove")}
                      </Button>
                      
                      <Link to={`/jobs/${job.id}`}>
                        <Button size="sm">
                          {translate("view_details")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
                  <p className="text-gray-500">
                    {translate("apply_by")}: {new Date(job.applyBy).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="flex justify-center">
            <SearchX className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mt-4">{translate("no_saved_jobs")}</h2>
          <p className="text-gray-600 mt-2 max-w-md mx-auto">
            {translate("no_saved_jobs_description")}
          </p>
          <Link to="/jobs" className="mt-6 inline-block">
            <Button>
              {translate("browse_jobs")}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
