import empty from './empty.webp';

import styles from './EmptyFolders.module.scss';

const EmptyFolders = () => {
  return (
    <div className={styles.empty}>
      <img src={empty} alt="empty" />
      <p>Вы пока не создали ни одной папки</p>
    </div>
  );
};

export default EmptyFolders;
