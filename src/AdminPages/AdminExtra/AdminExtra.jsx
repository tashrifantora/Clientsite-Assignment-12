
import img3 from '../../assets/Image/Foodpanda-Logo.wine.png'
import img4 from '../../assets/Image/BKash-bKash2-Logo.wine.svg'
import img5 from '../../assets/Image/samsung-logo-text-png-1.png'
import img6 from '../../assets/Image/microsoftlogo.png'
import img7 from '../../assets/Image/Daraz_Logo.png'

const AdminExtra = () => {
    return (
        <div>
            <h1 className="text-5xl mb-7 text-center font-semibold mt-20">Already connected with us</h1>
            <p className="max-w-3xl text-center mx-auto text-lg leading-8 mb-5">We aspire to elevate healthcare standards at Asset Catalyst by redefining service excellence. Our commitment involves a holistic approach, focusing on personalized care.</p>

            <div className="grid md:grid-col-2 lg:grid-cols-5 gap-10">

                <div className="card card-compact  bg-base-100 shadow-xl">
                    <figure><img className="p-5 lg:w-2/3" src={img6} alt="Shoes" /></figure>
                    <div className="card-body">
                        <p className="text-lg">Incredible experience! Excellent customer support, easy to use, and durable. Worth every penny spent.</p>
                    </div>
                </div>

                <div className="card card-compact  bg-base-100 shadow-xl">
                    <figure><img className="p-5 w-2/3" src={img7} alt="Shoes" /></figure>
                    <div className="card-body">
                        <p>Incredible experience! Excellent customer support, easy to use, and durable. Worth every penny spent.</p>
                    </div>
                </div>

                <div className="card card-compact  bg-base-100 shadow-xl">
                    <figure><img className="p-5 w-2/3" src={img3} alt="Shoes" /></figure>
                    <div className="card-body">
                        <p>Incredible experience! Excellent customer support, easy to use, and durable. Worth every penny spent.</p>
                    </div>
                </div>

                <div className="card card-compact  bg-base-100 shadow-xl">
                    <figure><img className="p-5 w-2/3" src={img4} alt="Shoes" /></figure>
                    <div className="card-body">
                        <p>Incredible experience! Excellent customer support, easy to use, and durable. Worth every penny spent.</p>
                    </div>
                </div>

                <div className="card card-compact  bg-base-100 shadow-xl">
                    <figure><img className="p-5 w-2/3" src={img5} alt="Shoes" /></figure>
                    <div className="card-body">
                        <p>Incredible experience! Excellent customer support, easy to use, and durable. Worth every penny spent.</p>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default AdminExtra;
/* 
               
                
                
               <div className="card  bg-base-100 shadow-xl">
                    <figure><img className="p-4" src={img1} alt="Shoes" /></figure>
                </div>

                <div className="card  bg-base-100 shadow-xl">
                    <figure><img className="p-4" src={img2} alt="Shoes" /></figure>
                </div>
                <div className="card  bg-base-100 shadow-xl">
                    <figure><img className="p-4" src={img3} alt="Shoes" /></figure>
                </div>
                <div className="card  bg-base-100 shadow-xl">
                    <figure><img className="p-4" src={img4} alt="Shoes" /></figure>
                </div>
 
                */