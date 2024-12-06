import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllVisas = () => {
    const [visa, setVisa] = useState([]);
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchVisa = async () => {
            try {
                const response = await axios.get("http://localhost:5000/visa");
                setVisa(response.data);
            } catch (error) {
                console.error("Error fetching visas:", error);
            }
        };
        fetchVisa();
    }, []);

    const filteredVisas = visa.filter((visa) => {
        const matchesFilter = filter ? visa.visaType === filter : true;
        const matchesSearch = visa.countryName.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="p-6">
            <h1 className="text-3xl font-black mb-10 text-center underline underline-offset-2">All Visas</h1>

            <div className="flex gap-4 mb-10 justify-center">
                <select className="select select-bordered" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="">All Types</option>
                    <option value="Tourist Visa">Tourist Visa</option>
                    <option value="Student Visa">Student Visa</option>
                    <option value="Official Visa">Official Visa</option>
                </select>
                <input type="text" placeholder="Search by country" className="input input-bordered" value={search} onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredVisas.map((visa) => (
                    <div key={visa._id} className="card bg-gray-300 shadow-xl text-gray-700">
                        <figure className="p-2">
                            <img src={visa.photo} alt={visa.countryName} className="w-full h-40 object-cover rounded-t-2xl" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{visa.countryName}</h2>
                            <p>Type: {visa.visaType}</p>
                            <p>Fee: ${visa.fee}</p>
                            <p>Processing Time: {visa.processingTime}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/visa-details/${visa._id}`} className="btn btn-primary">
                                    See Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllVisas;
