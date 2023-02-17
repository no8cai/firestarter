import React from "react";
import "./Footer.css";


function Footer() {

    return(
        <div className="main-container">

        <div className='content-container-row'>

        <div className="footer-container">
            <div className="footer-links">
                <div className="footer-link-section">
                    {/* <span className="footer-links-labels">ABOUT</span> */}
                    <p><a href='https://github.com/no8cai/firestarter/wiki' className="footer-links-labels">ABOUT</a></p>
                </div>
                <div className="footer-link-section">
                    {/* <span className="footer-links-labels">SUPPORT</span> */}
                    <p><a href='https://github.com/no8cai/firestarter/blob/main/README.md' className="footer-links-labels">SUPPORT</a></p>
                </div>
                <div className="footer-link-section">
                    {/* <span className="footer-links-labels">MORE FROM CLONESTARTER</span> */}
                    <p><a href='https://www.kickstarter.com/' className="footer-links-labels">MORE ABOUT KICKSTARTER</a></p>
                </div>
            </div>
            <div className="footer-social-media">
                <div className="footer-social-media-icons">
                    <span><a href='https://www.facebook.com/' className="footer-icon"><i className="fa fa-facebook"></i></a></span>
                </div>
                    <span><a href='https://twitter.com/' className="footer-icon"><i className="fa fa-twitter"></i></a></span>
                    <span><a href='https://www.instagram.com/'className="footer-icon" ><i className="fa fa-instagram"></i></a></span>
            </div>
            <div className="footer-break"></div>
            <div className="footer-legal-links">
                <div className="footer-copywrite">FireStarter, © 2023</div>
                {/* <span>Link</span>
                <span>Link</span>
                <span>Link</span> */}
            </div>
        </div>
        </div>
        </div>
    )
}

export default Footer;
