import React, { useState } from 'react';
import axios from 'axios';
import { updateInputValue } from '../helper/handleInputs';

export default function LoginForm(props) {
  const { setUser, setLogin } = props;
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', {
        email: loginInfo.email,
        password: loginInfo.password,
      });
      const { data } = await res;
      const { id, email, name, twilio_number } = data.user;
      setUser({
        id,
        email,
        name,
        twilio_number,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="login">
      <button onClick={() => setLogin(true)}>Register</button>
      <form onSubmit={login}>
        <h2>Login</h2>
        <label htmlFor="login-email">Email</label>
        <input
          type="email"
          name="login-email"
          id="login-email"
          value={loginInfo.email}
          onChange={(e) => updateInputValue(e, setLoginInfo, loginInfo)}
        />
        <label htmlFor="login-email">Password</label>
        <input
          type="password"
          name="login-password"
          id="login-password"
          value={loginInfo.password}
          onChange={(e) => updateInputValue(e, setLoginInfo, loginInfo)}
        />
        <button type="submit" value="Submit">
          Login
        </button>
      </form>
    </div>
  );
}
