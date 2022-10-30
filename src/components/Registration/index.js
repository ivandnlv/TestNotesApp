import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { createUser } from '../../redux/slices/userSlice';
import { useForm, Controller } from 'react-hook-form';
import Alert from '@mui/material/Alert';

const Registration = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({ mode: 'onSubmit' });

  const sendData = (data) => {
    dispatch(createUser({ username: data.login, email: data.email, password: data.password }));
  };

  return (
    <>
      {status === 'error' && (
        <Alert severity="error" style={{ margin: '20px 0' }}>
          Пользователем с таким логином или email уже существует
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
              label="Придумайте логин"
              variant="outlined"
              value={value ? value : ''}
              checked={value}
              inputRef={ref}
              onChange={onChange}
              error={errors?.login?.message ? true : false}
            />
          )}
        />
        {errors?.login?.message && <p>{errors.login.message}</p>}
        <Controller
          name={'email'}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Поле обязательно к заполнению',
            },
          }}
          render={({ field: { value, onChange, ref } }) => (
            <TextField
              label="Введите email"
              variant="outlined"
              onChange={onChange}
              inputRef={ref}
              value={value ? value : ''}
              checked={value}
              error={errors?.email?.message ? true : false}
            />
          )}
        />
        {errors?.email?.message && <p>{errors.email.message}</p>}
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
              message: 'Длина логина не может быть больше 32 символов',
            },
          }}
          render={({ field: { value, onChange, ref } }) => (
            <TextField
              label="Придумайте пароль"
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
        {errors?.password?.message && <p>{errors.password?.message}</p>}
        <Button variant="contained" type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </>
  );
};

export default Registration;
