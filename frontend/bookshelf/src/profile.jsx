import React from 'react';
import Logo from "./assets/logo.jpg";
import { Link } from 'react-router-dom';
import Nav from './components/Nav';
import useAuth from './hooks/useAuth';

const profile = () => {
    const { auth } = useAuth();

    const user = auth?.user;

    return (
        <>
            <Nav />
            <div className="max-w-lg mx-auto mt-20 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">{user?.name}'s Profile</h2>
                <div className="mb-4">
                    <strong>Token: </strong>
                    <span className="truncate">{auth?.accessToken}</span>
                </div>
                <div className="mb-4">
                    <strong>Id: </strong>
                    <span>{user?.id || "N/A"}</span>
                </div>
                <div className="mb-4">
                    <strong>Email: </strong>
                    <span>{user?.email || "N/A"}</span>
                </div>
                <div>
                    <strong>Authorities: </strong>
                    <ul>
                        {auth?.roles?.map((role, index) => (
                            <li key={index}>{role}</li>
                        ))}
                    </ul>
                </div>
            </div>

        </>
    )
}

export default profile