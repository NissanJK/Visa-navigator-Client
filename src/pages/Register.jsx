import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { toast, ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { auth } from '../config/firebase.config';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            toast.error('Password must have an uppercase letter, a lowercase letter, and at least 6 characters.');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name, photoURL });
            toast.success('Registration successful!');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleGoogleRegister = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            toast.success('Google registration successful!');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="container mx-auto p-10">
            <Helmet>
                <title>Visa Navigator | Register</title>
            </Helmet>
            <ToastContainer />
            <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
            <form onSubmit={handleRegister} className="max-w-md mx-auto bg-gray-400 text-black p-6 rounded shadow">
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded text-gray-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded text-gray-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Photo URL</label>
                    <input
                        type="text"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        className="w-full p-2 border rounded text-gray-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded text-gray-300"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                    Register
                </button>
            </form>
            <div className="text-center mt-4">
                <p>Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
                <button
                    onClick={handleGoogleRegister}
                    className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                >
                    Register with Google
                </button>
            </div>
        </div>
    );
};

export default Register;
