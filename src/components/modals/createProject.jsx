import { useMutation } from '@apollo/client';
import Button from 'components/button/button';
import Input from 'components/input/input';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from 'styles/modal/createProject.module.scss';
import { ALL_PROJECTS_QUERY, CREATE_PROJECT } from '../../../graphql/queries/projects';

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
  const dispatch = useDispatch();

  const [ createdProject ] = useMutation(CREATE_PROJECT, {
    refetchQueries: () => [{
      query: ALL_PROJECTS_QUERY,
      variables: {
        completed: false,
        userId: user._id,
      }
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
        payload: {status: true, type: 'success', message: 'Project created successfully', seconds: 5}
      });
      closeModal();
    },
  });

  const handleRemoveField = (id) => {
    fieldId.current = id;
    setRemoveFields([...removedFields, fieldId.current]);
  }

  useEffect(() => {
     removedFields.sort()

    const items = [];
    
    for (let i = 0; i < fieldsNumber.current; i++) {
      items.push(<CustomField key={i} removedFields={removedFields} handleRemoveField={handleRemoveField} id={i} getCredentials={getCredentials} />);
    }

    setCustomFields(items);

  }, [removedFields])

  const getCredentials = (e) => {
    inputData.current = {
      ...inputData.current,
      userId: user._id,
      [e.target.name]: e.target.value
    }
  }

  const addField = () => {

    const fieldsLength = removedFields.length

    setRemoveFields(removedFields.slice(1,fieldsLength));
    removedFields.sort();
  }

  const hanldeCreateNewProject = (e) => {
    e.preventDefault();

    const data = inputData.current;

    const organizedData = {
      name: data.name,
      description: data.description,
      customField1: {name: data.customFieldName0, content: data.customFieldContent0},
      customField2: {name: data.customFieldName1, content: data.customFieldContent1},
      customField3: {name: data.customFieldName2, content: data.customFieldContent2},
      customField4: {name: data.customFieldName3, content: data.customFieldContent3},
      customField5: {name: data.customFieldName4, content: data.customFieldContent4},
      userId: data.userId,
      completed: false
    }

    createdProject({variables: {...organizedData}});
  }

  const closeModal = () => {
    setHidde(true);
    setTimeout(() => {
      setHidde(false);
      modalsEvents('createProject', false);
    }, 300);
  }

  return(
    <>
      <section className={`${styles.section} ${hidde && styles.hidde}`}>
        <span>
          <main>
            <h3>Create New Project</h3>
            <i onClick={() => closeModal()} className='fal fa-times'></i>
          </main>
          <form onSubmit={(e) => hanldeCreateNewProject(e)}>
            <div className={styles.requiredInputs}>
              <Input required={true} onChange={getCredentials} type="text" name="name" id="name" label="Project Name: "/>
              <Input required={true} onChange={getCredentials} type="text" name="description" id="description" label="Description: " />
            </div>
            <p>
              <Button onClick={() => addField()} type="button" className="fal fa-plus" />
            </p>
            <div className={styles.customFilesContainer}>
              { customFields }
            </div>
            <div className={styles.buttonsContainer}>
              <Button type='button' caption="Cancel" />
              <Button type='submit' onSubmit={(e) => hanldeCreateNewProject(e)} caption="Save" />
            </div>
          </form>
        </span>
      </section>
    </>
  );
}