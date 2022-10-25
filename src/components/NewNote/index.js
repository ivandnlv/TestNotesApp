import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';

import styles from './NewNote.module.scss'

const NewNote = () => {
	return (
		
		<div className={styles.new}>
			<Button variant="contained">
				<AddCircleIcon />
			</Button>
		</div>
	);
};

export default NewNote;