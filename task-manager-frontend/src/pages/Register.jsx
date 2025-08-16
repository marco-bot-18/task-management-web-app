import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { register as doRegister, fetchMe } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Min 6 characters'),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const { token, status, error } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(fetchMe());
      navigate('/tasks');
    }
  }, [token, navigate, dispatch]);

  const onSubmit = (values) => dispatch(doRegister(values));

  return (
    <div className="container" style={{ maxWidth: 520 }}>
      <div className="card">
        <h2>Create account</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div>
              <label>Name</label>
              <input className="input" {...register('name')} />
              {errors.name && (
                <div className="error">{errors.name.message}</div>
              )}
            </div>
            <div>
              <label>Email</label>
              <input className="input" type="email" {...register('email')} />
              {errors.email && (
                <div className="error">{errors.email.message}</div>
              )}
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <label>Password</label>
            <input
              className="input"
              type="password"
              {...register('password')}
            />
            {errors.password && (
              <div className="error">{errors.password.message}</div>
            )}
          </div>
          <div className="toolbar" style={{ marginTop: 12 }}>
            <div className="spacer" />
            <button className="btn btn-primary" disabled={status === 'loading'}>
              {status === 'loading' ? 'Creating…' : 'Create account'}
            </button>
          </div>
        </form>
        <hr />
        <p className="small">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
