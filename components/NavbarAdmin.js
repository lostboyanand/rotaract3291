import { useContext } from 'react';
import Link from 'next/link';
import { AccountContext } from './Account';

export default function NavbarAdmin(props) {
    debugger;
    const { logout } = useContext(AccountContext);
    return (
        <>
            <nav>
                <div className="bg-theme-black font-sub-heading">
                    <div class="flex justify-between h-16 px-10 shadow items-center">
                        <div class="flex items-center space-x-8">
                            <h1 class="text-xl lg:text-2xl font-bold cursor-pointer text-theme-gold">Rotaract District 3291</h1>
                            <div class="hidden text-theme-gold md:flex justify-around space-x-4">
                                <Link href="/">Home</Link>
                            </div>
                            <div class="hidden text-theme-gold md:flex justify-around space-x-4">
                                <Link href="/admin">Dashboard</Link>
                            </div>
                        </div>
                        <div class="flex space-x-4 items-center">
                            <button href="#" onClick={logout} class="bg-theme-gold px-4 py-2 rounded text-theme-black hover:bg-theme-blue hover:text-theme-white text-sm">{(props.session) ? 'Logout' : 'Login'}</button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}