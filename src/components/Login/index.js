import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { authUser } from '../../redux/slices/userSlice';
import { TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import { onClearStatus } from '../../redux/slices/userSlice';

const Login = () => {
  const dispatch = useDispatch();

  const { status } = useSelector((state) => state.user);

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({ mode: 'onSubmit' });

  useEffect(() => {
    dispatch(onClearStatus()); // eslint-disable-next-line
  }, []);

  const sendData = (data) => {
    dispatch(authUser({ login: data.login, password: data.password }));
  };

  return (
    <>
      {status === 'error' && (
        <Alert severity="error" style={{ margin: '20px 0' }}>
          Неверные логин или пароль
        </Alert>
      )}
      <form onSubmit={handleSubmit(sendData)}>
        <Controller
          name={'login'}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Поле обязательно к заполнению',
            },
            maxLength: {
              value: 32,
              message: 'Длина логина не может быть больше 32 символов',
            },
          }}
          render={({ field: { value, onChange, ref } }) => (
            <TextField
              label="Логин"
              variant="outlined"
              checked={value}
              inputRef={ref}
              value={value ? value : ''}
              onChange={onChange}
              error={errors?.login?.message ? true : false}
            />
          )}
        />
        {errors?.login?.message && <p>{errors.login.message}</p>}
        <Controller
          name={'password'}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Поле обязательно к заполнению',
            },
            minLength: {
              value: 6,
              message: 'Длина пароля должна быть от 6 символов',
            },
            maxLength: {
              value: 32,
              message: 'Длина пароля не может быть больше 32 символов',
            },
          }}
          render={({ field: { value, onChange, ref } }) => (
            <TextField
              label="Пароль"
              variant="outlined"
              type="password"
              checked={value}
              inputRef={ref}
              value={value ? value : ''}
              onChange={onChange}
              error={errors?.password?.message ? true : false}
            />
          )}
        />
        {errors?.password?.message && <p>{errors.password.message}</p>}
        <Button variant="contained" type="submit">
          Войти
        </Button>
      </form>
    </>
  );
};

export default Login;
