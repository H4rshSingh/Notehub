import React, { useEffect, useState } from 'react'
import logo from './assets/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { DarkMode, LightMode } from '@mui/icons-material';

function Navbar(props) {
    const [active, setActive] = useState(false)
    function showMenu() {
        setActive(!active);
    }
    
    const [userDetail, setUserDetail] = useState([])
    // const host = "http://localhost:5000";
    const host = "https://notehub.up.railway.app";
    const getUser = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setUserDetail(json);
    }

    let location = useLocation();
    useEffect(() => {
        getUser();
    }, [location]);


    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }


    return (
        <>
            <div className={`${props.mode === 'dark' ? 'bg-[#1A1A2E] border-b border-gray-600' : 'bg-[#FFF8F3] border-b border-amber-400'} w-full ${props.mode === 'dark' ? 'text-white' : 'text-black'} flex justify-between px-4 py-2 items-center fixed z-50`}>
                <div className="text-2xl font-bold text-center flex items-center">
                    <img className='w-6 md:w-8' src={logo} alt="Notehub" />
                    <span className='pl-2 text-2xl md:text-4xl'>Notehub</span>
                </div>

                <nav >
                    <div>
                        <div className="absolute right-6 md:hidden top-2">
                            <MenuIcon onClick={showMenu} fontSize="large" className='scale-90 cursor-pointer' />
                        </div>

                        <ul className={`hidden md:flex gap-4 px-6 py-2 text-sm  font-medium ${props.mode === 'dark' ? 'bg-white/10' : 'bg-gray-400/10'} rounded-lg items-center`}>

                            <li className={`hover:text-amber-500 uppercase ${location.pathname === '/' ? 'text-red-500 font-bold' : ''}`}><Link aria-current="page" to='/'>NOtes</Link></li>
                            {/* <li className={`hover:text-amber-500 uppercase ${location.pathname === '/about' ? 'text-red-500 font-bold' : ''}`}><Link to='/about'>About</Link></li> */}

                            {!localStorage.getItem('token') ?
                                <div className='space-x-1 ml-16 '>
                                    <Link to="/login"><button type="button" className="w-20 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded text-sm px-2 py-1.5 text-center ">Login</button></Link>
                                    <Link to="/signup"><button type="button" className="w-20 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded text-sm px-2 py-1.5 text-center ">Sign up</button></Link>
                                </div>
                                :
                                <div className='flex gap-6'>
                                    <div className='ml-16 text-center'>
                                        <h1 className='text-green-500 space-x-4 uppercase'><span>{userDetail.name}</span></h1>
                                        <h1 className='text-xs'>{userDetail.email}</h1>
                                    </div>
                                    <button type="button" className="w-14 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded text-xs px-1  text-center" onClick={handleLogout}>Logout</button>
                                </div>
                            }

                            <label htmlFor="toggleA" className="flex items-center cursor-pointer">
                                <div className={`mr-3 ml-10 text-sm font-medium hover:text-amber-600 text-${props.mode === 'dark' ? 'white' : 'black'}`}>
                                    <LightMode />
                                </div>
                                <div className="relative">
                                    <input type="checkbox" id="toggleA" className='sr-only' onClick={props.toggleMode} />
                                    <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                                    <div className="dot absolute left-1 top-1 bg-amber-400 w-6 h-6 rounded-full transition"></div>
                                </div>
                                <div className={`ml-3 text-sm font-medium hover:text-amber-600 text-${props.mode === 'dark' ? 'white' : 'black'}`}>
                                    <DarkMode />
                                </div>
                            </label>
                        </ul>
                    </div>
                </nav>
            </div >
            <div>
                <ul className={active ? `flex-col flex items-center z-40 fixed h-screen inset-0 left-1/3 backdrop-blur-lg  ${props.mode === 'dark' ? 'bg-[#1A1A2E]/40' : 'bg-[#F9F3F3]/40'} gap-8 justify-center p-8 font-medium md:hidden` : 'hidden'}>

                    {!localStorage.getItem('token') ?
                        <div className='space-x-1'>
                            <Link to="/login"><button type="button" className="w-16 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded text-xs px-2 py-1.5 text-center ">Login</button></Link>

                            <Link to="/signup"><button type="button" className="w-16 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded text-xs px-2 py-1.5 text-center ">Sign up</button></Link>
                        </div>
                        :
                        <div className='flex flex-col items-center justify-center gap-6'>
                            <div className='text-center'>
                                <h1 className='text-green-500 uppercase'><span>{userDetail.name}</span></h1>
                                <h1 className={`${props.mode === 'dark' ? 'text-gray-200' : 'text-black'} text-xs`}>{userDetail.email}</h1>
                            </div>
                            <button type="button" className="w-16 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded text-xs px-2 py-1  text-center" onClick={handleLogout}>Logout</button>
                        </div>
                    }

                    <li className={`hover:text-amber-600 uppercase ${location.pathname === '/' ? 'text-red-500 font-bold' : ''}`}><Link aria-current="page" to='/'>Notes</Link></li>
                    {/* <li className={`hover:text-amber-600 uppercase ${location.pathname === '/active' ? 'text-red-500 font-bold' : ''}`}><Link to='/about'>About</Link></li> */}

                    <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                        <div className={`mr-3 text-sm font-medium hover:text-amber-600 text-${props.mode === 'dark' ? 'white' : 'black'}`}>
                            <LightMode />
                        </div>
                        <div className="relative">
                            <input type="checkbox" id="toggleB" className='sr-only' onClick={props.toggleMode} />
                            <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                            <div className="dot absolute left-1 top-1 bg-amber-400 w-6 h-6 rounded-full transition"></div>
                        </div>
                        <div className={`ml-3 text-sm font-medium hover:text-amber-600 text-${props.mode === 'dark' ? 'white' : 'black'}`}>
                            <DarkMode />
                        </div>
                    </label>

                    <div className={`${props.mode==='dark'? 'text-white' : 'text-black'} inline-block space-x-4`}>
                        <a href="https://github.com/H4rshSingh"><GitHubIcon /></a>
                        <a href="https://twitter.com/H4rshSingh"><TwitterIcon/></a>
                        <a href="https://www.linkedin.com/in/h4rshsingh"><LinkedInIcon/></a>
                    </div>

                </ul>
            </div>
        </>
    )
}
export default Navbar;
