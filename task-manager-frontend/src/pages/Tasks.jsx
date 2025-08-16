import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskForm from '../components/Tasks/TaskForm';
import TaskItem from '../components/Tasks/TaskItem';
import {
  createTask,
  deleteTask,
  fetchTasks,
  setFilters,
  updateTask,
} from '../features/tasks/taskSlice';

export default function Tasks() {
  const dispatch = useDispatch();
  const { items, page, pages, status, total, filters } = useSelector(
    (s) => s.tasks,
  );

  const [editing, setEditing] = useState(null);

  const query = useMemo(
    () => ({ page, limit: 20, ...filters }),
    [page, filters],
  );

  useEffect(() => {
    dispatch(fetchTasks(query));
  }, [dispatch, query]);

  const onCreate = async (values) => {
    await dispatch(createTask(values)).unwrap();
    setEditing(null);
    dispatch(fetchTasks(query));
  };

  const onUpdate = async (values) => {
    await dispatch(updateTask({ id: editing._id, values })).unwrap();
    setEditing(null);
  };

  const onDelete = async (id) => {
    await dispatch(deleteTask(id)).unwrap();
  };

  return (
    <>
      <div className="card" style={{ marginBottom: '1rem' }}>
        <div className="toolbar">
          <input
            className="input"
            placeholder="Search tasks…"
            value={filters.q}
            onChange={(e) => dispatch(setFilters({ q: e.target.value }))}
            style={{ flex: 2 }}
          />
          <select
            className="input"
            value={filters.status}
            onChange={(e) => dispatch(setFilters({ status: e.target.value }))}
            style={{ maxWidth: 220 }}>
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
          <span className="spacer" />
          <span className="small">{total} total</span>
        </div>
      </div>

      <TaskForm
        initial={editing}
        onSubmit={editing ? onUpdate : onCreate}
        onCancel={() => setEditing(null)}
      />

      {status === 'loading' && <div className="card">Loading tasks…</div>}

      <div className="list">
        {items.map((t) => (
          <TaskItem
            key={t._id}
            task={t}
            onEdit={setEditing}
            onDelete={onDelete}
          />
        ))}
      </div>

      <div className="toolbar" style={{ marginTop: 12 }}>
        <div className="spacer" />
        <button
          className="btn btn-ghost"
          disabled={page <= 1}
          onClick={() => dispatch(fetchTasks({ ...query, page: page - 1 }))}>
          Prev
        </button>
        <span className="small">
          Page {page} / {pages}
        </span>
        <button
          className="btn btn-ghost"
          disabled={page >= pages}
          onClick={() => dispatch(fetchTasks({ ...query, page: page + 1 }))}>
          Next
        </button>
      </div>
    </>
  );
}
