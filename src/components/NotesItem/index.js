import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

import styles from './NotesItem.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, editNote } from '../../redux/slices/notesSlice';

const NotesItem = ({ title, content, color, created, updated, id }) => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);

  const dateNormalize = (d) => {
    const date = new Date(d);
    const extraDate = date.toISOString().substring(0, 10);
    const normalDate = extraDate.split('-').reverse();

    return normalDate.join('.');
  };

  const [change, setChange] = useState(false);
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteContent, setNoteContent] = useState(content);

  const onTitleEdit = (value) => {
    setNoteTitle(value);
  };

  const onContentEdit = (value) => {
    setNoteContent(value);
  };

  const onDeleteClick = () => {
    dispatch(deleteNote({ id, token }));
  };

  const onEditClick = () => {
    setChange(!change);
    if ((change && title !== noteTitle) || content !== noteContent) {
      dispatch(editNote({ token, title: noteTitle, content: noteContent, id }));
    }
  };

  return (
    <div className={styles.note} style={{ background: color }}>
      <div>
        {change ? (
          <>
            <input value={noteTitle} onChange={(e) => onTitleEdit(e.target.value)} />
            <textarea value={noteContent} onChange={(e) => onContentEdit(e.target.value)} />
          </>
        ) : (
          <>
            <input value={title} onChange={(e) => onTitleEdit(e.target.value)} disabled />
            <textarea value={content} onChange={(e) => onContentEdit(e.target.value)} disabled />
          </>
        )}
        <span>Дата создания: {dateNormalize(created)}</span>
        {created !== updated && <span>Дата обновления: {dateNormalize(updated)}</span>}
      </div>
      <div>
        <Button variant="contained" onClick={onEditClick}>
          {change ? <CheckIcon /> : <EditIcon color="white" />}
        </Button>
        <Button variant="contained" color="error" onClick={onDeleteClick}>
          <DeleteIcon color="white" />
        </Button>
      </div>
    </div>
  );
};

export default NotesItem;
