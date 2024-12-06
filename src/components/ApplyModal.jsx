import React, { useState } from "react";

const ApplyModal = ({ visa, onClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const applicationData = Object.fromEntries(formData.entries());
        console.log("Application Data:", applicationData);
        fetch("http://localhost:5000/application", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(applicationData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Application submitted:", data);
                onClose();
            })
            .catch((error) => {
                console.error("Error submitting application:", error);
            });
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-gray-300 p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Apply for {visa.countryName} Visa</h2>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="visaId" value={visa._id} />
                    <div className="mb-4">
                        <label className="block text-gray-700">First Name</label>
                        <input name="firstName" type="text" className="input input-bordered w-full text-gray-300" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Last Name</label>
                        <input name="lastName" type="text" className="input input-bordered w-full text-gray-300" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input name="email" type="email" className="input input-bordered w-full text-gray-300" value="nissan@jk.com" readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Fee</label>
                        <input name="fee" type="text" className="input input-bordered w-full text-gray-300" value={`$${visa.fee}`} readOnly />
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
