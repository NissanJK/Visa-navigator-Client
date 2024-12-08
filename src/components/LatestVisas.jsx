import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LatestVisas = () => {
  const [visas, setVisas] = useState([]);

  useEffect(() => {
    const fetchLatestVisas = async () => {
      try {
        const response = await axios.get("https://visa-navigator-server-five.vercel.app/visa?limit=5");
        setVisas(response.data);
      } catch (error) {
        console.error("Error fetching latest visas:", error);
      }
    };

    fetchLatestVisas();
  }, []);

  return (
    <div className="w-11/12 mx-auto p-6">
      <h2 className="text-3xl font-black mb-10 text-center underline underline-offset-2">Latest Visas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visas.map((visa) => (
          <div key={visa._id} className="card bg-gray-300 text-gray-700 shadow-md">
            <figure className="p-3">
              <img src={visa.photo} alt={visa.countryName} className="rounded-t-2xl w-full h-40 object-cover"/>
            </figure>
            <div className="card-body">
              <h2 className="card-title font-black text-xl underline underline-offset-2">{visa.countryName}</h2>
              <p><strong>Visa Type:</strong> {visa.visaType}</p>
              <p><strong>Processing Time:</strong> {visa.processingTime}</p>
              <p><strong>Fee:</strong> ${visa.fee}</p>
              <p><strong>Validity:</strong> {visa.validity}</p>
              <p><strong>Application Method:</strong> {visa.applicationMethod}</p>
              <div className="card-actions justify-end">
                <Link to={`/visa-details/${visa._id}`} className="btn btn-primary">
                  See Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-20 mb-5">
        <Link to="/allVisa" className="btn btn-outline font-black text-xl">
          See All Visas
        </Link>
      </div>
    </div>
  );
};

export default LatestVisas;
