import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function Navbar() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="card" style={{ margin: '1rem auto', maxWidth: 980 }}>
      <div className="toolbar">
        <Link to="/tasks" style={{ fontWeight: 700 }}>Task Manager</Link>
        <div className="spacer" />
        {user ? (
          <>
            <span className="small">Hello, {user.name}</span>
            <button className="btn btn-ghost" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="btn btn-ghost" to="/login">Login</Link>
            <Link className="btn btn-primary" to="/register">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
