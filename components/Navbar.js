import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Image from 'next/image';
import { Transition, Menu } from "@headlessui/react";
import LogoGolden from '../images/district-logo-golden.png';
import Link from 'next/link';
import logo from '../images/district-logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
    const [view, setView] = useState(true);

    const [isOpen, setIsOpen] = useState(false);
    const [showAboutUs, setShowAboutUs] = useState(false);
    const [navClass, setNavClass] = useState("grid grid-rows-1 grid-flow-col");

    useEffect(() => { window.addEventListener('scroll', handleScroll)}, []);
    useEffect(() => { console.log(view)}, [view]);

    const handleScroll = () => {

        //console.log(view);
        if(window.pageYOffset>0){
            // user is scrolled
            setView(false);
        }else{
            // user is at top of page
            setView(true);
        }

    }

    const handleAboutUs = () => {
        if (showAboutUs === true) {
            setShowAboutUs(false);
            setNavClass("grid grid-rows-1 grid-flow-col");
        } else {
            setShowAboutUs(true);
            setNavClass("grid grid-rows-2 grid-flow-col");
        }
    }

    return (
        <>
            <nav className='flex items-center flex-wrap md:px-16 border-b-4' style={{ borderColor: '#ffba08', backgroundColor: '#0f1108' }}>
                <div className="w-screen grid grid-rows-1 md:grid-rows-1 grid-cols-8 md:grid-cols-10">
                    <div className="col-start-1 col-end-4 md:col-start-1 md:col-end-2 text-left">
                        <Link href='/'>
                            <a className='inline-flex items-center p-1'>
                                <div className='p-4'>
                                    <Image src={LogoGolden} alt="Logo" height={50} width={118.6} />
                                    <span className='ml-1 md:ml-4 text-xl text-white tracking-wide'>
                                    </span>
                                </div>
                            </a>
                        </Link>
                    </div>
                    <div className="hidden md:block col-start-3 col-end-10 font-heading grid grid-rows-1 grid-flow-col text-sm">
                            <div className="row-span-1 grid grid-cols-5 p-4">
                                <div className='p-4 text-white tracking-wide'>
                                    About Us
                                </div>
                                <Link href='/annual-plan'>
                                    <a href="">
                                        <div className='p-4 text-white tracking-wide'>
                                            Annual Plan
                                        </div>
                                    </a>
                                </Link>
                                <Link href='/district-council'>
                                    <a href="">
                                        <div className='p-4 text-white tracking-wide'>
                                            Council
                                        </div>
                                    </a>
                                </Link>
                                <Link href='/club'>
                                    <a href="">
                                        <div className='p-4 text-white tracking-wide'>
                                            Clubs
                                        </div>
                                    </a>
                                </Link>
                                <div className='p-4 text-white tracking-wide'>
                                    Leaderboard
                                </div>
                            </div>
                    </div>
                    <div className="col-span-1 text-right text-theme-white">
                        <Sidebar />
                    </div>
                </div>
            </nav>
        </>
    )
}