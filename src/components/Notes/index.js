import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNotes } from '../../redux/slices/notesSlice';
import EmptyNotes from '../EmptyNotes';
import NotesItem from '../NotesItem';

import styles from './Notes.module.scss';

const Notes = () => {
  const dispatch = useDispatch();

  const { notes, id, update } = useSelector((state) => state.notes);
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(getNotes({ token, id }));
    } // eslint-disable-next-line
  }, [update, id]);

  return (
    <div className={styles.notes}>
      <h2>Заметки</h2>
      {notes?.length ? (
        notes.map((note) => (
          <NotesItem
            title={note.title}
            key={note.id}
            id={note.id}
            content={note.content}
            color={note.color.toLowerCase()}
            created={note.created}
            updated={note.updated}
          />
        ))
      ) : (
        <EmptyNotes />
      )}
    </div>
  );
};

export default Notes;
