import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { onCloseAll } from '../../redux/slices/newSlice';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { createNewFolder } from '../../redux/slices/newSlice';
import styles from './NewFolderModal.module.scss';

const NewFolderModal = () => {
  const dispatch = useDispatch();
  const { newFolder } = useSelector((state) => state.new);
  const { token } = useSelector((state) => state.user);

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({ mode: 'onSubmit', defaultValues: { folderColor: 'White' } });

  const onSubmit = (data) => {
    const { folderColor, folderName } = data;
    dispatch(createNewFolder({ folderName, folderColor, token }));
  };

  const onCloseModal = () => {
    dispatch(onCloseAll());
  };

  const radioColors = [
    { color: 'White', label: 'Белый' },
    { color: 'Blue', label: 'Синий' },
    { color: 'Orange', label: 'Оранжевый' },
    { color: 'Red', label: 'Красный' },
    { color: 'Yellow', label: 'Желтый' },
    { color: 'Purple', label: 'Фиолетовый' },
    { color: 'Pink', label: 'Розовый' },
    { color: 'Green', label: 'Зеленый' },
    { color: 'Lime', label: 'Лаймовый' },
    { color: 'LightGray', label: 'Светло-серый' },
  ];

  return (
    <div className={styles.modal}>
      <Modal
        open={newFolder}
        onClose={onCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div className={styles.folder}>
          <h2>Создать папку</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name={'folderName'}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Поле обязательно к заполнению',
                },
                maxLength: {
                  value: 32,
                  message: 'Длина имени папки не может быть больше 32 символов',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Введите имя папки"
                  error={errors?.folderName?.message ? true : false}
                />
              )}
            />
            {errors?.folderName && <p>{errors?.folderName?.message || 'Ошибка!'}</p>}
            <label className={styles.label}>
              Выберите цвет папки
              <Controller
                name={'folderColor'}
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="white"
                    name="radio-buttons-group"
                    {...field}>
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

export default NewFolderModal;
