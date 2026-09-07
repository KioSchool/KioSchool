import { useNavigate } from 'react-router-dom';
import AppContainer from '@components/common/container/AppContainer';
import RegisterForm, { PendingRegistration } from '@components/user/register/RegisterForm';
import { colFlex } from '@styles/flexStyles';
import { USER_ROUTES } from '@constants/routes';

function Register() {
  const navigate = useNavigate();

  // Task 10에서 values를 실제 가입 요청에 사용하도록 교체된다
  const handleFormSubmit: (values: PendingRegistration) => void = () => {
    localStorage.setItem('isLoggedIn', 'true');
    navigate(USER_ROUTES.HOME);
  };

  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })} useTitle={false} useFullHeight={true}>
      <RegisterForm onSubmit={handleFormSubmit} />
    </AppContainer>
  );
}

export default Register;
