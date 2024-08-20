import React from 'react'
import Nav from './Nav'
import { useNavigate } from 'react-router-dom'
const unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => {
    if (window.history.length > 1) {
        navigate(-1);
    } else {
        navigate('/'); 
    };}
  return (
    <>
    <Nav />
    <div className="max-w-lg mx-auto mt-20 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Error:unauthorized</h2>
        <p>You do not have access to this page</p>
        <button onClick={goBack}
         className="w-full h-12 flex justify-center items-center border py-2 hover:border-gray-400 rounded">Go back</button>
    </div>

    </>
  )
}

export default unauthorized