import './About.css'
import TopNav from '../TopNav/TopNav';

function About() {
    return (
        <div className="about-page">
            <TopNav/>
            <div className="about-main">
                <h1 className="about-title">About Us</h1>
            </div>            
        </div>
    );
};

export default About;