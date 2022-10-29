import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './NewNote.module.scss';
import { onNewFolderShow } from '../../redux/slices/newSlice';

const NewNote = () => {
  const dispatch = useDispatch();
  const [opacity, setOpacity] = useState(0);

  const onCreateFolderClick = () => {
    dispatch(onNewFolderShow());
  };

  const onMouseHover = () => {
    if (opacity == 1) {
      setOpacity(0);
    } else {
      setOpacity(1);
    }
  };

  return (
    <div className={styles.new}>
      <ButtonGroup size="large" aria-label="small button group" style={{ opacity: opacity }}>
        {opacity ? (
          <>
            <Button size="large" onClick={onCreateFolderClick}>
              Создать папку
            </Button>
            <Button size="large">Создать заметку</Button>
          </>
        ) : (
          <>
            <Button size="large" onClick={onCreateFolderClick} disabled>
              Создать папку
            </Button>
            <Button size="large" disabled>
              Создать заметку
            </Button>
          </>
        )}
      </ButtonGroup>
      <Button className={styles.add} variant="contained" size="large" onClick={onMouseHover}>
        <AddCircleIcon />
      </Button>
    </div>
  );
};

export default NewNote;
