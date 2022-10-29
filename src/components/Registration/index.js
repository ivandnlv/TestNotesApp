import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { createUser } from '../../redux/slices/userSlice';

const Registration = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    login: '',
    email: '',
    password: '',
  });

  const sendData = (e) => {
    e.preventDefault();
    dispatch(createUser({ username: data.login, email: data.email, password: data.password }));
  };

  const onLoginChange = (login) => {
    setData((prev) => {
      return { ...prev, login };
    });
  };

  const onEmailChange = (email) => {
    setData((prev) => {
      return { ...prev, email };
    });
  };

  const onPasswordChange = (pass) => {
    setData((prev) => {
      return { ...prev, password: pass };
    });
  };

  return (
    <form action="#">
      <TextField
        label="Придумайте логин"
        variant="outlined"
        value={data.login}
        onChange={(e) => onLoginChange(e.target.value)}
      />
      <TextField
        label="Введите email"
        variant="outlined"
        onChange={(e) => onEmailChange(e.target.value)}
      />
      <TextField
        label="Придумайте пароль"
        variant="outlined"
        type="password"
        onChange={(e) => onPasswordChange(e.target.value)}
      />
      <Button variant="contained" onClick={(e) => sendData(e)}>
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default Registration;
