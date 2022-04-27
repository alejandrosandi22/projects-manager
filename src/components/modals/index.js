import CreateProject from './createProject';
import DeleteProject from "./deleteProject";
import Filter from './filter';
import { useDispatch, useSelector } from 'react-redux';
import Project from './project';

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
    { modals.project.status && <Project modalsEvents={modalsEvents} /> }
    { modals.deleteProject.status && <DeleteProject modalsEvents={modalsEvents} /> }
    { modals.createProject.status && <CreateProject modalsEvents={modalsEvents} /> }
    { modals.filter.status && <Filter modalsEvents={modalsEvents} /> }
    </>
  );
}