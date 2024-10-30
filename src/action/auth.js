import * as api from '../api';
import { setcurrentuser } from './currentuser';
import { fetchallusers } from './users';
import { auth, provider, signInWithPopup } from '../firebase'; // Ensure this path is correct

// Signup action
export const signup = (authdata, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signup(authdata);

        // Store profile data in localStorage
        localStorage.setItem("Profile", JSON.stringify(data));

        // Dispatch authentication and current user actions
        dispatch({ type: "AUTH", data });
        dispatch(setcurrentuser(data));
        dispatch(fetchallusers());

        // Navigate to home after signup
        navigate("/");
    } catch (error) {
        console.error("Signup Error:", error.response ? error.response.data : error.message);
    }
};

// Login action
export const login = (authdata, navigate) => async (dispatch) => {
    try {
        const { data } = await api.login(authdata);

        // Store profile data in localStorage
        localStorage.setItem("Profile", JSON.stringify(data));

        // Dispatch authentication and current user actions
        dispatch({ type: "AUTH", data });
        dispatch(setcurrentuser(data));
        
        // Navigate to home after login
        navigate("/");
    } catch (error) {
        console.error("Login Error:", error.response ? error.response.data : error.message);
    }
};

// Google Sign-In action
export const signInWithGoogle = () => {
    return async (dispatch) => {
        try {
            const result = await signInWithPopup(auth, provider);

            // Create profile object for Google sign-in
            const profile = {
                result: result.user,
                token: result.user.accessToken,
            };

            // Store profile in localStorage
            localStorage.setItem("Profile", JSON.stringify(profile));

            // Dispatch authentication and current user actions
            dispatch({ type: "AUTH", data: profile });
            dispatch(setcurrentuser(profile));
            dispatch(fetchallusers());
        } catch (error) {
            console.error("Google Sign-In Error:", error.message);
        }
    };
};
