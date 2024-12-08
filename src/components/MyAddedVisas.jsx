import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";
import UpdateVisaModal from "./UpdateVisaModal";
import { Helmet } from "react-helmet";

const MyAddedVisas = () => {
    const [visas, setVisas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVisa, setSelectedVisa] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user && user.email) {
            setUserEmail(user.email);
        } else {
            console.error("No user is logged in.");
        }
    }, []);
    useEffect(() => {
        if (!userEmail) return;

        const fetchVisas = async () => {
            try {
                const response = await axios.get(
                    "https://visa-navigator-server-five.vercel.app/my-visas",
                    { params: { email: userEmail } }
                );
                setVisas(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching visas:", error);
                setLoading(false);
            }
        };

        fetchVisas();
    }, [userEmail]);

    const handleDelete = async (visaId) => {
        const confirmed = window.confirm("Are you sure you want to delete this visa?");
        if (!confirmed) return;

        try {
            const response = await axios.delete(
                `https://visa-navigator-server-five.vercel.app/visa/${visaId}`
            );
            if (response.status === 200) {
                Swal.fire("Deleted", "Visa has been deleted successfully!", "success");
                setVisas((prev) => prev.filter((visa) => visa._id !== visaId));
            }
        } catch (error) {
            console.error("Error deleting visa:", error);
            Swal.fire("Error", "Failed to delete visa.", "error");
        }
    };

    if (loading) {
        return <div className="loading loading-infinity loading-lg mx-auto my-auto"></div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <Helmet>
                <title>Visa Navigator | My Added Visas</title>
            </Helmet>
            <h1 className="text-3xl font-bold mb-6 text-center underline underline-offset-2">
                My Added Visas
            </h1>
            {visas.length === 0 ? (
                <p className="text-center text-gray-500">You have not added any visas yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {visas.map((visa) => (
                        <div key={visa._id} className="card bg-gray-300 text-gray-700 shadow-md">
                            <figure className="p-3">
                                <img
                                    src={visa.photo}
                                    alt={visa.countryName}
                                    className="w-full h-40 object-cover rounded-t-2xl"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{visa.countryName}</h2>
                                <p>
                                    <strong>Visa Type:</strong> {visa.visaType}
                                </p>
                                <p>
                                    <strong>Processing Time:</strong> {visa.processingTime}
                                </p>
                                <p>
                                    <strong>Fee:</strong> {visa.fee}
                                </p>
                                <p>
                                    <strong>Validity:</strong> {visa.validity}
                                </p>
                                <p>
                                    <strong>Application Method:</strong> {visa.applicationMethod}
                                </p>
                                <div className="card-actions justify-end mt-5">
                                    <button className="btn btn-primary mr-2" onClick={() => setSelectedVisa(visa)} >
                                        Update
                                    </button>
                                    <button className="btn btn-error" onClick={() => handleDelete(visa._id)} >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedVisa && (
                <UpdateVisaModal
                    visa={selectedVisa}
                    onClose={() => setSelectedVisa(null)}
                    onUpdated={(updatedVisa) => {
                        setVisas((prev) =>
                            prev.map((visa) => (visa._id === updatedVisa._id ? updatedVisa : visa))
                        );
                    }}
                />
            )}
        </div>
    );
};

export default MyAddedVisas;
