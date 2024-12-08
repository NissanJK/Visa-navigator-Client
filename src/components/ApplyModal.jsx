import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

const ApplyModal = ({ visa, onClose }) => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && user.email) {
      setUserEmail(user.email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const applicationData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:5000/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire({
            title: 'Success!',
            text: 'Application submitted successfully!',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
        onClose();
      } else {
        toast.error("Failed to submit application. Please try again.");
        console.error("Error:", result);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("An error occurred while submitting the application.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <ToastContainer></ToastContainer>
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Apply for {visa.countryName} Visa</h2>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="visaId" value={visa._id} />
          <input type="hidden" name="visaType" value={visa.visaType} />
          <input type="hidden" name="processingTime" value={visa.processingTime} />
          <input type="hidden" name="validity" value={visa.validity} />
          <input type="hidden" name="applicationMethod" value={visa.applicationMethod} />
          <input type="hidden" name="photo" value={visa.photo} />
          <input type="hidden" name="countryName" value={visa.countryName} />

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" name="email" value={userEmail} readOnly className="input input-bordered w-full" required/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input type="text" name="firstName" placeholder="Enter your first name" className="input input-bordered w-full" required/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input type="text" name="lastName" placeholder="Enter your last name" className="input input-bordered w-full" required/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Applied Date</label>
            <input type="text" name="appliedDate" value={new Date().toLocaleDateString()} readOnly className="input input-bordered w-full" required/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Fee</label>
            <input type="text" name="fee" value={`$${visa.fee}`} readOnly className="input input-bordered w-full" required/>
          </div>
          <div className="text-right">
            <button type="button" className="btn btn-secondary mr-2" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
