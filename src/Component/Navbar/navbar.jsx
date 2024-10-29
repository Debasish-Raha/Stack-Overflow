import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import bars from '../../assets/bars-solid.svg';
import logo from '../../assets/logo.png';
import search from '../../assets/search-solid.svg';
import Avatar from '../Avatar/Avatar';
import './navbar.css';
import { setcurrentuser } from '../../action/currentuser';
import { jwtDecode } from 'jwt-decode'; // Correct import
import { signInWithGoogle } from '../../action/auth';
import { useTranslation } from 'react-i18next';

function Navbar({ handleslidein }) {
    const { t } = useTranslation();
    const User = useSelector((state) => state.currentuserreducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleSignIn = () => {
        dispatch(signInWithGoogle());
    };

    const handlelogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
        dispatch(setcurrentuser(null));
    };

    useEffect(() => {
        const token = User?.token;
        if (token) {
            try {
                const decodedToken = jwtDecode(token); // Correct usage
                if (decodedToken.exp * 1000 < new Date().getTime()) {
                    handlelogout();
                }
            } catch (error) {
                console.error("Failed to decode token:", error);
                handlelogout();
            }
        }
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
    }, [User?.token, dispatch]);

    return (
        <nav className="main-nav">
            <div className="navbar">
                <button className="slide-in-icon" onClick={() => handleslidein()}>
                    <img src={bars} alt="bars" width='15' />
                </button>
                <div className="navbar-1">
                    <Link to='/' className='nav-item nav-logo'>
                        <img src={logo} alt="logo" />
                    </Link>
                    <Link to="/" className="nav-item nav-btn res-nav">
                    {t('navbar.about')}
                    </Link>
                    <Link to="/" className="nav-item nav-btn res-nav">
                    {t('navbar.products')}
                    </Link>
                    <Link to="/" className="nav-item nav-btn res-nav">
                    {t('navbar.teams')}
                    </Link>
                    <form>
                        <input type="text" placeholder={t('navbar.searchPlaceholder')} />
                        <img src={search} alt="search" width='18' className='search-icon' />
                    </form>
                </div>
                <div className="navbar-2">
                    {User === null ? (
                        <>
                            <button onClick={handleGoogleSignIn} className='nav-item nav-links'>
                                Sign in with Google
                            </button>

                            <Link to='/Auth' className='nav-item nav-links'>
                                Log in
                            </Link>
                        </>
                    ) : (
                        <>
                            <Avatar backgroundColor='#009dff' px='10px' py='7px' borderRadius='50%' color="white">
                                <Link to={`/Users/${User?.result?._id}`} style={{ color: "white", textDecoration: "none" }}>
                                    {User.result?.name ? User.result.name.charAt(0).toUpperCase() : 'U'}
                                </Link>
                            </Avatar>
                            <button className="nav-item nav-links" onClick={handlelogout}>Log out</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
