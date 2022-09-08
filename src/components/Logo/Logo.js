import './Logo.css'
import logo from '../../assets/logo.svg'

function Logo() {
    return (
        <div className="full-logo">
            <h1 className="inline-logo-text">DEVM</h1>
            <img className="inline-logo-image" src={logo} alt=""/>
        </div>
    );
};

export default Logo;

