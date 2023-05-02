import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import logo from './assets/logo.png'

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  let navigate = useNavigate();

  // const host = "http://localhost:5000";
  const host = "https://notehub.up.railway.app";
  async function handleLogin(e) {
    e.preventDefault();
    props.setProgress(30);
    
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    props.setProgress(70);
    if (json.success) {
      //save the auth token
      localStorage.setItem('token', json.authToken);
      props.showAlert("Logged in successfully", "bg-green-200", 'text-green-600', 'Success');
      navigate('/');
    }

    else {
      props.showAlert("Invalid Credentials", "bg-red-200", 'text-red-600', 'Warning');
    }
    props.setProgress(100);
  }
  
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className=' flex justify-center items-center'>
      <div className="w-full mx-4 max-w-md m-auto">
        <div className={`${props.mode==='dark'? 'text-white' : 'text-black'} text-2xl mb-4 font-bold text-center flex justify-center items-center`}>
          <span className='pl-2 mr-4 text-2xl md:text-4xl'>Login to</span>
          <img className='w-6 md:w-8' src={logo} alt="Notehub" />
          <span className='pl-2 text-2xl md:text-4xl'>Notehub</span>
        </div>
        <form className={`${props.mode==='dark'? 'bg-[#322F3D] text-white' : 'bg-white text-gray-700'} shadow-md rounded p-3 md:p-6 mb-4`} onSubmit={handleLogin} >
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="email" value={credentials.email} name='email' onChange={onChange} />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
          </div>
          <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >Login</button>
          <p className="text-sm mt-2 font-light ">Don't have account ?<Link to="/signup" className="font-medium text-blue-600 hover:underline ml-1">Create a account</Link></p>
        </form>
        <p className="text-center text-gray-400 text-xs">
          &copy;2022 Notehub Corp. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Login
