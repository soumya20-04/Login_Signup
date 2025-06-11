import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/authSlice';

const Home = ({ onLogout }) => {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    onLogout();
  };

  return (
    <div className="container">
      <h1>Welcome {user} to the Home Page</h1>
      <p>Your role: {role}</p>
      {role === 'admin' && <button>Admin Panel</button>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
