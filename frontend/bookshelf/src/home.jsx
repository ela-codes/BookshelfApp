import {useState,useEffect} from 'react'
import Nav from './components/Nav'
const home = () => {
  const [x,setx] = useState(0);
  const change = () => { setx(x +1) }
  useEffect(()=>{
    document.title = x;
  },[x])
  const list= [
    {id:1, name:'a'}
    ,{id:2, name:'b'}
    ,{id:3, name:'c'}];
  const listContent = list.map( e => (
    <li key={e.id}>{e.name}</li>
  ))
  return (
    <>
    <Nav />
    <div className="max-w-lg mx-auto mt-20 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Home</h2>
        <ul onClick={change}>
          <li>x is {x}</li>
          {listContent}
        </ul>
    </div>

    </>
  )
}

export default home