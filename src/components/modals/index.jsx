import CreateProject from './createProject';
import DeleteProject from "./deleteProject";
import Filter from './filter';
import { useDispatch, useSelector } from 'react-redux';

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
    { modals.filter.status && <Filter modalsEvents={modalsEvents} /> }
    </>
  );
}