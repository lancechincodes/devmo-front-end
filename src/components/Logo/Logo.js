import './Logo.css'
import logo from '../../assets/logo.svg'

function Logo({size}) {

    return (
        <div className="full-logo">
            <h1 className={`inline-logo-text-${size}`}>DEVM</h1>
            <img className={`inline-logo-image-${size}`} src={logo} alt=""/>
        </div>
    );
};

export default Logo;

