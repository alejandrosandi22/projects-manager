import { useEffect, useState } from 'react';

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
      return setAlertData({...alertData, state: 'hidde'});
    }, props.seconds * 1000);

    return () => {
      setAlertData({state: ''});
    };
  }, [props]);



  return (
    <>
    <div className={`${alertData.state}`}>
      <i className={`fal fa-${alertData.icon}`}></i>
      <p>{ props.message }</p>
      <i className='fal fa-times close' onClick={() => setAlertData({...alertData, state: 'hidde'})}></i>
    </div>
     <style jsx>
       {`
          div {
            z-index: 200;
            position: absolute;
            bottom: 5.5rem;
            right: 0;
            left: 0;
            margin: 0 auto;
            border-radius: 2rem;
            min-width: 25rem;
            max-width: 50rem;
            min-height: 3rem;
            max-height: 5rem;
            background: ${alertData.color};
            display: flex;
            align-items: center;
            color: #fff;
            font-size: 1.1rem;
            overflow: hidden;
            opacity: 1;
            transition: .5s;
            p {
              width: 75%;
              padding: .5rem;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            i {
              display: flex;
              justify-content: center;
              width: 15%;
            }
            .close {
              cursor: pointer;
            }
          }
          .hidde {
            pointer-events: none;
            opacity: 0;
            transition: .5s;
          }
       `}
       </style> 
    </>
  );
}

export default Alerts;
