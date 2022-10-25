import React from 'react';
import NotesItem from '../NotesItem';

import styles from './Notes.module.scss';

const Notes = () => {
  return <div className={styles.notes}>
	<NotesItem title="Постирать одежду" content="Сегодня я должен постирать одежду иначе мама поругает" color="white" created="25.10.2022" />
  </div>;
};

export default Notes;
