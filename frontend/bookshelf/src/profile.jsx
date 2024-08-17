import React from 'react'
import Logo from "./assets/logo.jpg";
import { Link } from 'react-router-dom';
import Nav from './components/Nav'

const profile = () => {
  const user = { 
                token:'34345345',
                name: 'A user',
                 id: 'id'  ,
                 email:'email',
                 authorities:'admin' 
   };

  return (
    <>
    <Nav />
    <div className="max-w-lg mx-auto mt-20 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{user.name} Profile</h2>
        <div className="mb-4">
            <strong>Token: </strong>
            <span className="truncate">{user.token}</span>
        </div>
        <div className="mb-4">
            <strong>Id: </strong>
            <span>{user.id}</span>
        </div>
        <div className="mb-4">
            <strong>Email: </strong>
            <span>{user.email}</span>
        </div>
        <div>
            <strong>Authorities: </strong>
            <ul>
            {user.authorities
            }
            </ul>
        </div>
    </div>

    </>
  )
}

export default profile