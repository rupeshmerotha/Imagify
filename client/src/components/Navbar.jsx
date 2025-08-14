import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const { setShowLogin, user, credit, logout } = useContext(AppContext)
    const [showMenu, setShowMenu] = useState(false)
    const navigate = useNavigate()

    React.useEffect(() => {
        const handleClick = (e) => {
            if (!e.target.closest('.profile-menu')) setShowMenu(false)
        }
        if (showMenu) document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [showMenu])

    return (
        <div className='flex items-center justify-between py-4'>

            <Link to='/'><img className='w-28 sm:w-32 lg:w-40' src={assets.logo} alt="" /></Link>

            <div>
                {
                    user
                        ? <div className='flex items-center gap-2 sm:gap-3'>
                            <button onClick={() => navigate('/buy')} className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
                                <img className='w-5' src={assets.credit_star} alt="" />
                                <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits left : {credit}</p>
                            </button>
                            <p className='text-gray-600 max-sm:hidden pl-4'>Hi, {user.name}</p>
                            <div className='relative profile-menu'>
                                <img
                                    className='w-10 drop-shadow cursor-pointer'
                                    src={assets.profile_icon}
                                    alt=""
                                    onClick={() => setShowMenu((prev) => !prev)}
                                />
                                <div className={`
                                absolute top-0 right-0 z-10 text-black rounded pt-12
                                ${showMenu ? 'block' : 'hidden'}
                                group-hover:block
                            `}>
                                    <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                                        <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        : <div className='flex items-center gap-2 sm:gap-5'>
                            <p onClick={() => navigate('/buy')} className='cursor-pointer'>Pricing</p>
                            <button onClick={() => setShowLogin(true)} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 sm:py-2 text-sm rounded-full'>
                                Login
                            </button>
                        </div>
                }
            </div>
        </div>
    )
}

export default Navbar