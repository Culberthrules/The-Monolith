import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import AuthForm from '../components/ui/AuthForm';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data } = await api.post('/auth/login', formState);
      
      if (data.success && data.user) {
        setUser(data.user);
        // We only store the user state. The httpOnly cookie handles the token.
        // We do NOT store token in localStorage anymore for security.
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'email', type: 'email', placeholder: 'Email Address' },
    { name: 'password', type: 'password', placeholder: 'Password' },
  ];

  return (
    <AuthForm
      title="Welcome Back"
      subtitle="Sign in to your client portal"
      fields={fields}
      formState={formState}
      setFormState={setFormState}
      onSubmit={handleSubmit}
      error={error}
      loading={loading}
      submitLabel="Sign In"
      bottomText="Don't have an account?"
      bottomLinkText="Request Access"
      bottomLinkTo="/signup"
    />
  );
};

export default Login;
