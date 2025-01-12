"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { db } from '../../lib/firebase';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, User, MapPin, Calendar, Clock, FileText, UserX, CheckCircle } from 'lucide-react';

const statusColors = {
  "Complaint Raised": "bg-yellow-500",
  "Under Investigation": "bg-blue-500",
  "Action Under Progress": "bg-purple-500",
  "Issue Resolved": "bg-green-500",
  "Closed": "bg-gray-500"
};

const ComplaintList = ({ complaints, onComplaintClick, selectedComplaint }) => (
  <Card className="h-[calc(100vh-12rem)] overflow-y-auto">
    <CardHeader>
      <CardTitle className="text-xl font-bold">Complaints</CardTitle>
    </CardHeader>
    <CardContent>
      {complaints.length === 0 ? (
        <p className="text-center text-gray-500">No complaints found.</p>
      ) : (
        <ul className="space-y-3">
          {complaints.map((complaint) => (
            <li
              key={complaint.id}
              className={`p-4 border rounded-lg cursor-pointer transition duration-200 ${
                selectedComplaint?.id === complaint.id
                  ? "bg-primary/10 border-primary"
                  : "hover:bg-gray-50 border-gray-200"
              }`}
              onClick={() => onComplaintClick(complaint)}
            >
              <div className="flex justify-between items-center">
                <div className="font-medium">{complaint.name}</div>
                <Badge className={`${statusColors[complaint.status]} text-white`}>
                  {complaint.status}
                </Badge>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                ID: {complaint.complaintNumber}
              </div>
            </li>
          ))}
        </ul>
      )}
    </CardContent>
  </Card>
);

const ComplaintDetails = ({ complaint }) => (
  <Card className="h-[calc(100vh-12rem)] overflow-y-auto">
    <CardHeader>
      <CardTitle className="text-xl font-bold">Complaint Details</CardTitle>
    </CardHeader>
    <CardContent>
      {complaint ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{complaint.name}</h2>
          <div className="grid grid-cols-2 gap-4">
            <DetailItem icon={<ClipboardList size={18} />} label="Complaint Number" value={complaint.complaintNumber} />
            <DetailItem icon={<User size={18} />} label="Contact" value={complaint.contact} />
            <DetailItem icon={<MapPin size={18} />} label="Location" value={complaint.location} />
            <DetailItem icon={<Calendar size={18} />} label="Incident Date" value={complaint.incidentDate} />
            <DetailItem icon={<Clock size={18} />} label="Incident Time" value={complaint.incidentTime} />
          </div>
          <DetailItem icon={<FileText size={18} />} label="Description" value={complaint.incidentDescription} />
          <DetailItem icon={<UserX size={18} />} label="Harasser Details" value={complaint.harasserDetails} />
          <DetailItem icon={<CheckCircle size={18} />} label="Preferred Action" value={complaint.preferredAction} />
          <div>
            <strong className="flex items-center gap-2">
              <ClipboardList size={18} /> Status:
            </strong>
            <div className="mt-1">
              <Badge className={`${statusColors[complaint.status]} text-white`}>
                {complaint.status}
              </Badge>
            </div>
          </div>
          <div>
            <strong>Progress:</strong>
            <Progress 
              value={getProgressValue(complaint.status)} 
              className="mt-2"
            />
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          Select a complaint to view details
        </div>
      )}
    </CardContent>
  </Card>
);

const DetailItem = ({ icon, label, value }) => (
  <div>
    <strong className="flex items-center gap-2">
      {icon} {label}:
    </strong>
    <div className="mt-1">{value}</div>
  </div>
);

const getProgressValue = (status) => {
  const progressValues = {
    "Complaint Raised": 25,
    "Under Investigation": 50,
    "Action Under Progress": 75,
    "Issue Resolved": 100,
    "Closed": 100
  };
  return progressValues[status] || 0;
};

const useComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComplaints = async () => {
    try {
      const complaintsCollection = collection(db, "complaints");
      const complaintsQuery = query(complaintsCollection, orderBy("createdAt", "desc"));
      const complaintSnapshot = await getDocs(complaintsQuery);
      const complaintsList = complaintSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComplaints(complaintsList);
    } catch (err) {
      console.error("Error fetching complaints:", err);
      setError("Failed to fetch complaints. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return { complaints, selectedComplaint, setSelectedComplaint, loading, error };
};

export default function ComplaintProgressTracker() {
  const { complaints, selectedComplaint, setSelectedComplaint, loading, error } = useComplaints();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Complaint Progress Tracker</h1>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Complaints</TabsTrigger>
          <TabsTrigger value="active">Active Complaints</TabsTrigger>
          <TabsTrigger value="resolved">Resolved Complaints</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <ComplaintList 
              complaints={complaints} 
              onComplaintClick={setSelectedComplaint} 
              selectedComplaint={selectedComplaint}
            />
            <ComplaintDetails complaint={selectedComplaint} />
          </div>
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <ComplaintList 
              complaints={complaints.filter(c => c.status !== "Issue Resolved" && c.status !== "Closed")} 
              onComplaintClick={setSelectedComplaint} 
              selectedComplaint={selectedComplaint}
            />
            <ComplaintDetails complaint={selectedComplaint} />
          </div>
        </TabsContent>
        <TabsContent value="resolved" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <ComplaintList 
              complaints={complaints.filter(c => c.status === "Issue Resolved" || c.status === "Closed")} 
              onComplaintClick={setSelectedComplaint} 
              selectedComplaint={selectedComplaint}
            />
            <ComplaintDetails complaint={selectedComplaint} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

