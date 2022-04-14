import { useEffect, useState } from 'react';
import styles from 'styles/alerts.module.scss';

const Alerts = (props) => {

  const [ alertData, setAlertData ] = useState({state: ''});

  const typeAlert = () => {
    switch (props.type) {
      case 'success':
        return setAlertData({...alertData, color: '#71B371', icon: 'check'});
      
      case 'warning':
        return setAlertData({...alertData, color: '#F7A735', icon: 'engine-warning'});
      
      case 'error':
        return setAlertData({...alertData, color: '#CA5E58', icon: 'exclamation-triangle'});

      case 'information':
        return setAlertData({...alertData, color: '#56A9C1', icon: 'info'});
    
      default:
        return setAlertData({...alertData, color: '#71B371', icon: 'check'});
    }
  }

  useEffect(() => {
    typeAlert();
    setTimeout(() => {
      return setAlertData({...alertData, state: 'hidden'});
    }, props.seconds * 1000);

    return () => {
      setAlertData({state: ''});
    };
  }, [props]);



  return (
    <div className={`${styles.div} ${styles[alertData.state]}`} style={{background: `${alertData.color}`}}>
      <i className={`fal fa-${alertData.icon}`}></i>
      <p>{ props.message }</p>
      <i className='fal fa-times close' onClick={() => setAlertData({...alertData, state: 'hidden'})}></i>
    </div>
  );
}

export default Alerts;
