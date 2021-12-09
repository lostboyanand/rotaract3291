import React from "react";
import { slide as Menu } from "react-burger-menu";
import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar() {
    var styles = {
        /*bmItem: {
            display: 'inline-block',
            textDecoration: 'none',
            marginBottom: '10px',
            color: '#ffd166',
            fontSize: '0.9rem',
            textAlign: 'left',
            margin: '1.25rem 0',
            marginTop: 0,
        },
        bmItemList: {
            color: '#ffba08',
        },*/
        bmBurgerButton: {
            position: 'fixed',
            width: '72px',
            height: '108px',
            right: '36px',
            top: 0,
            padding: '5px',
            backgroundColor: '#ffba08',
        },
        bmBurgerBars: {
            background: '#ffba08',
        },
        bmCrossButton: {
            height: '36px',
            width: '36px',
        },
        bmCross: {
            background: '#fff',
        },
        bmMenu: {
            background: '#073b4c',
            padding: '2.5em 2.25em 0',
        },
        bmMorphShape: {
            fill: '#373a47',
        },
        bmOverlay: {
            background: 'rgba(0, 0, 0, 0.3)',
        }
    }

  return (
        <Menu styles={ styles } noOverlay customBurgerIcon={<Image width={72} src={require('../images/menu-1.svg')} alt="Menu" />} right>
            <div className="grid grid-flow-row grid-cols-1 text-left text-xl font-sub-heading">
                <div className="my-4">
                    <Link className="" href="/">
                        Home
                    </Link>
                </div>
                <div className="my-4">
                    <a className="" href="https://www.dge3291.org" target="_blank" rel="noreferrer">
                        RI District 3291
                    </a>
                </div>
                <div className="my-4">
                    <a className="" href="https://www.facebook.com/rotaractdistrict3291/videos/950488615783630" target="_blank" rel="noreferrer">
                        DRR Theme
                    </a>
                </div>
                <div className="my-4">
                    <Link className="" href="/club">
                        Clubs
                    </Link>
                </div>
                <div className="my-4">
                    <Link className="" href="/annual-plan">
                        Annual Plan
                    </Link>
                </div>
                <div className="my-4">
                    <Link className="" href="/district-council">
                        District Council
                    </Link>
                </div>
                <div className="my-4">
                    <Link className="" href="/">
                        Leaderboard
                    </Link>
                </div>
                <div className="my-4">
                    <Link className="" href="/">
                        Downloads
                    </Link>
                </div>
            </div>
        </Menu>
    );
};