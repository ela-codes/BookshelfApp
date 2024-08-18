import { useState,useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from "./assets/image.png";
import Logo from "./assets/logo.jpg";
import GoogleSvg from "./assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{6,40}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

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

useEffect(() => {
   userRef.current.focus(); 
},[]);

useEffect(()=>{
    const result = usernameRegex.test(user);
    setValidName(result);
},[user]);

useEffect(()=>{ 
  const result = passwordRegex.test(pwd);
  setValidPwd(result);
  const match = pwd === matchPwd;
  setValidMatch(match);
},[pwd,matchPwd]);

useEffect(()=>{
  setErrMsg('');
},[user,pwd,matchPwd]);

   
  // const validateUsername= (username) => {
  //   return username.length >=3 && username.length <=20;
  // };

  // const validateEmail = (email) => {
      
  //       const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //       return re.test(String(email).toLowerCase());
  //     };
      
  // const validatePassword = (password) => {
      
  //       const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{6,40}$/;
  //       return re.test(String(password));
  //     };  

  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [form, setForm] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  //   errors: { email: '', password: '', username:'' }
  // });
  // const [showPassword, setShowPassword] = useState(false);

  // const submit = async () => {
  //   if (!form.username || !form.email || !form.password) {
  //     toast.error("Please fill in all fields");
  //     return;
  //   }
  //   let errors = { email: '', password: '',username:''  };
  //   if (!validateEmail(form.email)) {
  //       errors.email = "Please enter a valid email address.";
  //   }
  //   if (!validateUsername(form.username)) {
  //     errors.username = "The username must be between 3 and 20 characters.";
  //   }
  //   if (!validatePassword(form.password)) {
  //       errors.password = "The password must be between 6 and 40 characters.";
  //   }
  //   setForm(prev => ({ ...prev, errors }));
  //   if (errors.email || errors.password) {
  //       toast.error("Please fix the errors before submitting.");
  //       return;
  //    }
  
  //   setIsSubmitting(true);
  
  //   try {
  //     const result = await createUser(form.email, form.password, form.username);
      
  
  //     toast.success("User signed up successfully");
     
  //   } catch (error) {
  //     toast.error(error.message);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <div className="flex h-screen">
      <p ref= {errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live ="assertive">{errMsg}</p>
      <ToastContainer position="top-right" autoClose={5000} style={{ fontSize: '1.2rem', padding: '20px', width: '400px' }}/>
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
          <form className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm(prev => ({ ...prev, username: e.target.value }))}
                className="w-full h-12 p-2 border-b border-b-gray-400 hover:border-blue-500 focus:border-blue-500 outline-none"
              />
              {form.errors.username && <p className="text-red-500 text-base italic">{form.errors.username}</p>}
              </div>
              <div className="relative">
              <input
                type="text"
                placeholder="Email"
                value={form.email}
                keyboardType = "email-address"
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full h-12 p-2 border-b border-b-gray-400 hover:border-blue-500 focus:border-blue-500 outline-none"
              />
              {form.errors.email && <p className="text-red-500 text-base italic">{form.errors.email}</p>}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full h-12 p-2 border-b border-b-gray-400 hover:border-blue-500 focus:border-blue-500 outline-none"
                />
                <div className="absolute right-2 top-4 cursor-pointer text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
                {form.errors.password && <p className="text-red-500 text-base italic">{form.errors.password}</p>}
              </div>
              <button
                type="button"
                onClick={submit}
                className="w-full h-12 bg-blue-500 text-white py-2 rounded hover:bg-blue-400"
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
  )
}

export default SignUp;
