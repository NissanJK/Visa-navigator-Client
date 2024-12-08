import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-6">
            <div className="w-11/12 md:w-9/12 mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center border-b border-gray-700 pb-6 gap-5">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Visa Navigator</h1>
                        <p className="mt-1 text-sm text-gray-400">
                            Your reliable partner for seamless visa processing.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-white">Contact Us</h2>
                        <p className="mt-1 text-sm">Email: support@visanavigator.com</p>
                        <p className="text-sm">Phone: +880 171207****</p>
                        <p className="text-sm">Address: XYZ,Chattogram,Bangladesh</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white">Follow Us</h2>
                        <div className="flex gap-4 mt-2">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook></FaFacebook>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter></FaTwitter>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram></FaInstagram>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="text-center pt-6">
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Visa Navigator. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
