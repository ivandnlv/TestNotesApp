import { useDispatch } from 'react-redux/es/exports';
import { onTokenChange, onUsernameChange } from '../../redux/slices/userSlice';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

const Login = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    login: '',
    password: '',
  });

  const sendData = async () => {
    await axios
      .post('https://test-api.misaka.net.ru/api/Account/login', {
        username: data.login,
        password: data.password,
      })
      .then((response) => {
        const token = response.data.accessToken;
        dispatch(onTokenChange(token));
        dispatch(onUsernameChange(data.login));
        localStorage.setItem('token', token);
        localStorage.setItem('username', data.login);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLoginChange = (login) => {
    setData((prev) => {
      return {
        ...prev,
        login: login,
      };
    });
  };

  const onPasswordChange = (pass) => {
    setData((prev) => {
      return {
        ...prev,
        password: pass,
      };
    });
  };

  return (
    <form action="#">
      <TextField label="Логин" variant="outlined" onChange={(e) => onLoginChange(e.target.value)} />
      <TextField
        label="Пароль"
        variant="outlined"
        type="password"
        onChange={(e) => onPasswordChange(e.target.value)}
      />
      <Button variant="contained" onClick={sendData}>
        Войти
      </Button>
    </form>
  );
};

export default Login;
