import FolderIcon from '@mui/icons-material/Folder';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFolder } from '../../redux/slices/newSlice';

import styles from './NotesFoldersItem.module.scss';

const NotesFoldersItem = ({ name, color, id }) => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);

  const onDeleteFolder = () => {
    dispatch(deleteFolder({ id, token }));
  };

  return (
    <div className={styles.folder} style={{ background: color }}>
      <FolderIcon />
      <span>{name}</span>
      <button onClick={onDeleteFolder}>del</button>
    </div>
  );
};

export default NotesFoldersItem;
