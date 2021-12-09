import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useContext, useEffect } from "react";
import { Account, AccountContext } from "../components/Account";
import Login from '../components/Login';
import NavbarAdmin from './NavbarAdmin';
import { MEMBERS_API, MEETINGS_API, PROJECTS_API, BULLETINS_API, COLLABORATIONS_API, PARTICIPATIONS_API } from './urls';
import axios from 'axios';

export default function Dashboard() {
    const [data, setData] = useState({
        'members': 0,
        'projects': 0,
        'meetings': 0,
        'bulletins': 0,
        'participations': 0,
        'collaborations': 0,
    });
    const [session, setSession] = useState();

    const { getSession, logout } = useContext(AccountContext);
  
    useEffect(() => {
        getSession().then((sessionData) => {
            debugger;
            console.log("Session: ", sessionData);
            setSession(sessionData);

            var membersRequest = axios.get(MEMBERS_API + '/members' + sessionData['url']);
            var projectsRequest = axios.get(PROJECTS_API + '/projects' + sessionData['url']);
            var meetingsRequest = axios.get(MEETINGS_API + '/meetings' + sessionData['url']);
            var bulletinsRequest = axios.get(BULLETINS_API + '/bulletins' + sessionData['url']);
            var participationsRequest = axios.get(PARTICIPATIONS_API + '/participations' + sessionData['url']);
            var collaborationsRequest = axios.get(COLLABORATIONS_API + '/collaborations' + sessionData['url']);
            debugger;
            axios.all([membersRequest, projectsRequest, meetingsRequest, bulletinsRequest, participationsRequest, collaborationsRequest]).then(
                axios.spread((...responses) => {
                    debugger;
                    setData({
                        'members': responses[0].data,
                        'projects': responses[1].data,
                        'meetings': responses[2].data,
                        'bulletins': responses[3].data,
                        'participations': responses[4].data,
                        'collaborations': responses[5].data,
                    })
                })
            ).catch(error => {
                debugger;
            });
        });
    }, []);

    useEffect(() => {
        console.log('data: ', data);
    }, [data]);

    return (
        <>
            {(session) ?
                <div className="w-full">
                    <NavbarAdmin session={session} />
                    <div className="grid grid-flow-row grid-cols-1 my-16">
                        <div className="col-span-1 text-center text-theme-black font-sub-heading my-2">
                            <div class="lg:px-4">
                                <div class="p-2 bg-theme-blue items-center text-theme-white leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                                    <span class="flex rounded-full bg-theme-black text-theme-gold uppercase px-2 py-1 text-xs font-bold mr-3">Info</span>
                                    <span class="mr-2 text-left flex-auto font-text">Deadline to submit reports for 1st Quarterly Report is 31/10/2021 (11:59PM). Any submissions post deadline won't be scored.</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 text-center text-3xl text-theme-black font-sub-heading my-8">
                            {(session['clubName'] !== undefined) ? ('Rotaract Club of ' + session['clubName']) : ('Welcome, ' + session['username'])}
                        </div>
                        <div className="grid grid-cols-3 px-12 text-4xl pb-12 text-center font-sub-heading text-theme-blue">
                            <Link href="/members/">
                                <div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl hvr-underline-from-center hvr-float rounded">
                                    <div className="col-span-1">
                                        <Image src={require('../images/members.svg')} alt="Members Icon" />
                                    </div>
                                    <div className="col-span-1 mt-3">
                                                <div className="text-4xl align-middle h-8 font-bold">
                                                    {data['members'].length}
                                                </div>
                                        <p className="text-xl mt-3 font-sub-heading">Members</p>
                                    </div>
                                </div>
                            </Link>
                            <Link href="/projects/">
                                <div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl hvr-underline-from-center hvr-float rounded">
                                    <div className="col-span-1">
                                        <Image src={require('../images/project.svg')} alt="Projects Icon" />
                                    </div>
                                    <div className="col-span-1 mt-3">
                                                <div className="text-4xl align-middle h-8 font-bold">
                                                    {data['projects'].length}
                                                </div>
                                        <p className="text-xl mt-3 font-sub-heading">Projects</p>
                                    </div>
                                </div>
                            </Link>
                            <Link href="/meetings/">
                                <div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl hvr-underline-from-center hvr-float rounded">
                                    <div className="col-span-1">
                                        <Image src={require('../images/meeting.svg')} alt="Zones Icon" />
                                    </div>
                                    <div className="col-span-1 mt-3">
                                        <div className="text-4xl align-middle h-8 font-bold">
                                            {data['meetings'].length}
                                        </div>
                                        <p className="text-xl mt-3 font-sub-heading">Meetings</p>
                                    </div>
                                </div>
                            </Link>
                            <Link href="/bulletins/">
                                <div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl hvr-underline-from-center hvr-float rounded">
                                    <div className="col-span-1">
                                        <Image src={require('../images/bulletin.svg')} alt="Zones Icon" />
                                    </div>
                                    <div className="col-span-1 mt-3">
                                        <div className="text-4xl align-middle h-8 font-bold">
                                                    {data['bulletins'].length}
                                        </div>
                                        <p className="text-xl mt-3 font-sub-heading">Bulletins</p>
                                    </div>
                                </div>
                            </Link>
                            <Link href="/participations/">
                                <div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl hvr-underline-from-center hvr-float rounded">
                                    <div className="col-span-1">
                                        <Image src={require('../images/bulletin.svg')} alt="Zones Icon" />
                                    </div>
                                    <div className="col-span-1 mt-3">
                                        <div className="text-4xl align-middle h-8 font-bold">
                                                    {data['participations'].length}
                                        </div>
                                        <p className="text-xl mt-3 font-sub-heading">Participation</p>
                                    </div>
                                </div>
                            </Link>
                            <Link href="/collaborations/">
                                <div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl hvr-underline-from-center hvr-float rounded">
                                    <div className="col-span-1">
                                        <Image src={require('../images/collab.svg')} alt="Collaboration Icon" />
                                    </div>
                                    <div className="col-span-1 mt-3">
                                        <div className="text-4xl align-middle h-8 font-bold">
                                                    {data['collaborations'].length}
                                        </div>
                                        <p className="text-xl mt-3 font-sub-heading">Collaboration</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                :
                <Login />
            }
        </>
    );
}