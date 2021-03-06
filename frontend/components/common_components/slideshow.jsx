import React from 'react';
import { withRouter } from "react-router-dom";
import 'style-loader!css-loader!react-responsive-carousel/lib/styles/main.css';
import 'style-loader!css-loader!react-responsive-carousel/lib/styles/carousel.css';
import 'style-loader!css-loader!react-responsive-carousel/lib/styles/carousel.min.css';
import { randomize } from "../../util/general_api_util";
import { Carousel } from 'react-responsive-carousel';

const Slideshow = (props) => {
    const userBanners = [window.user_banner1, window.user_banner2];
    switch (props.klass) {
        case "banner":
            return (
                <Carousel className="carousel"
                    infiniteLoop autoPlay
                    showArrows={false}
                    showStatus={false}
                    showThumbs={false}
                    swipable={true}
                    interval={6000}
                >
                    <div>
                        <img src={window.carousel1} />
                        <div className="message">
                            <h1>Discover more with AcousticNimbus Go+</h1>
                            <h2>AcousticNimbus Go+ lets you listen offline, ad-free, with over 150 million tracks — and growing.</h2>
                            <div className="buttons">
                                <button onClick={() => props.openModal("signup")}>Learn More</button>
                                <button className="free-trial" onClick={() => props.openModal("signup")}>Try It Free for 30 years</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src={window.carousel2} />
                        <div className="message">
                            <h1>What's next in music is first on AcousticNimbus</h1>
                            <h2>Upload your first track and begin your journey. AcousticNimbus gives you space to create, find your fans, and connect with other artists.</h2>
                            <button className="button" onClick={() => props.openModal("signup")}>Start uploading today</button>
                        </div>
                    </div>
                </Carousel>
            );
        case "ad":
            return (
                <Carousel className="ad"
                    infiniteLoop autoPlay
                    showArrows={false}
                    showStatus={false}
                    showThumbs={false}
                    swipable={true}
                    interval={8000}
                >
                    <div>
                        <img src={window.ad1} />
                        <div className="ad1">
                            <p>Looking for a Software Engineer?</p>
                        </div>
                    </div>
                    <div>
                        <img src={window.ad2} />
                        <div className="logos">
                            <div className="upper">
                                <a href="https://www.linkedin.com/in/howie-chan"><img src={window.linkedin} className="logo"></img></a>
                                <a href="https://github.com/h0wiechan"><img src={window.github} className="logo"></img></a>
                            </div>
                            <a href="https://angel.co/h0wiechan"><img src={window.angellist} className="logo"/></a>
                        </div>
                    </div>
                </Carousel>
            );
        case "user-show-page":
            return (
                <Carousel className="banner-container"
                    autoPlay={false}
                    showArrows={false}
                    showStatus={false}
                    showThumbs={false}
                    showIndicators={false}
                    swipable={false}
                >
                    <div className="banner">
                        <img src={randomize(userBanners)[0]} />
                        <div className="artist-info-container">
                            <img src={props.onPageArtist.imageURL ? props.onPageArtist.imageURL : window.user_dp} ></img>
                            <div className="artist-info">
                                <p className="username">{props.onPageArtist.username}</p>
                                <p>{props.onPageArtist.name}</p>
                                <p>{props.onPageArtist.location}</p>
                            </div>
                        </div>
                    </div>
                </Carousel>
            );
        default:
            break;
    }
}
 
export default withRouter(Slideshow);