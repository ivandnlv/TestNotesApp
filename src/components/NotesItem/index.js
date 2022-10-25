import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './NotesItem.module.scss';

const NotesItem = ({ title, content, color, created }) => {
  return (
    <div className={styles.note} style={{ background: color }}>
      <div>
        <h2>{title}</h2>
        <p>{content}</p>
        <span>Дата создания: <b>{created}</b></span>
      </div>
      <div>
        <Button variant="contained"><EditIcon color="white"/></Button>
        <Button variant="contained" color="error"><DeleteIcon color="white"/></Button>
      </div>
    </div>
  );
};

export default NotesItem;
