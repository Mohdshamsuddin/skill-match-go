
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Search,
  Briefcase,
  Calendar,
  Clock,
  Filter,
  X,
  ChevronDown,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Mock data for job listings
const mockJobs = [
  {
    id: "1",
    title: "Construction Helper",
    company: "ABC Builders",
    location: "Mumbai, Maharashtra",
    distance: "2.5 km",
    salary: "₹600 per day",
    postedTime: "2 hours ago",
    type: "Daily Wage",
    category: "Construction",
    skills: ["Physical Labor", "Lifting", "Basic Construction"],
    description: "We need helpers for a construction site. Daily wage basis with possibility of extension.",
    duration: "15 days",
    applyBy: "2023-05-15"
  },
  {
    id: "2",
    title: "Plumber",
    company: "City Plumbing Services",
    location: "Delhi, NCR",
    distance: "4.1 km",
    salary: "₹800 per day",
    postedTime: "1 day ago",
    type: "Contract",
    category: "Plumbing",
    skills: ["Pipe Fitting", "Repairs", "Water Systems"],
    description: "Experienced plumber needed for residential repairs and installations.",
    duration: "3 months",
    applyBy: "2023-05-20"
  },
  {
    id: "3",
    title: "Domestic Helper",
    company: "Private Household",
    location: "Bangalore, Karnataka",
    distance: "1.2 km",
    salary: "₹15,000 per month",
    postedTime: "Just now",
    type: "Full-time",
    category: "Domestic Help",
    skills: ["Cleaning", "Cooking", "Child Care"],
    description: "Looking for a reliable domestic helper for household chores and occasional child care.",
    duration: "Long Term",
    applyBy: "2023-05-25"
  },
  {
    id: "4",
    title: "Security Guard",
    company: "Secure Facilities Ltd.",
    location: "Chennai, Tamil Nadu",
    distance: "3.7 km",
    salary: "₹16,000 per month",
    postedTime: "3 days ago",
    type: "Full-time",
    category: "Security",
    skills: ["Security Procedures", "Surveillance", "Reporting"],
    description: "Night shift security guard required for a corporate building.",
    duration: "Permanent",
    applyBy: "2023-05-18"
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
    category: "Gardening",
    skills: ["Plant Care", "Lawn Maintenance", "Landscaping"],
    description: "Part-time gardener needed for a residential community. Weekly visits required.",
    duration: "Ongoing",
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
    category: "Delivery",
    skills: ["Driving", "Navigation", "Time Management"],
    description: "Food delivery personnel needed. Must have own two-wheeler. Fuel allowance provided.",
    duration: "Permanent",
    applyBy: "2023-05-22"
  },
];

// Available filter options
const locations = [
  "Mumbai, Maharashtra",
  "Delhi, NCR",
  "Bangalore, Karnataka",
  "Chennai, Tamil Nadu",
  "Hyderabad, Telangana",
  "Pune, Maharashtra",
];

const jobTypes = ["Full-time", "Part-time", "Contract", "Daily Wage"];

const categories = [
  "Construction",
  "Plumbing",
  "Domestic Help",
  "Security",
  "Gardening",
  "Delivery",
  "Electrical",
  "Driving",
  "Cleaning",
  "Factory Work",
];

