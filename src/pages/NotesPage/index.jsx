import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { onRemoveUser, onTokenChange } from '../../redux/slices/userSlice';

import Header from '../../components/Header';
import NotesFolders from '../../components/NotesFolders';
import Notes from '../../components/Notes';

import styles from './NotesPage.module.scss';
import NewNote from '../../components/NewNote';

const NotesPage = () => {
  const dispatch = useDispatch();
  const { token, refreshToken } = useSelector((state) => state.user);

  const onBtnClick = async () => {
    axios
      .post('https://test-api.misaka.net.ru/api/Account/refresh-token', {
        refreshToken: refreshToken,
      })
      .then(({ data }) => {
        dispatch(onTokenChange({ token: data.accessToken, refreshToken: data.refreshToken }));
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      })
      .catch((error) => {
        console.log(error);
        dispatch(onRemoveUser());
      })
      .then(() => {
        axios
          .get('https://test-api.misaka.net.ru/api/Account/user', {
            headers: {
              accept: 'text/plain',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => console.log(response));
      });
  };

  return (
    <div>
      <Header />
      <button onClick={onBtnClick}>НАЖМИ</button>
      <div className={styles.notes}>
        <NotesFolders />
        <Notes />
        <NewNote />
      </div>
    </div>
  );
};

export default NotesPage;
