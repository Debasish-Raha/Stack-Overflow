import React, { useState } from 'react';
import Leftsidebar from '../../Component/Leftsidebar/Leftsidebar';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Avatar from '../../Component/Avatar/Avatar';
import Editprofileform from './Editprofileform';
import Profilebio from './Profilebio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons';

const Userprofile = ({ slidein }) => {
  const { id } = useParams();
  const [Switch, setswitch] = useState(false);

  const users = useSelector((state) => state.usersreducer);
  const currentprofile = users.find((user) => user._id === id) || {}; // Handle case where no user matches
  const currentuser = useSelector((state) => state.currentuserreducer);

  return (
    <div className="home-container-1">
      <Leftsidebar slidein={slidein} />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px"
                px="40px"
                py="30px"
              >
                {currentprofile.name ? currentprofile.name.charAt(0).toUpperCase() : 'U'}
              </Avatar>
              <div className="user-name">
                <h1>{currentprofile.name || 'User Name'}</h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                  {currentprofile.joinedon ? moment(currentprofile.joinedon).fromNow() : 'N/A'}
                </p>
              </div>
            </div>
            {currentuser?.result?._id === id && (
              <button
                className="edit-profile-btn"
                type='button'
                onClick={() => setswitch(true)}
              >
                <FontAwesomeIcon icon={faPen} /> Edit Profile
              </button>
            )}
          </div>
          {Switch ? (
            <Editprofileform currentuser={currentuser} setswitch={setswitch} />
          ) : (
            <Profilebio currentprofile={currentprofile} />
          )}
        </section>
      </div>
    </div>
  );
};

export default Userprofile;
