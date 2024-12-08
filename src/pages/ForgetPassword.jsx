import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { toast, ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';

const ForgetPassword = () => {
    const location = useLocation();
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);
        }
    }, [location.state]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success('Password reset email sent! Check your inbox.');
        } catch (error) {
            toast.error('Failed to send reset email. Make sure the email is registered.');
        }
    };

    return (
        <div className="container mx-auto p-10">
            <Helmet>
                <title>Visa Navigator | Forget Password</title>
            </Helmet>
            <ToastContainer />
            <h1 className="text-3xl font-bold text-center mb-6">Reset Password</h1>
            <form onSubmit={handleResetPassword} className="max-w-md mx-auto bg-gray-100 p-6 rounded shadow">
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                    Reset Password
                </button>
            </form>
            <p className="text-center mt-4 text-gray-600">
                You'll be redirected to Gmail to reset your password.
            </p>
        </div>
    );
};

export default ForgetPassword;
