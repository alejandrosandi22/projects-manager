import Alert from './alert';
import { useSelector } from 'react-redux';
export default function Alerts() {
  const alert = useSelector((state) => state.alert);

  return(
    <>
      {
        alert.status && <Alert type={alert.type} message={alert.message} seconds={alert.seconds}/>
      }
    </>
  );
}