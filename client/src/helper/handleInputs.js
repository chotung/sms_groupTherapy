export const updateInputValue = (e, setState, state) => {
  const { id, value } = e.target;
  switch (id) {
    // login
    case 'login-email':
      setState({
        ...state,
        email: value,
      });
      break;
    case 'login-password':
      setState({
        ...state,
        password: value,
      });
      break;
    // Register
    case 'register-email':
      setState({
        ...state,
        email: value,
      });
      break;
    case 'register-password':
      setState({
        ...state,
        password: value,
      });
      break;
    case 'register-name':
      setState({
        ...state,
        name: value,
      });
      break;
    case 'register-twilio_number':
      setState({
        ...state,
        twilio_number: value,
      });
      break;

    default:
      break;
  }
};
