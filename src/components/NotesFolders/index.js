import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import EmptyFolders from '../EmptyFolders';
import NotesFoldersItem from '../NotesFoldersItem';

import styles from './NotesFolders.module.scss';

const NotesFolders = () => {
  const { token } = useSelector((state) => state.user);

  const [folders, setFolders] = useState([]);

  useEffect(() => {
    axios
      .get('https://test-api.misaka.net.ru/api/Folders', {
        headers: {
          accept: 'text/plain',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFolders(response.data);
      });
  }, [token]);

  return (
    <div className={styles.folders}>
      <h2>Папки</h2>
      <div>
        {/* {folders.length ? folders.map((folder) => <div>{folder}</div>) : <EmptyFolders />} */}
        <NotesFoldersItem name='Важные дела'/>
      </div>
    </div>
  );
};

export default NotesFolders;
