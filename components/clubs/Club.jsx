import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '../../components/Navbar';
import { faCalendarAlt, faCertificate, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faYoutube, faLinkedin, faFacebookSquare, faInstagramSquare, faTwitterSquare, faLinkedinIn, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import ClubsData from '../../components/data/club_details.json';
import Footer from '../../components/Footer';

import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

export { Club };

function Club (props) {    
    const club = props.data;
    console.log(props);

    const [zone, setZone] = useState(1);
    //Council.map((c) => console.log(c.photo));

    const handleChange = (event) => {
        console.log(event.target.value);
        setZone(event.target.value);
    }

    return (
        <div className="w-full">
            <NavBar />
            <div className="w-full h-full bg-theme-blue border-b-4 border-theme-gold" style={{ position: 'relative' }}>
                {/*<Image className="bg-screen" src={require('../../images/clubs_cover/Central Calcutta.jpg')} alt="Header" objectFit="cover" layout="fill" quality={100} />*/}
                <div className="grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-12">
                    <div className="col-start-1 col-end-2 md:col-start-2 md:col-end-7 grid grid-flow-row grid-cols-1 place-content-center px-2 md:px-0">
                        <div className="text-lg md:text-3xl text-theme-gold bg-theme-black font-text max-w-max p-4 font-bold rounded-t-lg">
                            Rotaract Club of
                        </div>
                        <div className="text-3xl md:text-5xl text-theme-white bg-theme-pink p-4 font-sub-heading">
                            {club.name}
                        </div>
                        <div className="grid grid-rows-1 grid-cols-4 text-lg md:text-xl text-theme-blue bg-theme-white font-sub-heading rounded-b-lg">
                            <div className="col-span-4 grid grid-flow-col">
                                <div className="p-4">
                                    <FontAwesomeIcon icon={faCalendarAlt} /><span className="ml-4">{club.charter_date}</span>
                                </div>
                                <div className="text-center p-4">
                                    <FontAwesomeIcon icon={faCertificate} /><span className="ml-4">{club.club_no}</span>
                                </div>
                            </div>
                            <div className="col-span-4 grid grid-flow-col justify-items-center">
                                {(club.facebook) ? <a href={club.facebook} rel="noreferrer" target="_blank"><div className="hvr-fade w-full h-full rounded p-1 md:p-4"><FontAwesomeIcon icon={faFacebookSquare} /></div></a> : '' }
                                {(club.instagram) ? <a href={club.instagram} rel="noreferrer" target="_blank"><div className="hvr-fade w-full h-full rounded p-1 md:p-4"><FontAwesomeIcon icon={faInstagram} /></div></a> : '' }
                                {(club.twitter) ? <a href={club.twitter} rel="noreferrer" target="_blank"><div className="hvr-fade w-full h-full rounded p-1 md:p-4"><FontAwesomeIcon icon={faTwitterSquare} /></div></a> : '' }
                                {(club.linkedin) ? <a href={club.linkedin} rel="noreferrer" target="_blank"><div className="hvr-fade w-full h-full rounded p-1 md:p-4"><FontAwesomeIcon icon={faLinkedinIn} /></div></a> : '' }
                                {(club.youtube) ? <a href={club.youtube} rel="noreferrer" target="_blank"><div className="hvr-fade w-full h-full rounded p-1 md:p-4"><FontAwesomeIcon icon={faYoutube} /></div></a> : '' }
                                {(club.website) ? <a href={club.website} rel="noreferrer" target="_blank"><div className="hvr-fade w-full h-full rounded p-1 md:p-4"><FontAwesomeIcon icon={faGlobe} /></div></a> : '' }
                            </div>
                        </div>
                    </div>
                    <div className="col-start-1 col-end-2 md:col-start-9 md:col-end-12 w-full h-full border-t-4 md:border-t-0 border-l-4 border-r-4 border-theme-gold">
                        <Image className="" src={require('../../images/clubs/' + club.name + '.jpg')} alt="Header" layout="responsive" quality={100} />
                    </div>
                </div>

            </div>

            <div className="grid grid-flow-row grid-cols-1 md:grid-cols-12 bg-theme-pink">
                <div className="col-start-1 cols-end-2 md:col-start-2 md:col-end-12 grid grid-flow-row grid-cols-1 md:grid-cols-6 bg-theme-white mx-2 md:mx-0">
                    <div className="col-span-1 md:col-span-4 grid grid-cols-1 grid-flow-row py-8 px-4 md:py-12 md:px-12 place-content-start">
                        <div className="text-4xl text-theme-blue border-b-4 border-theme-pink max-w-max font-sub-heading">
                            About Us
                        </div>
                        <div className="text-xl text-theme-black font-text mt-8">
                            {club.desc}
                        </div>
                        <div className="grid grid-rows-1 grid-flow-col justify-items-center gap-8 md:gap-40 py-8 md:py-24">
                            <div className="">
                                <div className="rounded-xl bg-white shadow-xl hvr-underline-from-center hvr-float p-1">
                                    <Image className="rounded-xl" width={300} height={300} quality={100} src={require('../../images/president/' + club.name + '.jpg')} alt='RCCIIT' />
                                </div>
                                <div className="text-center bg-theme-black text-theme-gold border-b-4 border-theme-blue rounded-t-lg py-2 text-lg md:text-2xl uppercase font-sub-heading mt-1">
                                    {club.pn}
                                </div>
                                <div className="text-center text-md md:text-xl uppercase text-theme-white bg-theme-blue border-b-4 border-theme-pink rounded-b-lg font-sub-heading">
                                    President
                                </div>
                                <div className="grid grid-flow-col justify-items-center text-theme-blue">
                                    <a href={'mailto:' + club.pe} rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faEnvelope} /></div></a>
                                    <a href={'tel:' + '+91' + club.pm} rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faPhone} /></div></a>
                                </div>
                            </div>
                            <div>
                                <div className="rounded-xl border- border-theme-pink bg-white shadow-xl hvr-underline-from-center hvr-float p-1">
                                    <Image className="rounded-xl" width={300} height={300} quality={100} src={require('../../images/secretary/' + club.name + '.jpg')} alt='RCCIIT' />
                                </div>
                                <div className="text-center bg-theme-black text-theme-gold border-b-4 border-theme-blue rounded-t-lg py-2 text-lg md:text-2xl uppercase font-sub-heading mt-1">
                                    {club.sn}
                                </div>
                                <div className="text-center text-md md:text-xl uppercase text-theme-white bg-theme-blue border-b-4 border-theme-pink rounded-b-lg font-sub-heading">
                                    Secretary
                                </div>
                                <div className="grid grid-flow-col justify-items-center text-theme-blue">
                                    <a href={'mailto:' + club.se} rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faEnvelope} /></div></a>
                                    <a href={'tel:' + '+91' + club.sm} rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faPhone} /></div></a>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 text-2xl md:text-4xl pb-4 md:pb-12 text-center font-sub-heading text-theme-blue">
                            <div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl hvr-underline-from-center hvr-float rounded">
                                <div className="col-span-1">
                                    <Image src={require('../../images/members.svg')} alt="Members Icon" />
                                </div>
                                <div className="col-span-1 mt-3">
                                    <VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
                                        {({ isVisible }) => (
                                            <div className="text-4xl align-middle h-8 font-bold">
                                                {isVisible ? <CountUp duration={1} end={50} /> : null}
                                            </div>
                                        )}
                                    </VisibilitySensor>
                                    <p className="text-xl mt-3 font-sub-heading">Members</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl hvr-underline-from-center hvr-float rounded">
                                <div className="col-span-1">
                                    <Image src={require('../../images/project.svg')} alt="Projects Icon" />
                                </div>
                                <div className="col-span-1 mt-3">
                                    <VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
                                        {({ isVisible }) => (
                                            <div className="text-4xl align-middle h-8 font-bold">
                                                {isVisible ? <CountUp duration={1} end={100} /> : null}
                                            </div>
                                        )}
                                    </VisibilitySensor>
                                    <p className="text-xl mt-3 font-sub-heading">Projects</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl hvr-underline-from-center hvr-float rounded">
                                <div className="col-span-1">
                                    <Image src={require('../../images/meeting.svg')} alt="Zones Icon" />
                                </div>
                                <div className="col-span-1 mt-3">
                                    <VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
                                        {({ isVisible }) => (
                                            <div className="text-4xl align-middle h-8 font-bold">
                                                {isVisible ? <CountUp duration={1} end={15} /> : null}
                                            </div>
                                        )}
                                    </VisibilitySensor>
                                    <p className="text-xl mt-3 font-sub-heading">Meetings</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl hvr-underline-from-center hvr-float rounded">
                                <div className="col-span-1">
                                    <Image src={require('../../images/bulletin.svg')} alt="Zones Icon" />
                                </div>
                                <div className="col-span-1 mt-3">
                                    <VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
                                        {({ isVisible }) => (
                                            <div className="text-4xl align-middle h-8 font-bold">
                                                {isVisible ? <CountUp duration={1} end={8} /> : null}
                                            </div>
                                        )}
                                    </VisibilitySensor>
                                    <p className="text-xl mt-3 font-sub-heading">Bulletins</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 grid grid-cols-1 grid-flow-row p-12 place-content-start">
                        <div className="text-2xl text-theme-blue font-sub-heading">
                            Type of Club
                        </div>
                        <div className="text-xl text-theme-black font-text mt-2">
                            {club.type}
                        </div>
                        <div className="text-2xl text-theme-blue font-sub-heading mt-8">
                            Meets At
                        </div>
                        <div className="text-xl text-theme-black font-text mt-2">
                            {club.meeting_venue}
                        </div>
                        <div className="text-2xl text-theme-blue font-sub-heading mt-8">
                            Meets On
                        </div>
                        <div className="text-xl text-theme-black font-text mt-2">
                            {club.meeting_day}, once in {club.meeting_periodicity} weeks
                        </div>
                        <div className="text-2xl text-theme-blue font-sub-heading mt-8">
                            Meets From
                        </div>
                        <div className="text-xl text-theme-black font-text mt-2">
                            {club.meeting_time}
                        </div>
                        <div className="text-2xl text-theme-blue font-sub-heading mt-8">
                            Charter President
                        </div>
                        <div className="text-xl text-theme-black font-text mt-2">
                            {club.charter_president}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
 
        </div>
    )
}