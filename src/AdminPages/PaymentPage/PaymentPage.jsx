import { loadStripe } from "@stripe/stripe-js";
import Pakage from "../../MainPage/MainPageHome/Pakage/Pakage";
import { Elements } from "@stripe/react-stripe-js";
import FormCheckout from "./FormCheckout";



const PaymentPage = () => {
    const pk = 'pk_test_51OEuwWJHJWswfX8ClRTKeO5Hf2iWQH1wQZQtpeZ0Rj5iE9PuFYbSMka4OZDv4823ZU4QYaIguPlEsTOepyGLadCv00l7WB02wb'
    const stripePromise = loadStripe(pk)
    return (
        <div className="mt-14">
            <div>
                <Elements stripe={stripePromise}>
                    <FormCheckout></FormCheckout>
                </Elements>
            </div>

            <Pakage></Pakage>
        </div>
    );
};

export default PaymentPage;