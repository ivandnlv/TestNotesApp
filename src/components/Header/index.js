import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es/exports';
import { Button } from '@mui/material';

import styles from './Header.module.scss';
import { onRemoveUser } from '../../redux/slices/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.user);

  const onExitClick = () => {
    dispatch(onRemoveUser());
  };

  return (
    <div className={styles.header}>
      <div>
        <h2>Вы вошли как: {username ? username : 'username'}</h2>
      </div>
      <Button variant="contained" onClick={onExitClick}>
        Выйти
      </Button>
    </div>
  );
};

export default Header;
