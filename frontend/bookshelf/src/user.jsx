import React from 'react'
import Logo from "./assets/logo.jpg";
import { Link } from 'react-router-dom';
import Nav from './components/Nav'

const user = () => {
  const user = { name: 'A user',
                 id: 'id'  ,
                 email:'email',
                 authorities:'admin' 
   };

  return (
    <>
    <Nav />
    <div className="max-w-lg mx-auto mt-20 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">User content</h2>
    </div>

    </>
  )
}

export default user