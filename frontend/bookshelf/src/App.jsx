import { useState } from 'react'
import { Link } from 'react-router-dom';
import Image from "./assets/image.png";
import Logo from "./assets/logo.jpg";
import GoogleSvg from "./assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [ showPassword, setShowPassword ] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const[form, setForm] = useState({
    username:'',
    password:''
  })

  const submit = async () => {
    if (form.username === "" || form.password === "") {
      toast.error("Please fill in all fields");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      await signIn(form.username, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
  
      toast.success("User signed in successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

const signIn = async(username, password)=>{
    try {
        const session = await account.createEmailSession(username,password)
        return session;
    } catch (error) {
        toast.error(error.message);
    }
}

  return (
    <div className="flex h-screen">
       <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover 
        style={{ fontSize: '1.2rem', padding: '20px', width: '400px' }}
       />
      <div className="hidden md:flex w-1/2 relative">
        <h1 className='absolute inset-0 flex justify-center items-center text-white text-9xl'>Public content</h1>
        <img src={Image} alt="" className="w-full h-screen object-cover" />
      </div>
      <div className="flex flex-col w-full justify-center items-center px-4 md:w-1/2 md:px-16">
        <div className="w-full max-w-xl"> 
          <div className="flex justify-center mb-6">
            <img src={Logo} alt="Logo" className="w-16" />
          </div>
          <div className="mb-8">
            <h2 className="text-center text-2xl font-bold mb-2">Welcome back!</h2>
            <p className="text-center text-sm text-gray-600">Please enter your details</p>
          </div>
          <form className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm((prevForm) => ({ ...prevForm, username: e.target.value }))}
                className="w-full h-12 p-2 border-b border-b-gray-400 hover:border-blue-500 focus:border-blue-500 !outline-none"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm((prevForm) => ({ ...prevForm, password: e.target.value }))}
                  className="w-full h-12 p-2 border-b border-b-gray-400 hover:border-blue-500 focus:border-blue-500 !outline-none"
                />
                <div className="absolute right-2 top-4 cursor-pointer text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="space-y-4">
                <button type="button" onClick={submit}
                className="w-full h-12 bg-blue-500 text-white py-2 rounded hover:bg-blue-400">Log In</button>
                <button type="button" className="w-full h-12 flex justify-center items-center border py-2 hover:border-gray-400 rounded">
                  <img src={GoogleSvg} alt="Google" className="w-5 h-5 mr-2" />
                  Log In with Google
                </button>
              </div>
          </form>

          <p className="text-center text-sm mt-4">
            Don't have an account? <Link to="/sign-up" className="text-blue-500">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
