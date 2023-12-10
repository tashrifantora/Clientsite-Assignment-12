import pakage01 from '../../../assets/Image/emplyees02.jpg'
import pakage02 from '../../../assets/Image/employes03.jpg'
import pakage03 from '../../../assets/Image/emplyee04.jpg'
import { FaRegStar } from "react-icons/fa";

const Pakage = () => {
    return (
        <div className="mb-20">
            <h1 className="text-4xl mb-7 text-center font-semibold mt-10">We are always there for  your</h1>
            <p className="max-w-3xl text-center mx-auto text-lg leading-8 mb-5">We aspire to elevate healthcare standards at Asset Catalyst by redefining service excellence. Our commitment involves a holistic approach, focusing on personalized care, cutting-edge treatments, and a compassionate patient experience. Thank you for entrusting us with your health and allowing us to serve you better every day.</p>
            <div>
                <h1 className="text-3xl font-bold text-center mb-10">
                    Our pakages for you
                </h1>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>

                    <div className='rounded-lg p-9 shadow-xl'>
                        <img className='w-20 rounded-full mb-4' src={pakage01} alt="" />

                        <div>
                            <div className='text-left text-xl '>
                                <p>Employee: 5</p>
                                <p>Sevice charge: $5</p>
                                <ul className='list-disc ml-8'>
                                    <li>Compassionate patient care</li>
                                    <li>Compassionate patient care</li>
                                    <li>Compassionate patient care</li>
                                    <li>Compassionate patient care</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className='rounded-lg p-9 shadow-xl'>
                        <img className='w-20 rounded-full mb-4 ' src={pakage02} alt="" />

                        <div>
                            <div className='text-left text-xl '>
                                <p>Employee: 10</p>
                                <p>Sevice charge: $8</p>
                                <ul className='list-disc ml-8'>
                                    <li>Compassionate patient care</li>
                                    <li>Compassionate patient care</li>
                                    <li>Compassionate patient care</li>
                                    <li>Compassionate patient care</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className='rounded-lg p-9 shadow-xl relative'>

                        <button className='btn bg-red-600 text-lg text-white absolute -top-6 '>Top<FaRegStar></FaRegStar></button>

                        <img className='w-20 rounded-full mb-4' src={pakage03} alt="" />

                        <div>
                            <div className='text-left text-xl '>
                                <p>Employee: 15</p>
                                <p>Sevice charge: $15</p>
                                <ul className='list-disc ml-8'>
                                    <li>Compassionate patient care</li>
                                    <li>Compassionate patient care</li>
                                    <li>Compassionate patient care</li>
                                    <li>Compassionate patient care</li>
                                </ul>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
};

export default Pakage;