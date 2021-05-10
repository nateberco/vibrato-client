import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";

import "./Home.css";

const Footer = () => {

    // const theDate = new Date().getFullYear();
    const theDate = '2021';

    return (
        <>
       
        <div className="footerContainer" style={{position: "relative"}}>

        <div className="footer">
        
        <h1 id="socialMediaFooter">Thank you for visiting Vibrato :)</h1>
        
        <div className="social-container">
           
                <a href="https://www.youtube.com"
                 className="youtube social" target="blank">
                  <FontAwesomeIcon icon={faYoutube} size="2x" />
                </a>
                <a href="https://www.facebook.com"
                  className="facebook social" target="blank">
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a href="https://www.twitter.com" className="twitter social" target="blank">
                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
                <a href="https://www.instagram.com"
                  className="instagram social" target="blank">
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>

        </div>

       
     </div>
        <div style={{color: "white", position: "relative",  marginBottom: "0%", height: "10vh"}}className='footer-copyright text-center ml-auto py-3'>  
            &copy; {theDate} - Vibrato     
        </div>
        </div>
        
      </>
    );
};

export default Footer;