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
                        <p className="creator-statement">"Devmo (<span className="text-italics">short for developer demo</span>) originates from a story of aspiration, growth, and inspiration. It provides a platform for developers to showcase projects they are proud of, and shine light on how exciting, transformational, and fun coding can be. Always free – Devmo is powered by people like you and dedicated to the next generation of programmers. Enjoy!"</p>    
                    </div>
                </div>
                <div className="about-inquiries">
                    <FontAwesomeIcon className="about-inquiries-icon" icon={faComments}/>
                    <p className="about-inquiries-text">For questions or feedback, contact us at devmo@gmail.com!</p>
                </div>         
            </div>   
        </div>
    );
};

export default About;