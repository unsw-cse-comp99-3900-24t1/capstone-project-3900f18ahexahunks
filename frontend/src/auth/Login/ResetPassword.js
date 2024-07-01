import React, { useEffect, useState } from 'react';
import { resetPassword } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../components/AlertError';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();
  const nav = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    if (!token) {
      nav('*'); // Navigate to a different route if no token is found
    }
  }, [token, nav]); // [token, navigate] in React Router v6

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError('');
    // setSuccess('');

    if (password !== confirmPassword) {
      showAlert('Passwords do not match', 'tomato');
      return;
    }

    try {
      const response = await resetPassword({ newPassword: password, token });
      if (response.error) {
        showAlert(
          response.data.message || 'Failed to reset password',
          'tomato'
        );
      } else {
        showAlert('Password reset successfully', 'green');
        // Optionally navigate to the login page or another route
        // navigate('/login');
      }
    } catch (e) {
      showAlert(
        'An unexpected error occurred. Please try again later.',
        'tomato'
      );
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
