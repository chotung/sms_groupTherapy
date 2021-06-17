import React from 'react';
import axios from 'axios';

export default function LogoutButton(props) {
  const { setUser } = props;
  const logout = async () => {
    const res = await axios.post('/api/users/logout');
    if (res.status === 204) {
      setUser(null);
    }
  };

  return (
    <>
      <button onClick={logout}>Logout</button>
    </>
  );
}
