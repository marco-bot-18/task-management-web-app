import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login, fetchMe } from "../slicers/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { token, status, error } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/tasks";

  useEffect(() => {
    if (token) dispatch(fetchMe());
  }, [token, dispatch]);
  useEffect(() => {
    if (token) navigate(from, { replace: true });
  }, [token, from, navigate]);

  const onSubmit = (values) => dispatch(login(values));

  return (
    <div className="container" style={{ maxWidth: 480 }}>
      <div className="card">
        <h2>Welcome back</h2>
        <p className="small">Use your account to sign in.</p>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: 10 }}>
            <label>Email</label>
            <input
              className="input"
              type="email"
              {...register("email", { required: true })}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Password</label>
            <input
              className="input"
              type="password"
              {...register("password", { required: true })}
            />
          </div>
          <button className="btn btn-primary" disabled={status === "loading"}>
            {status === "loading" ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <hr />
        <p className="small">
          No account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}
