import ClientPageCLS from "./ClientPage";
import { db } from "@/lib/firebase";
import { ref, get, set, push } from "firebase/database";

export default async function Page({
  params,
}: {
  params: { id: string }; // Changed from course/level to id
}) {
  const { id } = params; // Now extracting the id parameter
  console.log("Classroom ID:", id);
  
  // Reference to the video collection with id as the classroom identifier
  const videoRef = ref(db, `classroom/${id}`);
  
  // Try to get existing data
  const snapshot = await get(videoRef);
  let videos = [];
  
  if (snapshot.exists()) {
    // Collection exists, get the videos
    const videoData = snapshot.val();
    
    // Transform the data to include keys and handle nested structure
    videos = Object.entries(videoData).map(([key, value]) => {
      // If the value is an object with url property, return it with the key
      if (typeof value === 'object' && value !== null && value.url) {
        return { ...value, key };
      } 
      // If it's an object but doesn't have url directly (nested structure)
      else if (typeof value === 'object' && value !== null) {
        // Look inside for the actual video data
        const nestedData = Object.values(value)[0];
        if (nestedData && typeof nestedData === 'object' && nestedData.url) {
          return { ...nestedData, key };
        }
      }
      // If it's just a URL string
      return { url: value, key, classroomId: id };
    }).filter(Boolean); // Remove any undefined values
  } else {
    // Collection doesn't exist, create an initial structure
    console.log(`Collection classroom/${id} doesn't exist. Creating it now.`);
    
    // Create a new entry with push() to get a proper Firebase key
    const newVideoRef = push(videoRef);
    const initialData = {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      classroomId: id,
      title: `Classroom ${id} Introduction`,
      dateAdded: new Date().toISOString()
    };
    
    // Add the data
    await set(newVideoRef, initialData);
    
    // Use the initial data for videos with the key
    videos = [{ ...initialData, key: newVideoRef.key }];
  }
  
  return <ClientPageCLS videos={videos} />;
}