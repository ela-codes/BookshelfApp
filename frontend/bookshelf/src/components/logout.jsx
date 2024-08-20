import React from 'react';
import useAuth from '../hooks/useAuth';

function Logout({ show, onClose, }) {
    const { logout } = useAuth();
    if (!show) {
        return null;
    }

    const handleLogout = () => {
        logout();

        window.location.href = '/';

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
                <p>Are you sure you want to log out?</p>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Logout;
