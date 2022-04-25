import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/button/button';
import Input from 'components/input/input';
import styles from 'styles/modals/createProject.module.scss';

import { ALL_PROJECTS_QUERY, CREATE_PROJECT, EDIT_PROJECT } from '../../../graphql/queries/projects';

export function CustomField({getCredentials, handleRemoveField, removedFields, id}) {
  return(
    <>
    {
      !removedFields.includes(id) &&
      <div className={styles.customFileWrapper}>
        <Input required={false} onChange={getCredentials} type="text" id={id} name={`customFieldName${id}`} label="Field Name: " />
        <Input required={false} onChange={getCredentials} type="text" id={id} name={`customFieldContent${id}`} label="Field Content: " />
        <aside>
          <Button onClick={() => handleRemoveField(id)} type='button' className='fal fa-times' />
        </aside>
      </div>
    }
    </>
  );
}

export default function CreateProject({ modalsEvents }) {

  const [ removedFields, setRemoveFields ] = useState([0,1,2,3,4]);
  const [ customFields, setCustomFields ] = useState();
  const [ hidde, setHidde ] = useState(false);
  const inputData = useRef({});
  const fieldsNumber = useRef(5);
  const fieldId = useRef(null);
  const user = useSelector((state) => state.user);
  const createProject = useSelector((state) => state.modals.createProject)
  const { filter } = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  const inputName = useRef();

  const [ createdProject ] = useMutation(CREATE_PROJECT, {
    refetchQueries: () => [{
      query: ALL_PROJECTS_QUERY,
      variables: {
        filter: {sort: filter.sort, completed: filter.completed},
        userId: user.id,
      },
    }],
    onError: (error) => {
      console.error(error);
      dispatch({
        type: '@alert/show',
        payload: {status: true, type: 'error', message: 'An error has occurred', seconds: 5},
      });
    },
    onCompleted: () => {
      dispatch({
        type: '@alert/show',
        payload: {status: true, type: 'success', message: 'Project created successfully', seconds: 5}
      });
      closeModal();
    },
  });

  const [ editProject ] = useMutation(EDIT_PROJECT, {
    refetchQueries: () => [{
      query: ALL_PROJECTS_QUERY,
      variables: {
        filter: {sort: filter.sort, completed: filter.completed},
        userId: user.id,
      },
      options: {
        awaitRefetchQueries: true
      },
    }],
    onError: () => {
      dispatch({
        type: '@alert/show',
        payload: {status: true, type: 'error', message: 'An error has occurred', seconds: 5},
      });
    },
    onCompleted: () => {
      dispatch({
        type: '@alert/show',
        payload: {status: true, type: 'success', message: 'Project updated successfully', seconds: 5}
      });
      closeModal();
    },
  });

  const handleRemoveField = (id) => {
    fieldId.current = id;
    setRemoveFields([...removedFields, fieldId.current]);
  }

  useEffect(() => {
    removedFields.sort();

    const items = [];
    
    for (let i = 0; i < fieldsNumber.current; i++) {
      items.push(<CustomField key={i} removedFields={removedFields} handleRemoveField={handleRemoveField} id={i} getCredentials={getCredentials} />);
    }

    setCustomFields(items);

  }, [removedFields])

  const getCredentials = (e) => {
    inputData.current = {
      ...inputData.current,
      [e.target.name]: e.target.value
    }
  }

  const addField = () => {
    const fieldsLength = removedFields.length

    setRemoveFields(removedFields.slice(1,fieldsLength));
    removedFields.sort();
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {};

    if (createProject.functionality === 'create') {
      alert('create');
      data = inputData.current;
    }
    if (createProject.functionality === 'edit') {
      alert('edit')
      data = { ...createProject.data, ...createProject.data.customFields, ...inputData.current};
    }

    const organizedData = {
      name: data.name,
      description: data.description,
      customField1: {name: data.customFieldName0, content: data.customFieldContent0},
      customField2: {name: data.customFieldName1, content: data.customFieldContent1},
      customField3: {name: data.customFieldName2, content: data.customFieldContent2},
      customField4: {name: data.customFieldName3, content: data.customFieldContent3},
      customField5: {name: data.customFieldName4, content: data.customFieldContent4},
      userId: user.id,
      completed: false,
      id: data.id,
    }

    if (createProject.functionality === 'create') createdProject({variables: {...organizedData}});
    return editProject({variables: {...organizedData}});
  }

  const closeModal = () => {
    setHidde(true);
    setTimeout(() => {
      setHidde(false);
      modalsEvents('createProject', {status: false});
    }, 300);
  }

  return(
    <>
      <section className={`${styles.section} ${hidde && styles.hidde}`}>
        <span>
          <main>
            <h3>
              {
                createProject &&
                createProject.functionality === 'create'
                ? 'Create New Project'
                : 'Update Project'
              }
            </h3>
            <i onClick={() => closeModal()} className='fal fa-times'></i>
          </main>
          <form onSubmit={(e) => hanldeCreateNewProject(e)}>
            <div className={styles.requiredInputs}>
              <Input reference={inputName} required={true} onChange={getCredentials} type="text" name="name" id="name" label="Project Name: "/>
              <Input required={true} onChange={getCredentials} type="text" name="description" id="description" label="Description: " />
            </div>
            <p>
              <Button onClick={() => addField()} type="button" className="fal fa-plus" />
            </p>
            <div className={styles.customFilesContainer}>
              { customFields }
            </div>
            <div className={styles.buttonsContainer}>
              <Button onClick={() => closeModal()} type='button' caption="Cancel" />
              <Button onClick={(e) => handleSubmit(e)} type='submit' caption={
                createProject.functionality === 'create' ? 'Create' : 'Update'
              } />
            </div>
          </form>
        </span>
      </section>
    </>
  );
}