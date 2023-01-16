import './About.css'
import TopNav from '../TopNav/TopNav';
import creatorImage from '../../assets/creator-image.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'

function About() {
    return (
        <div className="about-page">
            <TopNav/>
            <div className="about-main">
                <div className="about-heading">
                    <h1 className="about-title">ABOUT US</h1>
                    <p className="about-description">Our story.</p>
                </div>
                <div className="about-container">
                    <div className="about-content">
                        <h2 className="mission-text">Devmo is <span className="text-emphasis">committed to inspiring</span> people through the lens of technology.</h2>
                        <div className="image-statement-container">
                            <div className="creator-image-sig-container">
                                <img className="creator-image" src={creatorImage} alt="Lance Chin"/>
                                <div className="creator-sig-title-container">
                                    <h3 className="creator-sig">Lance Chin</h3>
                                    <h4 className="creator-title">Creator of Devmo</h4>
                                </div>
                            </div>
                            <p className="creator-statement">"Devmo (<span className="text-italics">short for developer demo</span>) provides a platform for developers to showcase projects they are proud of, and shine light on how exciting, transformational, and fun coding can be to others. We know that inspiration can stem from the most unlikely of places, but our mission is to make the search for it just a little bit easier. Always free – Devmo is powered by people like you and dedicated to the next generation of programmers. Enjoy, and remember to aspire to inspire!"</p>    
                        </div>
                    </div>
                    <div className="about-inquiries">
                        <a href="mailto:devmo@gmail.com?subject=I have questions/feedback for Devmo!">
                            <FontAwesomeIcon className="about-inquiries-icon" icon={faComments}/>
                        </a>
                        <p className="about-inquiries-text">For questions or feedback, feel free to contact us at devmoproduction@gmail.com.</p>
                    </div>
                </div>         
            </div>   
        </div>
    );
};

export default About;