import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import AuthForm from '../components/ui/AuthForm';

const Signup = () => {
  const [formState, setFormState] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data } = await api.post('/auth/signup', formState);
      
      if (data.success && data.user) {
        setUser(data.user);
        // Rely entirely on httpOnly cookie for session token
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'name', type: 'text', placeholder: 'Full Name' },
    { name: 'email', type: 'email', placeholder: 'Email Address' },
    { name: 'password', type: 'password', placeholder: 'Password (min 8 chars)' },
  ];

  return (
    <AuthForm
      title="Request Access"
      subtitle="Join The Monoliths client portal"
      fields={fields}
      formState={formState}
      setFormState={setFormState}
      onSubmit={handleSubmit}
      error={error}
      loading={loading}
      submitLabel="Create Account"
      bottomText="Already a client?"
      bottomLinkText="Sign In"
      bottomLinkTo="/login"
    />
  );
};

export default Signup;