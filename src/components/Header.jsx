import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMenu, IoClose } from 'react-icons/io5';
import { AuthContext } from '../context/AuthContext';
import { Tooltip } from 'react-tooltip';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const links = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? 'font-bold text-yellow-300' : 'hover:text-gray-200'
                }
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/allVisa"
                className={({ isActive }) =>
                    isActive ? 'font-bold text-yellow-300' : 'hover:text-gray-200'
                }
            >
                All visas
            </NavLink>
        </li>
        {user && (
            <li>
                <NavLink
                    to="/addVisa"
                    className={({ isActive }) =>
                        isActive ? 'font-bold text-yellow-300' : 'hover:text-gray-200'
                    }
                >
                    Add Visa
                </NavLink>
            </li>
        )}
        {user && (
            <li>
                <NavLink
                    to="/my-visas"
                    className={({ isActive }) =>
                        isActive ? 'font-bold text-yellow-300' : 'hover:text-gray-200'
                    }
                >
                    My Added Visas
                </NavLink>
            </li>
        )}
        {user && (
            <li>
                <NavLink
                    to="/my-applications"
                    className={({ isActive }) =>
                        isActive ? 'font-bold text-yellow-300' : 'hover:text-gray-200'
                    }
                >
                    My Visa applications
                </NavLink>
            </li>
        )}
    </>

    return (
        <header className="bg-blue-600 text-white p-4 sticky top-0 z-50">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold flex flex-col flex-grow lg:flex-grow-0">
                    {user && (
                        <div className="text-sm">
                            Welcome, <span>{user.displayName || 'User'}</span>!
                        </div>
                    )}
                    <NavLink to="/" className="hover:text-gray-200">
                        Visa Navigator
                    </NavLink>
                </div>



                <ul className="hidden lg:flex items-center gap-4">
                    {links}
                </ul>



                <div className="flex items-center gap-2 relative">
                    
                    {user ? (
                        <>
                            <div className="relative group" data-tooltip-id="my-tooltip" data-tooltip-content={user.displayName || 'User'}>
                                <img src={user.photoURL || ''} alt="User" className="rounded-full w-10 h-10 cursor-pointer" />
                            </div>
                            <button onClick={logout} className="btn btn-error text-white">
                                Log Out
                            </button>
                        </>
                    ) : (
                        <NavLink to="/login" className="btn btn-success text-white">
                            Log In
                        </NavLink>
                    )}
                    <Tooltip id="my-tooltip" />
                </div>
                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="btn btn-ghost">
                        {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
                    </button>
                </div>

                {isMenuOpen && (
                    <ul className="absolute top-16 left-0 w-full bg-blue-700 p-4 rounded-lg shadow-lg z-50">
                        {links}
                    </ul>
                )}
            </nav>
        </header>
    );
};

export default Header;
