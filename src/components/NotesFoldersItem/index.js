import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFolder } from '../../redux/slices/foldersSlice';

import styles from './NotesFoldersItem.module.scss';
import { setId } from '../../redux/slices/notesSlice';

const NotesFoldersItem = ({ name, color, id }) => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);

  const onFolderClick = () => {
    // dispatch;
    dispatch(setId(id));
  };

  const onDeleteFolder = () => {
    dispatch(deleteFolder({ id, token }));
  };

  return (
    <div className={styles.folder} style={{ background: color }} onClick={onFolderClick}>
      <FolderIcon />
      <span>{name}</span>
      <button onClick={onDeleteFolder}>
        <DeleteIcon />
      </button>
    </div>
  );
};

export default NotesFoldersItem;
