import React, { useState,useContext  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logout from './logout';
import useAuth from '../hooks/useAuth';

const Nav = () => {
const [showLogoutModal, setShowLogoutModal] = useState(false);
const navigate = useNavigate();
const { auth } = useAuth(); 
const isAdmin = auth?.roles?.includes(2);
const isModerator = auth?.roles?.includes(3);

  return (
    <div>
      <nav className="w-screen h-16 sm:h-20 z-10 bg-blue-500 text-white drop-shadow-lg">
        <ul className="px-10 flex justify-between items-center w-full h-full">
          <div className="flex items-center space-x-4">
            <li className="text-2xl font-bold"><Link to="/home">Bookshelf</Link></li>
            <li><Link to="/home">Home</Link></li>
            {isAdmin && <li><Link to="/boardAdmin">Admin</Link></li>}
            {isModerator && <li><Link to="/boardModerator">Moderator</Link></li>}
            <li><Link to="/user">User</Link></li>
          </div>
          <div className="flex items-center space-x-4">
            {auth?.user ? (
              <>
                <li className="font-medium"><Link to="/profile">{auth.user.name}</Link></li>
                <li>
                  <button onClick={() => setShowLogoutModal(true)}>LogOut</button>
                </li>
              </>
            ) : (
              <li><Link to="/">Login</Link></li>
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