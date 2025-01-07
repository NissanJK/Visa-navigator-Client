import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateVisaModal = ({ visa, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    countryName: visa.countryName || "",
    visaType: visa.visaType || "",
    processingTime: visa.processingTime || "",
    fee: visa.fee || "",
    validity: visa.validity || "",
    applicationMethod: visa.applicationMethod || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://visa-navigator-server-five.vercel.app/visa/${visa._id}`,
        formData
      );

      if (response.status === 200 && response.data.success) {
        Swal.fire("Success", "Visa updated successfully!", "success");
        onUpdated({ ...visa, ...formData }); // Update the state in the parent component
        onClose(); // Close the modal
      } else {
        throw new Error("Failed to update visa.");
      }
    } catch (error) {
      console.error("Error updating visa:", error);
      Swal.fire("Error", "Failed to update visa. Please try again.", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Update Visa</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold">Country Name</label>
            <input
              name="countryName"
              type="text"
              value={formData.countryName}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Visa Type</label>
            <input
              name="visaType"
              type="text"
              value={formData.visaType}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Processing Time</label>
            <input
              name="processingTime"
              type="text"
              value={formData.processingTime}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Fee</label>
            <input
              name="fee"
              type="number"
              value={formData.fee}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Validity</label>
            <input
              name="validity"
              type="text"
              value={formData.validity}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Application Method</label>
            <input
              name="applicationMethod"
              type="text"
              value={formData.applicationMethod}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="text-right">
            <button
              type="button"
              className="btn btn-secondary mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Visa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVisaModal;
