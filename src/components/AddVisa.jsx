import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AddVisa = () => {
    const [visaType, setVisaType] = useState("");
    const [documents, setDocuments] = useState([]);
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (user && user.email) {
        setUserEmail(user.email);
      }
    }, []);
    const handleDocumentChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setDocuments([...documents, value]);
        } else {
            setDocuments(documents.filter((doc) => doc !== value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.addedBy = userEmail;
        data.requiredDocuments = documents;
        //console.log("Form Data:", data);
        fetch('https://visa-navigator-server-five.vercel.app/visa', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    console.log('successfully added');
                    Swal.fire({
                        title: 'Success!',
                        text: 'Visa added successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                    e.target.reset();
                }
            })
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-300 shadow-md rounded-lg my-10">
            <h2 className="text-3xl font-black text-center mb-10 text-gray-700 underline underline-offset-2">Add Visa</h2>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="email" value={userEmail} />
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Country Image</label>
                    <input type="text" name='photo' placeholder="Enter country image" className="input input-bordered w-full" required />

                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Country Name</label>
                    <input type="text" name="countryName" placeholder="Enter country name" className="input input-bordered w-full" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Visa Type</label>
                    <select name="visaType" value={visaType} onChange={(e) => setVisaType(e.target.value)} className="select select-bordered w-full" required>
                        <option value="" disabled>
                            Select visa type
                        </option>
                        <option value="Tourist Visa">Tourist Visa</option>
                        <option value="Student Visa">Student Visa</option>
                        <option value="Official Visa">Official Visa</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Processing Time</label>
                    <input type="text" name="processingTime" placeholder="Enter processing time (e.g., 7 days)" className="input input-bordered w-full" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Required Documents</label>
                    <div className="flex gap-4 text-gray-700">
                        <label className="flex items-center">
                            <input type="checkbox" value="Valid Passport" onChange={handleDocumentChange} className="checkbox checkbox-primary" />
                            <span className="ml-2">Valid Passport</span>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" value="Visa Application Form" onChange={handleDocumentChange} className="checkbox checkbox-primary" />
                            <span className="ml-2">Visa Application Form</span>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" value="Recent Passport-sized Photograph" onChange={handleDocumentChange} className="checkbox checkbox-primary" />
                            <span className="ml-2">Recent Passport-sized Photograph</span>
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea name="description" placeholder="Provide a brief description of the visa" className="textarea textarea-bordered w-full" rows="4" required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Age Restriction</label>
                    <input type="number" name="ageRestriction" placeholder="Enter age restriction (if any)" className="input input-bordered w-full" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Fee</label>
                    <input type="number" name="fee" placeholder="Enter visa fee" className="input input-bordered w-full" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Validity</label>
                    <input type="text" name="validity" placeholder="Enter validity period (e.g., 1 year)" className="input input-bordered w-full" required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Application Method</label>
                    <input type="text" name="applicationMethod" placeholder="Enter application method (e.g., Online)" className="input input-bordered w-full" required />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                        Add Visa
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddVisa;
