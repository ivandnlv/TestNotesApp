import { useSelector, useDispatch } from 'react-redux';
import { Modal, TextField, Button, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { noteCreate, onNewNoteClose } from '../../redux/slices/notesSlice';
import { Controller, useForm } from 'react-hook-form';
import { radioColors } from '../NewFolderModal';

import styles from './NewNoteModal.module.scss';

const NewNoteModal = () => {
  const dispatch = useDispatch();
  const { newNote, id } = useSelector((state) => state.notes);
  const { token } = useSelector((state) => state.user);

  const onModalClose = () => {
    dispatch(onNewNoteClose());
  };

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({ mode: 'onSubmit', defaultValues: { noteColor: 'White' } });

  const onSubmit = (data) => {
    const { noteColor, noteContent, noteName } = data;
    dispatch(noteCreate({ title: noteName, content: noteContent, color: noteColor, token, id }));
    console.log(data);
  };

  return (
    <div className={styles.note}>
      <Modal
        open={newNote}
        onClose={onModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div className={styles.note}>
          <h2>Создать заметку</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name={'noteName'}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Поле обязательно к заполнению',
                },
                maxLength: {
                  value: 32,
                  message: 'Длина имени заметки не может быть больше 32 символов',
                },
              }}
              render={({ field: { value, onChange, ref } }) => (
                <TextField
                  onChange={onChange}
                  inputRef={ref}
                  checked={value}
                  value={value ? value : ''}
                  label="Введите имя заметки"
                  error={errors?.noteName?.message ? true : false}
                />
              )}
            />
            {errors?.noteName && <p>{errors?.noteName?.message || 'Ошибка!'}</p>}
            <Controller
              name={'noteContent'}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Поле обязательно к заполнению',
                },
                maxLength: {
                  value: 256,
                  message: 'Длина текста заметки не может быть больше 256 символов',
                },
              }}
              render={({ field: { value, onChange, ref } }) => (
                <TextField
                  onChange={onChange}
                  inputRef={ref}
                  checked={value}
                  value={value ? value : ''}
                  label="Введите текст заметки"
                  multiline
                  minRows={2}
                  maxRows={Infinity}
                  error={errors?.noteContent?.message ? true : false}
                />
              )}
            />
            {errors?.noteContent && <p>{errors?.noteContent?.message || 'Ошибка!'}</p>}
            <label className={styles.label}>
              Выберите цвет заметки
              <Controller
                name={'noteColor'}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="white"
                    name="radio-buttons-group"
                    onChange={onChange}
                    value={value ? value : ''}>
                    {radioColors.map((obj) =>
                      obj.color === 'White' ? (
                        <FormControlLabel
                          key={obj.color}
                          value={obj.color}
                          control={<Radio />}
                          label={obj.label}
                        />
                      ) : (
                        <FormControlLabel
                          key={obj.color}
                          value={obj.color}
                          control={<Radio />}
                          label={obj.label}
                          style={{ color: obj.color }}
                        />
                      ),
                    )}
                  </RadioGroup>
                )}
              />
            </label>

            <Button variant="contained" type="submit">
              Создать
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default NewNoteModal;
