import { useEffect, useRef, useState } from 'react';
import styles from 'styles/modals/filter.module.scss';
import Button from 'components/button';
import { useSelector } from 'react-redux';

export default function Filter({ modalsEvents }) {
  const modals = useSelector((state) => state.modals);

  const [hidde, setHidde] = useState(false);
  const [filter, setFilter] = useState(modals.filter);

  const latest = useRef();
  const oldest = useRef();
  const name = useRef();
  const completed = useRef();

  const getOrderBy = (e) => {
    const { id } = e.target;
    if (id === 'completedFilter') return setFilter({ ...filter, completed: !filter.completed });
    setFilter({ ...filter, sort: id });
  };

  useEffect(() => {
    if (filter.sort !== 'latest') latest.current.checked = false;
    if (filter.sort !== 'oldest') oldest.current.checked = false;
    if (filter.sort !== 'name') name.current.checked = false;
  }, [filter]);

  useEffect(() => {
    if (modals.filter.sort === 'latest') latest.current.checked = true;
    if (modals.filter.sort === 'oldest') oldest.current.checked = true;
    if (modals.filter.sort === 'name') name.current.checked = true;

    if (modals.filter.completed) completed.current.checked = true;
  }, []);

  const acceptFilters = async () => {
    setHidde(true);
    setTimeout(() => {
      setHidde(false);
      modalsEvents(
        'filter',
        {
          status: false,
          sort: filter.sort,
          completed: filter.completed,
        },
      );
    }, 300);
  };

  return (
    <section className={`${styles.section} ${hidde && styles.hidde}`}>
      <span>
        <main>
          <h3>Filter Projects</h3>
          <i onClick={() => acceptFilters()} className="fal fa-times" />
        </main>
        <div className={styles.inputsWrapper}>
          <h2>Order By</h2>
          <div>
            <input ref={latest} onChange={getOrderBy} type="checkbox" name="latest" id="latest" />
            <label htmlFor="latest">Latest</label>
          </div>
          <div>
            <input ref={oldest} onChange={getOrderBy} type="checkbox" name="oldest" id="oldest" />
            <label htmlFor="oldest">Oldest</label>
          </div>
          <div>
            <input ref={name} onChange={getOrderBy} type="checkbox" name="name" id="name" />
            <label htmlFor="name">Name</label>
          </div>
          <h2>Only</h2>
          <div>
            <input ref={completed} onChange={getOrderBy} type="checkbox" name="completedFilter" id="completedFilter" />
            <label htmlFor="completedFilter">Completed</label>
          </div>
        </div>
        <Button onClick={acceptFilters} type="button" caption="Accept" />
      </span>
    </section>
  );
}
