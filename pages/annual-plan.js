import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { faCheck, faHourglassStart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image';
import Navbar from '../components/Navbar';
import PlanDetails from '../components/data/annual-plan';
import Footer from '../components/Footer';

export default function AnnualPlan() {
    
    return (
        <div className="w-full">
            <Navbar />
            <VerticalTimeline>
                {PlanDetails.map((project) => {
                    return(    
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: '#235789' }}
                            contentArrowStyle={{ borderRight: '7px solid  #235789' }}
                            date={project.date}
                            dateClassName="text-theme-black font-sub-heading"
                            iconClassName={(project.completed === true) ? "bg-theme-black text-theme-gold" : "bg-theme-black text-theme-white"}
                            icon={<FontAwesomeIcon size={(project.completed === true) ? "lg" : "2x"} icon={(project.completed === true) ? faCheck : faHourglassStart} />}
                        >
                            <div className="grid grid-cols-1 grid-flow-row text-center">
                                <div className="col-span-1">
                                    {(project.poster === true) ?
                                        <div className="w-full h-full">
                                            <Image layout="responsive" quality={100} src={require('../images/projects/' + project.project + '.jpg')} />
                                        </div>
                                    : ''}
                                </div>
                                <div className="col-span-1 p-2 text-3xl font-sub-heading text-theme-white bg-theme-pink uppercase">{project.name}</div>
                                <div className="col-span-1 p-1 text-2xl font-sub-heading text-theme-pink bg-theme-white rounded-b-xl">{project.project}</div>
                                <div className="col-span-1 mt-2 text-2xl font-sub-heading text-theme-gold">CHAIR</div>
                                <div className="col-span-1  text-2xl font-sub-heading text-theme-white">{project.chair}</div>
                                {(project.co_chairs !== '') ? <>
                                    <div className="col-span-1 mt-2 text-xl font-sub-heading text-theme-gold">Co-Chairs</div>
                                    <div className="col-span-1 text-lg font-sub-heading text-theme-white">{project.co_chairs}</div>
                                    </> : '' }
                            </div>
                        </VerticalTimelineElement>
                    )
                })}
                <VerticalTimelineElement
                    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                    icon={<FontAwesomeIcon size={'lg'} icon={faCheck} />}
                />
            </VerticalTimeline>
            <Footer />
        </div>
    );
}