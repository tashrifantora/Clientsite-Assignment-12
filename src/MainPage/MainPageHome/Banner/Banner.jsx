import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import slide1 from '../../../assets/Image/slider01.jpg'
import slide2 from '../../../assets/Image/slider03.jpg'
import { Link } from "react-router-dom";

const Banner = () => {
    return (

        <div className="lg:mb-20">
            <Carousel showThumbs={false}>

                <div>
                    <div className="hero h-[500px] lg:h-[800px]" style={{ backgroundImage: `url(${slide1})` }}>
                        <div className="hero-overlay bg-opacity-40"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-6xl font-bold">Welcome to Asset Catalyst</h1>
                                <p className="mb-10">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                                <Link to='/join-employee'>
                                    <button className="btn btn-wide bg-[#44426E] text-white text-lg border-none">Go to join employee</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <div className="hero h-[500px] lg:h-[800px]" style={{ backgroundImage: `url(${slide2})` }}>
                        <div className="hero-overlay bg-opacity-40"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-6xl font-bold">Welcome to Asset Catalyst</h1>
                                <p className="mb-10">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                                <Link to='/join-HR'>
                                    <button className="btn btn-wide bg-[#44426E] text-white text-lg border-none">Go to join HR</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </Carousel>
        </div>

    );
};

export default Banner;