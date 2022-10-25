import FolderIcon from '@mui/icons-material/Folder';

import styles from './NotesFoldersItem.module.scss';

const NotesFoldersItem = ({name}) => {
	return (
		<div className={styles.folder}>
			<FolderIcon />
			<span>{name}</span>
		</div>
	);
};

export default NotesFoldersItem;