import { useSelector, useDispatch } from 'react-redux';
import { updateToken } from '../../redux/slices/userSlice';

import Header from '../../components/Header';
import NotesFolders from '../../components/NotesFolders';
import Notes from '../../components/Notes';

import styles from './NotesPage.module.scss';
import NewNote from '../../components/NewNote';
import { useEffect } from 'react';
import NewFolderModal from '../../components/NewFolderModal';
import NewNoteModal from '../../components/NewNoteModal';

const NotesPage = () => {
  const dispatch = useDispatch();
  const { refreshToken } = useSelector((state) => state.user);
  const { newFolder } = useSelector((state) => state.folders);
  const { newNote } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(updateToken(refreshToken));
  }, []);

  return (
    <div>
      {newFolder && <NewFolderModal />}
      {newNote && <NewNoteModal />}
      <Header />
      <div className={styles.notes}>
        <NotesFolders />
        <Notes />
        <NewNote />
      </div>
    </div>
  );
};

export default NotesPage;
