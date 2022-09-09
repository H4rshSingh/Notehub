import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/logo.png'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ email: '', password: '', cpassword: '' });
  let navigate = useNavigate();

  // const host = "http://localhost:5000";
  const host = "https://notehub-app.herokuapp.com"

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password} = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();

    if (json.success) {
      //save the auth token
      localStorage.setItem('token', json.authToken);
      navigate('/');
      props.showAlert("Account has been successfully created!", "bg-green-200", "text-green-600", 'success')
    }
    else {
      props.showAlert("Sorry a user with this email already exists", "bg-red-200", 'text-red-600', 'Warning')
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='flex justify-center items-center '>
      <div className="w-full mx-4 max-w-md m-auto">
        <div className={`${props.mode==='dark'? 'text-white' : 'text-black'} text-2xl mb-4 font-bold text-center flex justify-center items-center`}>
          <span className='pl-2 mr-3 text-xl md:text-2xl'>Create a</span>
          <img className='w-5 md:w-6' src={logo} alt="Notehub" />
          <span className='ml-1 text-xl md:text-2xl'>Notehub Account</span>
        </div>

        <form className={`${props.mode==='dark'? 'bg-[#322F3D] text-white' : 'bg-white text-gray-700'} shadow-md rounded px-8 pt-6 pb-8 mb-4`} onSubmit={handleSignup} >
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">Name</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight " id="email" type="text" placeholder="Enter your name" name='name' minLength={3} required onChange={onChange} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight " id="email" type="email" placeholder="Enter your email" name='email' required onChange={onChange} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">Password</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight " autoComplete='new-password' id="password" type="password" placeholder="Password" name='password' minLength={5} required onChange={onChange} />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="cpassword">Confirm Password</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" id="cpassword" type="password" placeholder="Confirm Password" minLength={5} required name='cpassword' onChange={onChange} />
          </div>

          <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >Create an account</button>
          <p className="text-sm mt-2 font-light ">Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline">Login here</Link></p>
        </form>
        <p className="text-center text-gray-400 text-xs">
          &copy;2022 Notehub Corp. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Signup;

// {/* <section className="bg-gray-50 dark:bg-gray-900">
// <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//     <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
//         <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
//         Notehub
//     </a>
//     <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                 Create and account
//             </h1>
//             <form className="space-y-4 md:space-y-6" action="#">
//                 <div>
//                     <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//                     <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
//                 </div>
//                 <div>
//                     <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//                     <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
//                 </div>
//                 <div>
//                     <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
//                     <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
//                 </div>
//                 <div className="flex items-start">
//                     <div className="flex items-center h-5">
//                       <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
//                     </div>
//                     <div className="ml-3 text-sm">
//                       <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/">Terms and Conditions</a></label>
//                     </div>
//                 </div>
//                 <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
//                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                     Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
//                 </p>
//             </form>
//         </div>
//     </div>
// </div>
// </section> */}