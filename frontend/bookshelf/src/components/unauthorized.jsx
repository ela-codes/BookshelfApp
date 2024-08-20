import React from 'react'
import Nav from './Nav'
const unauthorized = () => {
      
  return (
    <>
    <Nav />
    <div className="max-w-lg mx-auto mt-20 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Error:unauthorized</h2>
    </div>

    </>
  )
}

export default unauthorized