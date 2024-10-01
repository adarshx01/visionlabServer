"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress"; // Assuming this is where your Progress component is located

const ComplaintProgressTracker = () => {
  // Define the statuses and the corresponding progress values
  const complaintStatuses = [
    { label: "Complaint Raised", progress: 0 },
    { label: "Complaint Acknowledged", progress: 33 },
    { label: "Action Under Progress", progress: 66 },
    { label: "Issue Resolved", progress: 100 },
  ];

  const [currentStatus, setCurrentStatus] = useState(0); // Start at 0 (Complaint Raised)

  // Function to move to the next status
  const nextStatus = () => {
    if (currentStatus < complaintStatuses.length - 1) {
      setCurrentStatus(currentStatus + 1);
    }
  };

  // Function to get the label and progress for the current status
  const { label, progress } = complaintStatuses[currentStatus];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Complaint Progress Tracker</h1>

      {/* Display current status */}
      <div className="mb-2 text-lg font-semibold text-gray-700">
        Status: {label}
      </div>

      {/* Progress bar */}
      <Progress value={progress} />

      {/* Display action buttons */}
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={nextStatus}
        >
          Next Status
        </button>
      </div>
    </div>
  );
};

export default ComplaintProgressTracker;
