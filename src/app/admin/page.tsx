// 'use client'

// import { useState, useEffect } from 'react'
// import { collection, getDocs, doc, updateDoc, onSnapshot } from 'firebase/firestore'
// import { db } from '@/lib/firebase'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
// import { Badge } from '@/components/ui/badge'
// import { toast } from '@/components/ui/use-toast'

// const statusOptions = [
//   "Complaint Raised",
//   "Complaint Acknowledged",
//   "Action Under Progress",
//   "Issue Resolved"
// ]

// export default function AdminComplaints() {
//   const [complaints, setComplaints] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const complaintsCollection = collection(db, "complaints")
//     const unsubscribe = onSnapshot(complaintsCollection, (snapshot) => {
//       const complaintsList = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }))
//       setComplaints(complaintsList)
//       setLoading(false)
//     }, (error) => {
//       console.error("Error fetching complaints:", error)
//       toast({
//         title: "Error",
//         description: "Failed to fetch complaints. Please try again later.",
//         variant: "destructive",
//       })
//       setLoading(false)
//     })

//     return () => unsubscribe()
//   }, [])

//   const updateComplaintStatus = async (complaintId, newStatus) => {
//     try {
//       const complaintRef = doc(db, "complaints", complaintId)
//       await updateDoc(complaintRef, { status: newStatus })
//       toast({
//         title: "Status Updated",
//         description: "Complaint status has been successfully updated.",
//       })
//     } catch (error) {
//       console.error("Error updating complaint status:", error)
//       toast({
//         title: "Error",
//         description: "Failed to update complaint status. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Manage Complaints</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>ID</TableHead>
//                 <TableHead>Title</TableHead>
//                 <TableHead>Description</TableHead>
//                 <TableHead>Date Filed</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Action</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {complaints.map((complaint) => (
//                 <TableRow key={complaint.id}>
//                   <TableCell className="font-medium">{complaint.id}</TableCell>
//                   <TableCell>{complaint.title}</TableCell>
//                   <TableCell>{complaint.description}</TableCell>
//                   <TableCell>{new Date(complaint.dateFiled).toLocaleDateString()}</TableCell>
//                   <TableCell>
//                     <Badge variant={complaint.status === "Issue Resolved" ? "success" : "default"}>
//                       {complaint.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <Select
//                       value={complaint.status}
//                       onValueChange={(value) => updateComplaintStatus(complaint.id, value)}
//                     >
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Update Status" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {statusOptions.map((status) => (
//                           <SelectItem key={status} value={status}>
//                             {status}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

