import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
import usePackage from "../../Hooks/usePackage";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";


const FormCheckout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('')
    const axiosSecure = useAxiosSecure();
    // const axiosPublic = useAxiosPublic();

    const { user } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [hr, refetch] = usePackage();
    const price = hr.reduce((total, price) => total + price.pakage, 0)
    // console.log(hr)


    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    console.log(res.data)
                    setClientSecret(res?.data?.clientSecret)
                })
        }

    }, [axiosSecure, price])

    const handlePaymentSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('error', error);
            setError(error.message)

        }
        else {
            console.log('PaymentMethod', paymentMethod);
            setError('')
        }


        // Confirm Payment 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "Anonymous",
                    name: user?.displayName || "Anonymous"

                }
            }
        })
        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log("Payment Intent:-", paymentIntent)
        }
    }


    // Make Admin Part
    const HandleAdmin = (user) => {
        console.log(user)
        // TODO: Axious Secure 
        console.log(user)
        if (user) {
            axiosSecure.patch(`/HR/make-admin/${user.email}`)
                .then(res => {
                    console.log(res.data)
                    if (res?.data?.modifiedCount > 0) {
                        refetch()
                        navigate('/admin/add-employee')
                    }
                })
        }
    }


    return (
        <form className="border md:w-full lg:w-1/2 mx-auto p-5 bg-slate-100 rounded" onSubmit={handlePaymentSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <h1 className="mt-5 text-slate-400">Please enter your card number</h1>
            <div className="flex justify-end">
                <button onClick={() => HandleAdmin(user)} className="btn mt-10 bg-[#44426E] my-4 text-white" type="submit" disabled={!stripe}>
                    Pay
                </button>
            </div>
            <p className="text-red-500">{error}</p>
        </form>

    );
};

export default FormCheckout;