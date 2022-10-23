import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { onTokenChange, onUsernameChange } from '../../redux/slices/userSlice';

const Registration = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    login: '',
    email: '',
    password: '',
  });

  const sendData = (e) => {
    e.preventDefault();
    axios
      .post('https://test-api.misaka.net.ru/api/Account/register', {
        username: data.login,
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        const token = response.data.accessToken;
        dispatch(onTokenChange(token));
        dispatch(onUsernameChange(data.login));
        localStorage.setItem('token', token);
        localStorage.setItem('username', data.login);
      });
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
        id="outlined-basic"
        label="Придумайте логин"
        variant="outlined"
        value={data.login}
        onChange={(e) => onLoginChange(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Введите email"
        variant="outlined"
        onChange={(e) => onEmailChange(e.target.value)}
      />
      <TextField
        id="outlined-basic"
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
