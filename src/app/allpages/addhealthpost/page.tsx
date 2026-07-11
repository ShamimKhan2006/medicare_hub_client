// "use client"

// import React from 'react';
// import {Check} from "@gravity-ui/icons";
// import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
// const Addhealthpost = () => {

//        const handleSubmit= async(e: React.FormEvent<HTMLFormElement>)=>{
//         e.preventDefault()
//        const formData=new FormData(e.currentTarget);
//        const newData=Object.fromEntries(formData.entries());
       
//      const res=await fetch(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/addHealthPost`,{
//         method:'POST',
//         headers:{
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             // Add your health post data here
//             ...newData
//         })
//     });
//     const data=await res.json();
//     console.log("data",data);
// } 
//     return (
//         <div>
//            <Form
//         className="flex w-96 flex-col gap-4"
//         render={(props) => <form {...props} data-custom="foo" />}
//         onSubmit={handleSubmit}
//       >
//         <TextField
//           isRequired
//           name="doctorName"
//           type="text"
//         >
//           <Label>Doctor name</Label>
//           <Input placeholder="Dr. Sarah Johnson" />
//           <FieldError />
//         </TextField>
 
//         <TextField
//           isRequired
//           name="specialty"
//           type="text"
//         >
//           <Label>Specialty</Label>
//           <Input placeholder="Cardiologist" />
//           <FieldError />
//         </TextField>
 
//         <TextField
//           isRequired
//           name="hospital"
//           type="text"
//         >
//           <Label>Hospital</Label>
//           <Input placeholder="Medicare Hub Hospital" />
//           <FieldError />
//         </TextField>
 
//         <TextField
//           isRequired
//           name="experience"
//           type="number"
//           validate={(value) => {
//             if (Number(value) < 0) {
//               return "Experience can't be negative";
//             }
//             return null;
//           }}
//         >
//           <Label>Experience (years)</Label>
//           <Input placeholder="12" />
//           <Description>Number of years practicing</Description>
//           <FieldError />
//         </TextField>
 
//         <TextField
//           isRequired
//           name="location"
//           type="text"
//         >
//           <Label>Location</Label>
//           <Input placeholder="New York, USA" />
//           <FieldError />
//         </TextField>
 
//         <TextField
//           isRequired
//           name="price"
//           type="number"
//           validate={(value) => {
//             if (Number(value) <= 0) {
//               return "Price must be greater than 0";
//             }
//             return null;
//           }}
//         >
//           <Label>Consultation price ($)</Label>
//           <Input placeholder="120" />
//           <FieldError />
//         </TextField>
 
//         <TextField
//           isRequired
//           name="photoUrl"
//           type="url"
//           validate={(value) => {
//             try {
//               new URL(value);
//               return null;
//             } catch {
//               return "Please enter a valid URL";
//             }
//           }}
//         >
//           <Label>Photo URL</Label>
//           <Input placeholder="https://example.com/photo.jpg" />
//           <FieldError />
//         </TextField>
 
//         <div className="flex gap-2">
//           <Button type="submit">
//             <Check />
//             Submit
//           </Button>
//           <Button type="reset" variant="secondary">
//             Reset
//           </Button>
//         </div>
//       </Form>
//         </div>
//     );
// };

// export default Addhealthpost;

"use client"

import React, { useState } from 'react';
import {
  Stethoscope, Building2, Clock, MapPin, DollarSign, Image as ImageIcon,
  HeartPulse, Brain, Bone, Baby, Smile, User, Activity, Eye
} from "lucide-react";
import { toast } from 'react-hot-toast';

const CATEGORIES = [
  { value: "Cardiologist", label: "Cardiology", icon: HeartPulse },
  { value: "Neurologist", label: "Neurology", icon: Brain },
  { value: "Orthopedic", label: "Orthopedic", icon: Bone },
  { value: "Pediatrician", label: "Pediatrics", icon: Baby },
  { value: "Dentist", label: "Dental", icon: Smile },
  { value: "General Physician", label: "General", icon: User },
  { value: "Dermatologist", label: "Dermatology", icon: Activity },
  { value: "Ophthalmologist", label: "Eye care", icon: Eye },
];

const FIELD = "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-teal-600";
const LABEL = "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5";

const Addhealthpost = () => {
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!category) {
      setErrors((prev) => ({ ...prev, category: "Please choose a specialty category" }));
      return;
    }

    const formData = new FormData(e.currentTarget);
    const newData = Object.fromEntries(formData.entries());
    newData.specialty = category;

    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/addHealthPost`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newData }),
      });
      const data = await res.json();
         if(res.ok){
            toast.success('Health post added successfully!');
         }else{
            toast.error(data.message || 'Failed to add health post.');

       
}

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto py-20">
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100">
        {/* top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-teal-600 via-teal-500 to-red-600" />

        <div className="px-8 pt-8 pb-9">
          {/* header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-teal-600 flex items-center justify-center shadow-md shadow-teal-600/30">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Add health post</h2>
              <p className="text-sm text-gray-500">Create a new doctor listing</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className={LABEL}><User className="w-3.5 h-3.5" /> Doctor name</label>
              <input required name="doctorName" type="text" placeholder="Dr. Sarah Johnson" className={FIELD} />
            </div>

            {/* specialty category picker — the unique piece */}
            <div>
              <label className={LABEL}><HeartPulse className="w-3.5 h-3.5" /> Specialty category</label>
              <div className="grid grid-cols-4 gap-2">
                {CATEGORIES.map(({ value, label, icon: Icon }) => {
                  const active = category === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => { setCategory(value); setErrors((p) => ({ ...p, category: "" })); }}
                      className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border py-3 px-1 text-center transition-all ${
                        active
                          ? "border-teal-600 bg-teal-50 shadow-sm ring-1 ring-teal-600"
                          : "border-gray-200 bg-gray-50 hover:border-teal-300 hover:bg-teal-50/40"
                      }`}
                    >
                      <Icon className={`w-4.5 h-4.5 ${active ? "text-teal-700" : "text-gray-500"}`} />
                      <span className={`text-[11px] font-semibold ${active ? "text-teal-800" : "text-gray-600"}`}>
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.category && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.category}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={LABEL}><Building2 className="w-3.5 h-3.5" /> Hospital</label>
                <input required name="hospital" type="text" placeholder="Medicare Hub Hospital" className={FIELD} />
              </div>
              <div>
                <label className={LABEL}><Clock className="w-3.5 h-3.5" /> Experience</label>
                <input required name="experience" type="number" min={0} placeholder="12 yrs" className={FIELD} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={LABEL}><MapPin className="w-3.5 h-3.5" /> Location</label>
                <input required name="location" type="text" placeholder="New York, USA" className={FIELD} />
              </div>
              <div>
                <label className={LABEL}><DollarSign className="w-3.5 h-3.5" /> Price</label>
                <input required name="price" type="number" min={1} placeholder="120" className={FIELD} />
              </div>
            </div>

            <div>
              <label className={LABEL}><ImageIcon className="w-3.5 h-3.5" /> Photo URL</label>
              <input required name="photoUrl" type="url" placeholder="https://example.com/photo.jpg" className={FIELD} />
            </div>

            <div className="flex gap-3 mt-2">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-xl bg-red-600 py-3.5 text-sm font-bold tracking-wide text-white shadow-md shadow-red-600/25 transition-all hover:bg-red-700 active:scale-[0.99] disabled:opacity-60"
              >
                {submitting ? "Publishing..." : "Publish listing"}
              </button>
              <button
                type="reset"
                onClick={() => setCategory("")}
                className="rounded-xl border border-gray-200 px-6 py-3.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addhealthpost;