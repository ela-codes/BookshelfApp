import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logout from './logout';

const Nav = () => {
const [showLogoutModal, setShowLogoutModal] = useState(false);
const navigate = useNavigate();
//   const { user, roles } = useContext(???);  
const user = { name: 'A user' };

  return (
    <div>
        <nav className="w-screen h-16 sm:h-20 z-10 bg-blue-500 text-white drop-shadow-lg ">
            <ul className="px-10 flex justify-between items-center w-full h-full"> 
            <div className="flex items-center space-x-4">
                <li className="text-2xl font-bold"><Link to="/profile">Bookshelf</Link></li>
                <li><Link to="/profile">Home</Link></li>
                <li><Link to="/user">User</Link></li>
            </div>
            <div className="flex items-center space-x-4">
                {user ? (
                <>
                    <li className="font-medium">{user.name}</li>
                    <li>
                    <button
                        onClick={() => setShowLogoutModal(true)}
                    >
                        LogOut
                    </button>
                    </li>
                </>
                ) : (
                <li><Link to="/login">Login</Link></li>
                )}
            </div>
            </ul>
        </nav>
        <Logout
            show={showLogoutModal}
            onClose={() => setShowLogoutModal(false)}
        />
    </div>
  )
}

export default Nav