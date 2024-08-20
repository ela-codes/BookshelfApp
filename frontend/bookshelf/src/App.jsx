import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Image from "./assets/image.png";
import Logo from "./assets/logo.jpg";
import GoogleSvg from "./assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import 'react-toastify/dist/ReactToastify.css';
import axios from './api/axios';
import useAuth from './hooks/useAuth';

const LOGIN_URL = '/auth';
// test
const ROLES = {
  'User': 1,
  'Admin': 2,
  'Moderator': 3
};
// test
const users = {
  'admin': { password: 'adminpass', roles: [ROLES.Admin] },
  'moderator': { password: 'modpass', roles: [ROLES.Moderator] },
  'user': { password: 'userpass', roles: [ROLES.User] }
};

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/profile';

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

//  test version
const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Username:", user);
  console.log("Password:", pwd);

  const loggedInUser = users[user];
  console.log("Logged In User:", loggedInUser);

  if (loggedInUser && loggedInUser.password === pwd) {
      console.log("Roles assigned:", loggedInUser.roles);
      const roles = loggedInUser.roles;
      const accessToken = "fake-jwt-token-for-testing";

      setAuth({ user, roles, accessToken });
      setUser('');
      setPwd('');

      navigate(from, { replace: true });
  } else {
      setErrMsg('Invalid username or password');
      errRef.current.focus();
  }
};

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // console.log(user, pwd);
  //   // setSuccess(true);
  //   try {
  //     const response = await axios.post(LOGIN_URL, JSON.stringify({
  //       user,
  //       pwd
  //     }), {
  //       headers: { 'Content-Type': 'application/json' },
  //       withCredentials: true
  //     });

  //     console.log(JSON.stringify(response?.data));
  //     const accessToken = response?.data?.accessToken;
  //     const roles = response?.data?.roles;
  //     setAuth({
  //       user, pwd, roles, accessToken
  //     })
  //     setUser('');
  //     setPwd('');
  //     navigate(from, {
  //       replace: true
  //     });
  //   } catch (err) {
  //     if (!err?.response) {
  //       setErrMsg('No RESPONSE');
  //     }
  //     else if (err.response?.status === 400) {
  //       setErrMsg('Missing username or password');
  //     } else if (err.response?.status === 401) {
  //       setErrMsg('Unauthorized');
  //     } else {
  //       setErrMsg('Login Failed');
  //     }
  //     errRef.current.focus();
  //   }
  // }

  return (
    <div className="flex h-screen">

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
          <p ref={errRef} className={`${errMsg ? 'bg-red-100 text-red-600 p-2 mb-2 font-bold' : 'absolute left-[-9999px]'}`} aria-live="assertive">{errMsg}</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              ref={userRef}
              autoComplete='off'
              placeholder="Username"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              className="w-full h-12 p-2 border-b border-b-gray-400 hover:border-blue-500 focus:border-blue-500 !outline-none"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                className="w-full h-12 p-2 border-b border-b-gray-400 hover:border-blue-500 focus:border-blue-500 !outline-none"
              />
              <div className="absolute right-2 top-4 cursor-pointer text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="space-y-4">
              <button type="submit"
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
