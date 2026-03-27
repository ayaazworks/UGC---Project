import { DollarSignIcon, FolderEditIcon, GalleryHorizontalEnd, MenuIcon, SparkleIcon, XIcon } from 'lucide-react';
import { GhostButton, PrimaryButton } from './Buttons';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useClerk, useUser, UserButton, useAuth } from '@clerk/react';
import api from '../configs/axios';
import toast from 'react-hot-toast';

export default function Navbar() {
    const navigate = useNavigate();
    const { user } = useUser();
    const { openSignIn, openSignUp } = useClerk();
    const [isOpen, setIsOpen] = useState(false);
    const [credits, setCredits] = useState(0);
    const { pathname } = useLocation()
    const { getToken } = useAuth()

    const navLinks = [
        { name: 'Home', href: '/#' },
        { name: 'Create', href: '/generate' },
        { name: 'Community', href: '/community' },
        { name: 'Plans', href: '/plans' },
    ];

    const getUserCredits = async () => {
        try {
            const token = await getToken();
            const { data } = await api.get('/api/user/credits', { headers: { Authorization: `Bearer ${token}` } });
            setCredits(data.credits)
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message);
            console.log(error);
        }
    }

    useEffect(() => {
        if (user) {
            (async () => await getUserCredits())();
        }
    }, [user, pathname])

    return (
        <motion.nav className='fixed top-5 left-0 right-0 z-50 px-4'
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
        >
            <div className='max-w-6xl mx-auto flex items-center justify-between bg-black/50 backdrop-blur-md border border-white/4 rounded-2xl p-3'>
                <Link to='/' onClick={() => scrollTo(0, 0)}>
                    <img src={assets.logo} alt="logo" className="h-8" />
                </Link>

                {/* Desktop Nav Links */}
                <div className='hidden md:flex items-center gap-8 text-sm font-medium text-gray-300'>
                    {navLinks.map((link) => (
                        <Link onClick={() => scrollTo(0, 0)} to={link.href} key={link.name} className="hover:text-white transition">
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Auth/User Section */}
                <div className='hidden md:flex items-center gap-3'>
                    {!user ? (
                        <>
                            <button onClick={() => openSignIn()} className='text-sm font-medium text-gray-300 hover:text-white transition'>
                                Sign in
                            </button>
                            <PrimaryButton onClick={() => openSignUp()} className='text-xs sm:inline-block'>
                                Get Started
                            </PrimaryButton>
                        </>
                    ) : (
                        <div className='flex items-center gap-2'>
                            <GhostButton onClick={() => navigate('/plans')} className='border-none text-gray-300 sm:py-1.5'>
                                Credits: {credits}
                            </GhostButton>
                            <UserButton>
                                <UserButton.MenuItems>
                                    <UserButton.Action label='Generate' labelIcon={<SparkleIcon size={14} />} onClick={() => navigate('/generate')} />
                                    <UserButton.Action label='My Generations' labelIcon={<FolderEditIcon size={14} />} onClick={() => navigate('/my-generations')} />
                                    <UserButton.Action label='Community' labelIcon={<GalleryHorizontalEnd size={14} />} onClick={() => navigate('/community')} />
                                    <UserButton.Action label='Plans' labelIcon={<DollarSignIcon size={14} />} onClick={() => navigate('/plans')} />
                                </UserButton.MenuItems>
                            </UserButton>
                        </div>
                    )}
                </div>

                {!user && <button onClick={() => setIsOpen(!isOpen)} className='md:hidden text-white'>
                    <MenuIcon className='size-6' />
                </button>}
                {user && <div className='md:hidden'><UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Action label='Generate' labelIcon={<SparkleIcon size={14} />} onClick={() => navigate('/generate')} />
                        <UserButton.Action label='My Generations' labelIcon={<FolderEditIcon size={14} />} onClick={() => navigate('/my-generations')} />
                        <UserButton.Action label='Community' labelIcon={<GalleryHorizontalEnd size={14} />} onClick={() => navigate('/community')} />
                        <UserButton.Action label='Plans' labelIcon={<DollarSignIcon size={14} />} onClick={() => navigate('/plans')} />
                    </UserButton.MenuItems>
                </UserButton></div>}
            </div>

            {/* Mobile Menu */}
            <div className={`flex flex-col items-center justify-center gap-6 text-lg font-medium fixed inset-0 bg-black/40 backdrop-blur-md z-50 transition-all duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                {navLinks.map((link) => (
                    <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className='text-white'>
                        {link.name}
                    </a>
                ))}

                {!user ? (
                    <div className='flex flex-col items-center gap-4'>
                        <button onClick={() => { openSignIn(); setIsOpen(false); }} className='text-lg font-medium text-gray-300 hover:text-white transition'>
                            Sign in
                        </button>
                        <PrimaryButton onClick={() => { openSignUp(); setIsOpen(false); }}>
                            Get Started
                        </PrimaryButton>
                    </div>
                ) : (
                    <div className='flex flex-col items-center gap-4'>
                        <GhostButton onClick={() => { navigate('/plans'); setIsOpen(false); }} className='border-none text-gray-300'>
                            Credits:
                        </GhostButton>
                        <UserButton />
                    </div>
                )}

                <button
                    onClick={() => setIsOpen(false)}
                    className="mt-6 rounded-full bg-white p-2 text-gray-800 ring-white active:ring-2"
                >
                    <XIcon />
                </button>
            </div>
        </motion.nav >
    );
};