const JobFeed = () => {
  const { translate } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    distance: "",
    category: "",
    jobType: ""
  });
  const [jobs, setJobs] = useState(mockJobs);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Filter jobs based on search term and filters
  useEffect(() => {
    let filteredJobs = [...mockJobs];
    
    // Apply search filter
    if (searchTerm) {
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply location filter
    if (filters.location) {
      filteredJobs = filteredJobs.filter(job => job.location === filters.location);
    }
    
    // Apply category filter
    if (filters.category) {
      filteredJobs = filteredJobs.filter(job => job.category === filters.category);
    }
    
    // Apply job type filter
    if (filters.jobType) {
      filteredJobs = filteredJobs.filter(job => job.type === filters.jobType);
    }
    
    // Apply distance filter
    if (filters.distance) {
      const maxDistance = parseInt(filters.distance);
      filteredJobs = filteredJobs.filter(job => {
        const jobDistance = parseFloat(job.distance.split(' ')[0]);
        return jobDistance <= maxDistance;
      });
    }
    
    // Apply tab filter
    if (activeTab === "nearby") {
      filteredJobs = filteredJobs.filter(job => {
        const jobDistance = parseFloat(job.distance.split(' ')[0]);
        return jobDistance <= 5;
      });
    } else if (activeTab === "recent") {
      filteredJobs = filteredJobs.filter(job => {
        return job.postedTime.includes("hours") || job.postedTime === "Just now";
      });
    }
    
    setJobs(filteredJobs);
  }, [searchTerm, filters, activeTab]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      distance: "",
      category: "",
      jobType: ""
    });
    setSearchTerm("");
  };

  const hasActiveFilters = () => {
    return Object.values(filters).some(val => val !== "") || searchTerm !== "";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{translate("find_jobs")}</h1>
      
      {/* Search and Filter Bar */}
      <div className="mb-8">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder={translate("search_jobs")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 w-full"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Tabs 
            defaultValue="all" 
            className="w-full"
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="all">{translate("all_jobs")}</TabsTrigger>
              <TabsTrigger value="nearby">{translate("nearby")}</TabsTrigger>
              <TabsTrigger value="recent">{translate("recent")}</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="ml-4 flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                {translate("filter")}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{translate("filter_jobs")}</SheetTitle>
                <SheetDescription>
                  {translate("filter_description")}
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-6 space-y-6">
                {/* Location Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {translate("location")}
                  </label>
                  <Select
                    value={filters.location}
                    onValueChange={(value) => handleFilterChange("location", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={translate("select_location")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="">Any Location</SelectItem>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Distance Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {translate("max_distance")}
                  </label>
                  <Select
                    value={filters.distance}
                    onValueChange={(value) => handleFilterChange("distance", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={translate("select_distance")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="">Any Distance</SelectItem>
                        <SelectItem value="2">Within 2 km</SelectItem>
                        <SelectItem value="5">Within 5 km</SelectItem>
                        <SelectItem value="10">Within 10 km</SelectItem>
                        <SelectItem value="20">Within 20 km</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Job Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {translate("job_category")}
                  </label>
                  <Select
                    value={filters.category}
                    onValueChange={(value) => handleFilterChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={translate("select_category")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="">Any Category</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Job Type Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {translate("job_type")}
                  </label>
                  <Select
                    value={filters.jobType}
                    onValueChange={(value) => handleFilterChange("jobType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={translate("select_job_type")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="">Any Type</SelectItem>
                        {jobTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <SheetFooter className="flex-row space-x-4 sm:space-x-0">
                <Button variant="outline" onClick={clearFilters}>
                  {translate("clear")}
                </Button>
                <SheetClose asChild>
                  <Button>{translate("apply_filters")}</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Active Filters */}
        {hasActiveFilters() && (
          <div className="flex flex-wrap items-center mt-4 gap-2">
            <span className="text-sm font-medium text-gray-700">
              {translate("active_filters")}:
            </span>
            
            {searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1">
                Search: {searchTerm}
                <button 
                  onClick={() => setSearchTerm("")}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              </Badge>
            )}
            
            {filters.location && (
              <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1">
                Location: {filters.location}
                <button 
                  onClick={() => handleFilterChange("location", "")}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              </Badge>
            )}
            
            {filters.distance && (
              <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1">
                Distance: Within {filters.distance} km
                <button 
                  onClick={() => handleFilterChange("distance", "")}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              </Badge>
            )}
            
            {filters.category && (
              <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1">
                Category: {filters.category}
                <button 
                  onClick={() => handleFilterChange("category", "")}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              </Badge>
            )}
            
            {filters.jobType && (
              <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1">
                Type: {filters.jobType}
                <button 
                  onClick={() => handleFilterChange("jobType", "")}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              </Badge>
            )}
            
            <button 
              onClick={clearFilters}
              className="text-sm text-primary font-medium hover:text-primary/80"
            >
              {translate("clear_all")}
            </button>
          </div>
        )}
      </div>
      
      {/* Job Listings */}
      <div className="space-y-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Link to={`/jobs/${job.id}`} key={job.id}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
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
                          <Clock size={16} className="mr-1" />
                          <span>{job.postedTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0">
                      <p className="text-lg font-semibold text-right">{job.salary}</p>
                      <p className="text-sm text-gray-500 text-right">
                        {translate("duration")}: {job.duration}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-gray-700 line-clamp-2">{job.description}</p>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {translate("apply_by")}: {new Date(job.applyBy).toLocaleDateString()}
                    </p>
                    
                    <Button>
                      {translate("view_details")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="text-center py-12 border rounded-lg bg-gray-50">
            <p className="text-xl font-medium text-gray-600">
              {translate("no_jobs_found")}
            </p>
            <p className="text-gray-500 mt-2">
              {translate("try_different_filters")}
            </p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              {translate("clear_filters")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobFeed;
