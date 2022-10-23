import { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import Login from '../../components/Login';
import Registration from '../../components/Registration';

import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.login}>
      <Tabs onChange={handleChange} value={value} selectionFollowsFocus>
        <Tab label="Войти" />
        <Tab label="Регистрация" />
      </Tabs>
      {!value ? <Login /> : <Registration />}
    </div>
  );
};

export default LoginPage;
