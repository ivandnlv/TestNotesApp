import axios from 'axios';
import Header from '../../components/Header';

import { useSelector, useDispatch } from 'react-redux';
import { onTokenChange } from '../../redux/slices/userSlice';

const Notes = () => {
  const dispatch = useDispatch();
  const { token, refreshToken } = useSelector((state) => state.user);

  const onBtnClick = async () => {
    axios
      .post('https://test-api.misaka.net.ru/api/Account/refresh-token', {
        refreshToken: refreshToken,
      })
      .then(({ data }) => {
        dispatch(onTokenChange({ token: data.accessToken, refreshToken: data.refreshToken }));
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      })
      .then(() => {
        axios
          .get('https://test-api.misaka.net.ru/api/Account/user', {
            headers: {
              accept: 'text/plain',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => console.log(response));
      });
  };

  return (
    <div>
      <Header />
      <button onClick={onBtnClick}>НАЖМИ</button>
    </div>
  );
};

export default Notes;
