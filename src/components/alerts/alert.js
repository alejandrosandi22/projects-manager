import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from 'styles/alerts.module.scss';

export default function Alert({ type, seconds, message }, props) {
  const [alertData, setAlertData] = useState({ state: '' });
  const dispatch = useDispatch();

  const typeAlert = () => {
    switch (type) {
      case 'success':
        return setAlertData({ ...alertData, color: '#71B371', icon: 'check' });

      case 'warning':
        return setAlertData({ ...alertData, color: '#F7A735', icon: 'engine-warning' });

      case 'error':
        return setAlertData({ ...alertData, color: '#CA5E58', icon: 'exclamation-triangle' });

      case 'information':
        return setAlertData({ ...alertData, color: '#56A9C1', icon: 'info' });

      default:
        return setAlertData({ ...alertData, color: '#71B371', icon: 'check' });
    }
  };

  useEffect(() => {
    typeAlert();
    setTimeout(() => {
      dispatch({
        type: '@alert/show',
        payload: { status: false },
      });
      return setAlertData({ ...alertData, state: 'hidden' });
    }, seconds * 1000);

    return () => {
      setAlertData({ state: '' });
    };
  }, [props]);

  return (
    <div className={`${styles.div} ${styles[alertData.state]}`} style={{ background: `${alertData.color}` }}>
      <i className={`fal fa-${alertData.icon}`} />
      <p>{ message }</p>
      <i className="fal fa-times close" onClick={() => setAlertData({ ...alertData, state: 'hidden' })} />
    </div>
  );
}
