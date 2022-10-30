import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NotesFoldersItem from '../NotesFoldersItem';
import EmptyFolders from '../EmptyFolders';

import styles from './NotesFolders.module.scss';
import { getFolders } from '../../redux/slices/foldersSlice';

const NotesFolders = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);
  const { folders, update } = useSelector((state) => state.folders);

  useEffect(() => {
    dispatch(getFolders(token)); // eslint-disable-next-line
  }, [update]);

  return (
    <div className={styles.folders}>
      <h2>Папки</h2>
      <div>
        {folders?.length ? (
          folders.map((folder) => (
            <NotesFoldersItem
              key={folder.id}
              name={folder.name}
              id={folder.id}
              color={folder.color.toLowerCase()}
            />
          ))
        ) : (
          <EmptyFolders />
        )}
      </div>
    </div>
  );
};

export default NotesFolders;
