import { useSelector } from 'react-redux';
import Alert from './alert';

export default function Alerts() {
  const alert = useSelector((state) => state.alert);

  return (
    <>
      {
        alert.status && <Alert type={alert.type} message={alert.message} seconds={alert.seconds} />
      }
    </>
  );
}
