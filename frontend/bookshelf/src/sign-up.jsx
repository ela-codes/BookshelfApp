import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from "./assets/image.png";
import Logo from "./assets/logo.jpg";
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from './api/axios';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{6,40}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

const register_url = '/reguister';

function SignUp() {

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = usernameRegex.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = emailRegex.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = passwordRegex.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    // console.log(user,pwd);
    // setSuccess(true);
    try {
      const response = await axios.post(register_url, JSON.stringify({
          user,
          pwd,
          email
      }), {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
      });

      console.log(response.data);
      setSuccess(true);
    } catch (err) {
      if(!err?.response){
        setErrMsg('No RESPONSE');
      }
      else if(err.response?.status === 409){
        setErrMsg('Username Taken');
      }else{
        setErrMsg('Registrtion failed');
      }
      errRef.current.focus();
    }
  }

  return (
    <>
    {
      success ? (
        <div>
          <h1>Success!</h1>
          <Link to="/" className='text-blue-600'>Sign in</Link>
        </div>
      )
     :(
    <div className="flex h-screen">
      <p ref={errRef} className={`${errMsg ? 'bg-pink-300 text-red-700 p-2 mb-2 font-bold' : 'absolute left-[-9999px]'}`} aria-live="assertive">{errMsg}</p>
      <ToastContainer position="top-right" autoClose={5000} style={{ fontSize: '1.2rem', padding: '20px', width: '400px' }} />
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
            <h2 className="text-center text-2xl font-bold mb-2">Sign up to Bookshelf</h2>
            <p className="text-center text-sm text-gray-600">Please enter your details</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                ref={userRef}
                autoComplete='off'
                placeholder="Username"
                onChange={(e) => setUser(e.target.value)}
                aria-invalid={!validName ? "true" : "false"}
                aria-describedby='errorUser'
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                className="w-full h-12 p-2 border-b border-b-gray-400 hover:border-blue-500 focus:border-blue-500 outline-none"
              />
              <p id="errorUser" className={userFocus && user && !validName ? "p-1 rounded text-red-500 bg-red-100 bottom-[-10px] relative" : "hidden"}>
                The username must be between 3 and 20 characters.
              </p>
              <span className={validName ? "text-green-500 ml-1 absolute right-2 top-4" : "hidden"}>
                <FaCheck />
              </span>
              <span className={validName || !user ? "hidden" : "text-red-500 ml-1 absolute right-2 top-4"}>
                <FaTimes />
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                keyboardType="email-address"
                aria-invalid={!validEmail ? "true" : "false"}
                aria-describedby='errorEmail'
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                className="w-full h-12 p-2 border-b border-b-gray-400 hover:border-blue-500 focus:border-blue-500 outline-none"
              />
              <p id="errorEmail" className={emailFocus && email && !validEmail ? "p-1 rounded text-red-500 bg-red-100 bottom-[-10px] relative" : "hidden"}>
                Please enter a valid email address.
              </p>
              <span className={validEmail ? "text-green-500 ml-1 absolute right-2 top-4" : "hidden"}>
                <FaCheck />
              </span>
              <span className={validEmail || !email ? "hidden" : "text-red-500 ml-1 absolute right-2 top-4"}>
                <FaTimes />
              </span>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPwd(e.target.value)}
                aria-invalid={!validPwd ? "true" : "false"}
                aria-describedby='errorPwd'
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                className="w-full h-12 p-2 border-b border-b-gray-400 hover:border-blue-500 focus:border-blue-500 outline-none"
              />
              <div className="absolute right-2 top-4 cursor-pointer text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              <span className={validPwd ? "text-green-500 ml-1 absolute right-10 top-4" : "hidden"}>
                <FaCheck />
              </span>
              <span className={validPwd || !pwd ? "hidden" : "text-red-500 ml-1 absolute right-10 top-4"}>
                <FaTimes />
              </span>
              <p id="errorPwd" className={pwdFocus && pwd && !validPwd ? "p-1 rounded text-red-500 bg-red-100 bottom-[-10px] relative" : "hidden"}>
                The password must be between 6 and 40 characters.
              </p>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={(e) => setMatchPwd(e.target.value)}
                aria-invalid={!validMatch ? "true" : "false"}
                aria-describedby='errorMatch'
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                className="w-full h-12 p-2 border-b border-b-gray-400 hover:border-blue-500 focus:border-blue-500 outline-none"
              />
              <div className="absolute right-2 top-4 cursor-pointer text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              <span className={validMatch && matchPwd ? "text-green-500 ml-1 absolute right-10 top-4" : "hidden"}>
                <FaCheck />
              </span>
              <span className={validMatch || !matchPwd ? "hidden" : "text-red-500 ml-1 absolute right-10 top-4"}>
                <FaTimes />
              </span>
              <p id="errorMatch" className={matchFocus && matchPwd && !validMatch ? "p-1 rounded text-red-500 bg-red-100 bottom-[-10px] relative" : "hidden"}>
                The passwords do not match.
              </p>
            </div>
            <button
              type="submit"
              disabled={!validEmail || !validName || !validMatch || !validPwd ? true : false}
              className="w-full h-12 bg-blue-500 text-white py-2 rounded hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account? <Link to="/" className="text-blue-500">Log In</Link>
          </p>
        </div>
      </div>
    </div>
     )}
    </>
  )
}

export default SignUp;
