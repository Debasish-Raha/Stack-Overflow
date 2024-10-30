import { fetchallusers } from './action/users';
import './App.css';
import {useEffect, useState} from 'react';
import Navbar from './Component/Navbar/navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Allroutes from './Allroutes'
import { useDispatch } from 'react-redux';
import { fetchallquestion } from './action/question';
import { setcurrentuser } from './action/currentuser';
import { jwtDecode } from 'jwt-decode';
import LanguageSelector from './Component/MultiLanguage/LanguageSelector'; 
import './Component/MultiLanguage/LanguageSelector.css';
import './i18n';

function App() {
  const [slidein,setslidein]=useState(true)
  const dispatch=useDispatch()
useEffect(()=>{
  dispatch(fetchallusers());
  dispatch(fetchallquestion());

  const token = JSON.parse(localStorage.getItem("Profile"))?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch({ type: "LOGOUT" });
        dispatch(setcurrentuser(null));
      } else {
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
      }
    } else {
      dispatch(setcurrentuser(null));
    }
},[dispatch])

  useEffect(()=>{
    if(window.innerWidth<= 768){
      setslidein(false)
    }
  },[])
  const handleslidein=()=>{
    if(window.innerWidth<=768){
      setslidein((state)=> !state);
    }
  };

  return (
    <div className="App">
      <Router>
      <Navbar handleslidein={handleslidein}/>
      <div className="language-selector-container">
      <LanguageSelector />
      </div>
      <Allroutes slidein={slidein} handleslidein={handleslidein}/>
      </Router>
    </div>
  );
}

export default App;