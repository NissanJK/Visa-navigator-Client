import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && user.email) {
      setUserEmail(user.email);
    } else {
      setUserEmail("");
    }
  }, []);

  useEffect(() => {
    if (!userEmail) return;

    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/application", {
          params: { email: userEmail },
        });
        setApplications(response.data);
        setFilteredApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userEmail]);

  const handleSearch = () => {
    const results = applications.filter(
      (application) =>
        application.countryName &&
        application.countryName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredApplications(results);
  };

  const handleCancel = async (applicationId) => {
    const confirmed = window.confirm("Are you sure you want to cancel this application?");
    if (!confirmed) return;

    try {
      const response = await axios.delete(`http://localhost:5000/application/${applicationId}`);
      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Application canceled successfully!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        setApplications((prev) => prev.filter((app) => app._id !== applicationId));
        setFilteredApplications((prev) => prev.filter((app) => app._id !== applicationId));
      }
    } catch (error) {
      console.error("Error canceling application:", error);
      toast.error("Failed to cancel application.");
    }
  };

  if (loading) {
    return <div className="loading loading-infinity loading-lg"></div>;
  }

  return (
    <div className="w-11/12 mx-auto p-6 my-10">
      <ToastContainer></ToastContainer>
      <h1 className="text-3xl font-black mb-10 text-center underline underline-offset-2">
        My Visa Applications
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by country"
          className="input input-bordered flex-grow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>
      {filteredApplications.length === 0 ? (
        <p className="text-center text-gray-500">No applications match your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredApplications.map((application) => (
            <div key={application._id} className="card bg-gray-300 text-gray-700 shadow-md">
              <figure className="p-3">
                <img src={application.photo || ""} alt={application.countryName || "Country"} className="w-full h-40 object-cover rounded-t-2xl" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{application.countryName}</h2>
                <p>
                  <strong>Visa Type:</strong> {application.visaType}
                </p>
                <p>
                  <strong>Processing Time:</strong> {application.processingTime}
                </p>
                <p>
                  <strong>Fee:</strong> {application.fee}
                </p>
                <p>
                  <strong>Validity:</strong> {application.validity}
                </p>
                <p>
                  <strong>Application Method:</strong> {application.applicationMethod}
                </p>
                <p>
                  <strong>Applied On:</strong>{" "}
                  {new Date(application.appliedDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Applicant:</strong> {application.firstName} {application.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {application.email}
                </p>
                <div className="card-actions justify-end mt-5">
                  <button
                    className="btn btn-error"
                    onClick={() => handleCancel(application._id)}
                  >
                    Cancel Application
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
