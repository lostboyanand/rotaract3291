import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '../components/Navbar';
import { faFacebookF, faInstagram, faYoutube, faLinkedin, faFacebookSquare, faInstagramSquare, faTwitterSquare, faLinkedinIn, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import ClubsData from '../components/data/club_details.json';
import { FormControl, MenuItem, Select } from '@material-ui/core';


export default function Clubs() {    
    const [zone, setZone] = useState(1);
    //Council.map((c) => console.log(c.photo));

    const handleChange = (event) => {
        console.log(event.target.value);
        setZone(event.target.value);
    }

    return (
        <div className="w-full bg-theme-white">

            <NavBar />
            <div className="w-full h-40 text-center" style={{ position: 'relative' }}>
                <Image className="bg-screen" src={require('../images/bg-3.jpg')} alt="Header" objectFit="cover" layout="fill" quality={100} />
                <div className="text-2xl text-theme-white">Hello, there!</div>
                <div className="text-theme-white font-sub-heading text-5xl md:text-5xl py-3">CLUBS</div>
            </div>

            <div className="grid grid-flow-rows grid-cols-1 px-16 text-center">
                <div>
                    <FormControl variant="outlined" className="xl:w-2/4 xs:w-3/4 p-4">
                        <Select
                        labelId="council-select"
                        id="council-select"
                        value={zone}
                        onChange={(event) => handleChange(event)}
                        >
                            <MenuItem value={1}>Zone 1 - House Baratheon</MenuItem>
                            <MenuItem value={2}>Zone 2 - House Martell</MenuItem>
                            <MenuItem value={3}>Zone 3 - House Greyjoy</MenuItem>
                            <MenuItem value={4}>Zone 4 - House Arryn</MenuItem>
                            <MenuItem value={5}>Zone 5 - House Targaryen</MenuItem>
                            <MenuItem value={6}>Zone 6 - House Lannister</MenuItem>
                            <MenuItem value={7}>Zone 7 - House Tyrell</MenuItem>
                            <MenuItem value={8}>Zone 8 - House Stark</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="grid grid-flow-rows grid-cols-5 px-16">
                {ClubsData.map((club) => {
                    return(
                        <div key={club.name} style={{  display: (club.zone === zone)?'':'none' }} className="grid grid-cols-1 grid-flow-row text-theme-gold rounded-xl p-1 m-4">
                            <a href="">
                                <Link href='/'>
                                    <div className="grid grid-cols-1 grid-flow-row">
                                        <div className="rounded-xl border- border-theme-pink bg-white hvr-underline-from-center hvr-float p-1">
                                            <Image className="rounded-xl" src={require('../images/clubs/'+ club.name +'.jpg')} alt='RCCIIT' />
                                        </div>
                                        <div className="text-center bg-theme-black text-theme-gold border-b-4 border-theme-blue rounded-lg py-2 text-2xl uppercase font-sub-heading mt-1">
                                            {club.name}
                                        </div>
                                    </div>
                                </Link>
                            </a>
                            <div className="text-center text-theme-blue mt-1">
                                <div className="grid grid-rows-1 grid-flow-col justify-items-center">
                                    {(club.facebook) ? <a href={club.facebook} rel="noreferrer" target="_blank"><div className="hvr-fade w-full h-full rounded p-4"><FontAwesomeIcon icon={faFacebookSquare} /></div></a> : '' }
                                    {(club.instagram) ? <a href={club.instagram} rel="noreferrer" target="_blank"><div className="hvr-fade w-full h-full rounded p-4"><FontAwesomeIcon icon={faInstagram} /></div></a> : '' }
                                    {(club.twitter) ? <a href={club.twitter} rel="noreferrer" target="_blank"><div className="hvr-fade w-full h-full rounded p-4"><FontAwesomeIcon icon={faTwitterSquare} /></div></a> : '' }
                                    {(club.linkedin) ? <a href={club.linkedin} rel="noreferrer" target="_blank"><div className="hvr-fade w-full h-full rounded p-4"><FontAwesomeIcon icon={faLinkedinIn} /></div></a> : '' }
                                    {(club.youtube) ? <a href={club.youtube} rel="noreferrer" target="_blank"><div className="hvr-fade w-full h-full rounded p-4"><FontAwesomeIcon icon={faYoutube} /></div></a> : '' }
                                    {(club.website) ? <a href={club.website} rel="noreferrer" target="_blank"><div className="hvr-fade w-full h-full rounded p-4"><FontAwesomeIcon icon={faGlobe} /></div></a> : '' }
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}