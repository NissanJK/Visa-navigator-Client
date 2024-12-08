import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ApplyModal from "./ApplyModal";
import { Helmet } from "react-helmet";

const VisaDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [visa, setVisa] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchVisa = async () => {
            try {
                const response = await axios.get(`https://visa-navigator-server-five.vercel.app/visa/${id}`);
                setVisa(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching visa details:", error);
                toast.error("Failed to load visa details");
                navigate("/allVisa");
            }
        };
        fetchVisa();
    }, [id, navigate]);

    if (loading) {
        return <div className="loading loading-infinity loading-lg mx-auto my-auto"></div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-300 text-gray-700 shadow-md rounded-lg my-10">
            <Helmet>
                <title>Visa Navigator | Visa Details</title>
            </Helmet>
            <h2 className="text-3xl font-black mb-10 text-center underline underline-offset-2">Visa Details</h2>
            <div className="lg:flex justify-evenly">
                <div className="flex flex-col">
                    <img src={visa.photo} alt={visa.countryName} className="w-full h-64 object-cover rounded-lg mb-8 lg:mb-0" />
                    <div className="text-center font-black text-3xl mb-5 lg:mt-5 underline underline-offset-2">{visa.countryName}</div>
                </div>
                <div className="space-y-3">
                    <p><strong>Visa Type:</strong> {visa.visaType}</p>
                    <p><strong>Processing Time:</strong> {visa.processingTime}</p>
                    <p><strong>Required Documents:</strong></p>
                    <ul className="list-disc ml-5">
                        {visa.requiredDocuments.map((doc, index) => (
                            <li key={index}>{doc}</li>
                        ))}
                    </ul>
                    <p><strong>Fee:</strong> ${visa.fee}</p>
                    <p><strong>Validity:</strong> {visa.validity}</p>
                    <p><strong>Application Method:</strong> {visa.applicationMethod}</p>
                    <p><strong>Age Restriction:</strong> {visa.ageRestriction || "None"}</p>
                    <p className="mt-4"><strong>Description:</strong> {visa.description}</p>
                </div>
            </div>
            <div className="text-center mt-6">
                <div className="text-center mt-6">
                    <button
                        className="btn btn-primary"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Apply for Visa
                    </button>
                </div>
                {isModalOpen && (
                    <ApplyModal
                        visa={visa}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}
            </div>
        </div >
    );
};

export default VisaDetails;
