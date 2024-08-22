import Nav from './Nav'
import User from './user'

const boardAdmin = () => {

  return (
    <>
    <Nav />
    <div className="max-w-lg mx-auto mt-20 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Admin content</h2>
        <br />
        <User />
    </div>

    </>
  )
}

export default boardAdmin