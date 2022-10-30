import EmptyPic from '../EmptyFolders/empty.webp';
import arrow from './arrow.png';

import styles from '../EmptyFolders/EmptyFolders.module.scss';
import noteStyles from './EmptyNotes.module.scss';
import { useSelector } from 'react-redux';

const EmptyNotes = () => {
  const { id } = useSelector((state) => state.notes);

  return (
    <div className={id ? styles.empty : noteStyles.empty}>
      {!id && (
        <>
          <img src={arrow} alt="arrow-left" />
          <p>
            Для начала выберите папку, если их нет, то создайте, нажав на + в правом нижнем углу
          </p>
        </>
      )}
      {id && (
        <>
          <img src={EmptyPic} alt="Empty" />
          <p>Вы пока не создали ни одной заметки в данной папке</p>
        </>
      )}
    </div>
  );
};

export default EmptyNotes;
