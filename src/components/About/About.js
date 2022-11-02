import './About.css'
import TopNav from '../TopNav/TopNav';

function About() {
    return (
        <div className="about-page">
            <TopNav/>
            <div className="about-main">
                <div className="about-heading">
                    <h1 className="about-title">ABOUT US</h1>
                    <p className="about-description">Our story.</p>
                </div>
            </div>            
        </div>
    );
};

export default About;