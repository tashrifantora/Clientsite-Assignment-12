import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../Firebase.config'
import useAxiosPublic from "../../Hooks/useAxiosPublic";



export const AuthContext = createContext(null);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const Authprovider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(null)
    const axiosPublic = useAxiosPublic()


    //-/-/-/-/Create user by Email Password-/-/-/-/
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }


    //-/-/-/-Updatae User Profile-/-/-/-/
    const updateUserProfile = (name, birthday, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            DOB: birthday,
            photoURL: photo
        })

    }



    //-/-/-/-/SignIn/LogIN User-/-/-/-/
    const userSignIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //-/-/-/-/SignIn with Google-/-/-/-/
    const signInWithGoogle = () => {
        return signInWithPopup(auth, provider)
    }


    //-/-/-/-User Logout-/-/-/- 
    const userSignOut = () => {
        setLoading(true)
        return signOut(auth)
    }


    //-/-/-/-/Manage user-/-/-/-/
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser?.email }

                // Sending JWT Backend
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        console.log(res.data)
                        if (res.data?.token) {
                            localStorage.setItem('access-token', res.data?.token)
                            setLoading(false)
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token')
                setLoading(false)
            }



        });
        return () => {
            return unSubscribe();
        }
    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        createUser,
        userSignIn,
        signInWithGoogle,
        userSignOut,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;