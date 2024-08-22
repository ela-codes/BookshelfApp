import {useState,useEffect} from "react"
import axios from "../api/axios.jsx";
import Nav from './Nav'

const user = () => {
  // const user = { name: 'A user',
  //                id: 'id'  ,
  //                email:'email',
  //                authorities:'admin' 
  //  };

  const[users,SetUsers] = useState([]);

  useEffect(()=> {
      let isMounted = true;
      const controller = new AbortController();

      const getUsers = async () =>{
        try {
          const response = await axios.get('/user',{
              signal:controller.signal
          });
          console.log(response.data)
          isMounted && SetUsers(response.data)
        } catch (err) {
          console.error(err)
        }
      }

      getUsers();

      return () => {
        isMounted = false;
        controller.abort();
      }
  },[])

  return (
    <>
    <Nav />
    <div className="max-w-lg mx-auto mt-20 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">User content</h2>
        {users?.length
          ?(
            <ul>
              {users.map((user,i) => <li key={i}>{user?.username}</li>
              )}
            </ul>
          ) : <p>No data to display</p>
        }
    </div>

    </>
  )
}

export default user