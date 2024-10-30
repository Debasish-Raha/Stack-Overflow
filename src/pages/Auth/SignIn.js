import React from 'react';
import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../../actions/auth';

const SignIn = () => {
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(signInWithGoogle());
  };

  return (
    <div>
      <h2>Sign in with Google</h2>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default SignIn;
