import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '../components/Navbar';
import { faFacebookF, faInstagram, faYoutube, faLinkedin, faFacebookSquare, faInstagramSquare, faTwitterSquare, faLinkedinIn, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGlobe, faPhoneAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Council from '../components/data/council.json';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import Footer from '../components/Footer';

export default DistrictCouncil;

function DistrictCouncil() {
    const [team, setTeam] = useState(1);
    //Council.map((c) => console.log(c.photo));

    const handleChange = (event) => {
        console.log(event.target.value);
        setTeam(event.target.value);
    }

    return (
        <div className="w-full bg-theme-white">
            <NavBar />
            <div className="w-full h-40 text-center" style={{ position: 'relative' }}>
                <Image className="bg-screen" src={require('../images/bg-3.jpg')} alt="Header" objectFit="cover" layout="fill" quality={100} />
                <div className="text-2xl text-theme-white">Hello, there!</div>
                <div className="text-theme-white font-sub-heading text-5xl md:text-5xl py-3">District Council</div>
            </div>

            <div className="grid grid-flow-row grid-cols-1 px-1 md:px-16 text-center">
                <div>
                    <FormControl variant="outlined" className="xl:w-2/4 xs:w-3/4 p-4">
                        <Select
                        labelId="council-select"
                        id="council-select"
                        value={team}
                        onChange={(event) => handleChange(event)}
                        >
                            <MenuItem value={1}>Leaders RY 2021 - 22</MenuItem>
                            <MenuItem value={2}>Mentors & Advisors</MenuItem>
                            <MenuItem value={3}>DRR's Office</MenuItem>
                            <MenuItem value={4}>District Secretariat</MenuItem>
                            <MenuItem value={5}>Admin Team</MenuItem>
                            <MenuItem value={6}>Events & Projects Team</MenuItem>
                            <MenuItem value={7}>Coordination Team</MenuItem>
                            <MenuItem value={8}>Editorial & Others</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className="grid grid-flow-rows grid-cols-1 md:grid-cols-5 px-1 md:px-16 mt-4 md:mt-1">
                {Council.map((official) => {
                    return(
                        <div key={official.name} style={{  display: (official.team === team)?'':'none' }} className="grid grid-cols-1 grid-flow-row text-theme-gold rounded-xl p-1 m-1 md:m-4">
                            <div className="grid grid-cols-1 grid-flow-row">
                                <div className="rounded-xl border- border-theme-pink bg-white hvr-underline-from-center hvr-float p-1">
                                    <Image className="rounded-xl" src={require('../images/council/'+ official.photo +'.jpg')} alt={official.photo} />
                                </div>
                                <div className="text-center bg-theme-black text-theme-gold rounded-t-lg py-2 text-xl md:text-2xl uppercase font-sub-heading mt-1">
                                    {official.photo}
                                </div>
                                <div className="text-center bg-theme-blue text-theme-white border-b-4 border-theme-pink rounded-b-lg py-2 text-md md:text-lg font-sub-heading">
                                    {official.desgn}
                                </div>
                                {(team === 1 || team === 2) ? '' :
                                    <div className="text-center text-theme-blue mt-2 text-sm md:text-md font-bold font-text">
                                        Home Club: {official.club}
                                    </div>
                                }
                                <div className="text-center text-theme-pink mt-1 text-sm md:text-md font-bold font-text">
                                    {official.profession}
                                </div>
                            </div>
                            <div className="text-center text-theme-blue mt-1">
                                <div className="grid grid-rows-1 grid-flow-col justify-items-center">
                                    {(official.facebook) ? <a href={official.facebook} rel="noreferrer" target="_blank"><div className="hvr-fade w-full h-full rounded p-4"><FontAwesomeIcon icon={faFacebookSquare} /></div></a> : '' }
                                    {(official.instagram) ? <a href={official.instagram} rel="noreferrer" target="_blank"><div className="hvr-fade w-full h-full rounded p-4"><FontAwesomeIcon icon={faInstagram} /></div></a> : '' }
                                    {(official.linkedin) ? <a href={official.linkedin} rel="noreferrer" target="_blank"><div className="hvr-fade w-full h-full rounded p-4"><FontAwesomeIcon icon={faLinkedinIn} /></div></a> : '' }
                                    {(official.youtube) ? <a href={official.youtube} rel="noreferrer" target="_blank"><div className="hvr-fade w-full h-full rounded p-4"><FontAwesomeIcon icon={faYoutube} /></div></a> : '' }
                                    {(official.email) ? <a href={'mailto:' + official.email} rel="noreferrer" target="_blank"><div className="hvr-fade w-full h-full rounded p-4"><FontAwesomeIcon icon={faEnvelope} /></div></a> : '' }
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <br />
            <br />
            <br />
            <Footer />
        </div>
    )
}