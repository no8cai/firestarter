import React from 'react';
import './HomePage.css'


function Landing() {

    return (
        <div className="main-container">
    <div className="categories-bar">
        <span>Arts</span>
        <span>Comics & Illustration</span>
        <span>Design & Tech</span>
        <span>Film</span>
        <span>Food & Craft</span>
        <span>Games</span>
        <span>Music</span>
        <span>Publishing</span>
    </div>

    <div className="content-container">
        <div className="headline-holder">
            <h1 className="headline">Bring a creative project to life.</h1>
            <p className="subtext">ON CLONERSTARTER:</p>
        </div>

        <div className="numbers-holder">
            <div className="numbers-box">
                <span className="nums-text">123,456</span>
                <span className="subtext">projects funded</span>
            </div>
            <div className="numbers-box">
                <span className="nums-text">$123,456</span>
                <span className="subtext">towards creative work</span>
            </div>
            <div className="numbers-box">
                <span className="nums-text">$123,456</span>
                <span className="subtext">pledges</span>
            </div>
        </div>
    </div>

    <div className="content-container">
        <div className="content-container-row">
            {/* have route to randomize project from db? */}
            <div className="feature-project-holder">
                <span className="home-section-title">FEATURE PROJECT</span>
                <div className="feature-image">image</div>
                <div className="feature-title">This is a Project Title</div>
                <div className="feature description">qwertyuiopasdfghjklzxcvbnm</div>
                <div className="feature-creator">by A Stray Cat</div>
            </div>
            <div className="rec-holder">
                <span className="home-section-title">RECOMMENDED FOR YOU</span>
                {/* for project in projects loop */}
                <div className="rec-projects">
                    <div className="rec-project-thumbnail">Rec proj thumbnail</div>
                    <div className="rec-project-details">
                        <span className="rec-project-title">Rec Project Title</span>
                        <span className="rec-project-funded">100% funded</span>
                        <span className="rec-project-creator">By Name</span>
                        <div className="rec-project-bookmark-likes">Bookmark, like, dislike buttons</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="line-break"></div>

    <div className="content-container">
        Small project section
    </div>

    <div className="line-break"></div>

    <div className="content-container">
        Fresh Favorites section
    </div>

    {/* <div className="line-break"></div>

    <div className="content-container">
        Project Updates? section
    </div>

    <div className="line-break"></div>

    <div className="content-container">
        Hot Off The Press section - looks like website news?
    </div>

    <div className="line-break"></div>

    <div className="content-container">
        Taking off section
    </div>

    <div className="line-break"></div>

    <div className="content-container">
        Etc....
    </div> */}


    </div>
    )
}

export default Landing;
