import aboutUs from '../../../assets/Image/slider02.jpg'
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";

const AboutUs = () => {
    return (
        <div>
            <h1 className="text-5xl mb-7 text-center font-semibold">Know More <span className="font-bold">About Us</span></h1>
            <p className="max-w-3xl text-center mx-auto text-lg leading-8 mb-10">Welcome to Asset Catalyst, where precision healthcare meets streamlined asset management. At Asset Catalyst, we understand the critical synergy between effective patient care and the strategic management of diverse healthcare assets.</p>
            <div className="bg-[#e0dff5] flex gap-5 w-full p-8 rounded-lg">
                <img className="w-1/2" src={aboutUs} alt="" />
                <div className="w-1/2 flex items-center leading-9">
                    <div>
                        <div className="flex items-center gap-2">
                            <IoCheckmarkCircleOutline></IoCheckmarkCircleOutline> <p className="lg:text-2xl font-semibold mb-3">Our Expertise:</p>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-semibold">
                            <IoCheckmarkCircleOutline></IoCheckmarkCircleOutline> <p className="lg:text-2xl font-semibold mb-3">Comprehensive Solutions</p>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-semibold">
                            <IoCheckmarkCircleOutline></IoCheckmarkCircleOutline> <p className="lg:text-2xl font-semibold mb-3">Empowering Healthcare</p>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-semibold">
                            <IoCheckmarkCircleOutline></IoCheckmarkCircleOutline> <p className="lg:text-2xl font-semibold mb-3">Commitment to Innovation</p>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-semibold mb-5">
                            <IoCheckmarkCircleOutline></IoCheckmarkCircleOutline> <p className="lg:text-2xl font-semibold mb-3">Focused Approach</p>
                        </div>
                        <button className="btn btn-wide bg-[#44426E] text-white text-lg border-none">More details<FaArrowRightLong></FaArrowRightLong></button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AboutUs;