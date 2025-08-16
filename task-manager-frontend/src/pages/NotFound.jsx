import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="card" style={{ marginTop: 20 }}>
      <h2>Page not found</h2>
      <p className="small">
        Go back to <Link to="/tasks">Tasks</Link>
      </p>
    </div>
  );
}
