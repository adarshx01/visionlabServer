'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ClientPageCLS = ({ videos }) => {
  const [popupVideo, setPopupVideo] = useState(null);
  const router = useRouter();

  console.log("Client received videos:", videos);

  const handleThumbnailClick = (video) => {
    setPopupVideo(video);
  };
  
  const closePopup = () => {
    setPopupVideo(null);
  };

  // Helper function to extract video ID safely
  const extractVideoId = (video) => {
    if (!video) return null;
    
    // Get the URL from video object or use video directly if it's a string
    const videoUrl = typeof video === 'object' && video.url ? video.url : 
                    typeof video === 'string' ? video : null;
    
    if (!videoUrl || typeof videoUrl !== 'string') {
      console.error('Invalid video format:', video);
      return null;
    }
    
    try {
      if (videoUrl.includes('v=')) {
        return videoUrl.split('v=')[1].split('&')[0]; // Handle additional parameters
      } else if (videoUrl.includes('youtu.be/')) {
        return videoUrl.split('youtu.be/')[1].split('?')[0]; // Handle short URLs
      } else {
        console.warn('Unrecognized YouTube URL format:', videoUrl);
        return null;
      }
    } catch (error) {
      console.error('Error extracting video ID:', error);
      return null;
    }
  };

  // Get course name
  const getCourseName = () => {
    if (videos.length && videos[0].courseName) {
      return videos[0].courseName;
    } else {
      return "Course";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">
        Videos for {getCourseName()}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video, index) => {
          const videoId = extractVideoId(video);
          if (!videoId) return null; // Skip invalid videos
          
          const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
          
          return (
            <div
              key={video.key || index}
              className="relative group cursor-pointer"
              onClick={() => handleThumbnailClick(video)}
            >
              <img
                src={thumbnailUrl}
                alt={video.title || `Video ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg transition-transform transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300 rounded-lg">
                <span className="text-white text-xl">Play Video</span>
              </div>
            </div>
          );
        })}
      </div>

      {popupVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white p-4 rounded-lg w-3/4 sm:w-1/2 lg:w-1/3"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${extractVideoId(popupVideo)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientPageCLS;