import React from "react";
import "./Footer.css";


function Footer() {

    return(
        <div className="main-container">

        <div className='content-container-row'>

        <div className="footer-container">
            <div className="footer-links">
                <div className="footer-link-section">
                    <span className="footer-links-labels">ABOUT</span>
                    <p>Link</p>
                </div>
                <div className="footer-link-section">
                    <span className="footer-links-labels">SUPPORT</span>
                    <p>Link</p>
                </div>
                <div className="footer-link-section">
                    <span className="footer-links-labels">MORE FROM CLONESTARTER</span>
                    <p>Link</p>
                </div>
            </div>
            <div className="footer-social-media">
                <div className="footer-copywrite">Clonestarter, 2023</div>
                <div className="footer-social-media-icons">
                    <span>Facebook</span>
                    <span>Twitter</span>
                    <span>Insta</span>
                </div>
            </div>
            <div className="footer-break"></div>
            <div className="footer-legal-links">
                <span>Link</span>
                <span>Link</span>
                <span>Link</span>
            </div>
        </div>
        </div>
        </div>
    )
}

export default Footer;
