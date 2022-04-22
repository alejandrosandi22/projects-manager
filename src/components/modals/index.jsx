import CreateProject from './createProject';
import { useDispatch, useSelector } from 'react-redux';
import DeleteProject from "./deleteProject";

export default function Modals() {
  const { modals } = useSelector((state) => state);
  const dispatch = useDispatch();

  const modalsEvents = (name, value) => {
    dispatch({
      type: '@modal/open',
      payload: {name, value}
    });
  }

  return(
    <>
    { modals.deleteProject.status && <DeleteProject modalsEvents={modalsEvents} /> }
    { modals.createProject && <CreateProject modalsEvents={modalsEvents} /> }
    </>
  );
}