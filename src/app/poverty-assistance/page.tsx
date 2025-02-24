// 'use client'

// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { toast } from "@/components/ui/use-toast"

// export default function PovertyAssistance() {
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     income: '',
//     dependents: '',
//     situation: ''
//   })

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     // Here you would typically send this data to your backend
//     console.log('Submitted data:', formData)
//     toast({
//       title: "Application Submitted",
//       description: "We've received your application and will contact you soon.",
//     })
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   return (
//     <div className="max-w-4xl mx-auto mt-10 px-4">
//       <h1 className="text-3xl font-bold mb-6 text-center">Poverty Assistance Application</h1>
//       <Card>
//         <CardHeader>
//           <CardTitle>Personal Information</CardTitle>
//           <CardDescription>Please provide accurate information to help us assess your situation.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid w-full items-center gap-1.5">
//               <Label htmlFor="name">Full Name</Label>
//               <Input
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="John Doe"
//               />
//             </div>
//             <div className="grid w-full items-center gap-1.5">
//               <Label htmlFor="address">Address</Label>
//               <Input
//                 id="address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 placeholder="123 Main St, City, Country"
//               />
//             </div>
//             <div className="grid w-full items-center gap-1.5">
//               <Label htmlFor="income">Monthly Income</Label>
//               <Input
//                 id="income"
//                 name="income"
//                 value={formData.income}
//                 onChange={handleChange}
//                 placeholder="1000"
//                 type="number"
//               />
//             </div>
//             <div className="grid w-full items-center gap-1.5">
//               <Label htmlFor="dependents">Number of Dependents</Label>
//               <Input
//                 id="dependents"
//                 name="dependents"
//                 value={formData.dependents}
//                 onChange={handleChange}
//                 placeholder="2"
//                 type="number"
//               />
//             </div>
//             <div className="grid w-full items-center gap-1.5">
//               <Label htmlFor="situation">Your Situation</Label>
//               <Textarea
//                 id="situation"
//                 name="situation"
//                 value={formData.situation}
//                 onChange={handleChange}
//                 placeholder="Briefly describe your current situation and why you're seeking assistance."
//               />
//             </div>
//           </form>
//         </CardContent>
//         <CardFooter>
//           <Button type="submit" className="w-full">Submit Application</Button>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }

