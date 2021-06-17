import React, { useState } from 'react';
import { updateInputValue } from '../helper/handleInputs';
import axios from 'axios';

export default function RegisterForm(props) {
  const { setUser, setRegister } = props;
  const [registerUser, setRegisterUser] = useState({});

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users', registerUser);
      const { data } = await res;
      console.log(data);
      const { id, email, name, twilio_number } = data;
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
    <div id="register">
      <button onClick={() => setRegister(false)}>Login</button>
      <form onSubmit={register}>
        <h2>Register</h2>
        <label htmlFor="register-email">Email</label>
        <input
          type="email"
          name="register-email"
          id="register-email"
          onChange={(e) => updateInputValue(e, setRegisterUser, registerUser)}
        />
        <label htmlFor="register-password">Password</label>
        <input
          type="password"
          name="register-password"
          id="register-password"
          onChange={(e) => updateInputValue(e, setRegisterUser, registerUser)}
        />
        <label htmlFor="register-name">Name</label>
        <input
          type="text"
          name="register-name"
          id="register-name"
          onChange={(e) => updateInputValue(e, setRegisterUser, registerUser)}
        />
        <label htmlFor="twilio_number">Twilio Number</label>
        <input
          type="text"
          name="twilio_number"
          id="register-twilio_number"
          onChange={(e) => updateInputValue(e, setRegisterUser, registerUser)}
        />
        <button type="submit" value="Submit">
          Register
        </button>
      </form>
    </div>
  );
}
