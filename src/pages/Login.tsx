import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation();

  return <div className='text-center mt-5'>{t('navbar.loginBtn')}</div>;
}
