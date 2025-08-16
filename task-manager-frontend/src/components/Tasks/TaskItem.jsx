export default function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{task.title}</h3>
        <span className={`badge ${task.status}`}>{task.status}</span>
      </div>
      {task.description && <p className="small" style={{ marginTop: 6 }}>{task.description}</p>}
      <div className="toolbar" style={{ marginTop: 8 }}>
        <span className="small">Created: {new Date(task.createdAt).toLocaleString()}</span>
        <div className="spacer" />
        <button className="btn btn-ghost" onClick={() => onEdit(task)}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
}
