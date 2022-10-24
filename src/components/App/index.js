import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import LoginPage from '../../pages/LoginPage';
import Notes from '../../pages/Notes';

import styles from './App.module.scss';
import { onTokenChange, onUsernameChange } from '../../redux/slices/userSlice';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    const localToken = localStorage?.getItem('token');
    const localUsername = localStorage?.getItem('username');
    const localRefreshToken = localStorage?.getItem('refreshToken');

    if (localToken && localUsername && localRefreshToken) {
      dispatch(onTokenChange({ token: localToken, refreshToken: localRefreshToken }));
      dispatch(onUsernameChange(localUsername));
    }
  });

  return <div className={styles.app}>{token ? <Notes /> : <LoginPage />}</div>;
}

export default App;
