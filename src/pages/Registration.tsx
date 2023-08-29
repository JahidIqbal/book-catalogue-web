import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, Auth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Registration: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async () => {
    try {
      const authInstance: Auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);

      if (authInstance.currentUser) {
        await updateProfile(authInstance.currentUser, {
          displayName: username,
        });

        // Set a flag indicating registration completion
        localStorage.setItem('registrationComplete', 'true');
      }

      // Wait for a brief moment before navigating
      setTimeout(() => {
        navigate('/');
      }, 1000); // Wait for 1 second

    } catch (error: any) {
      console.error((error as Error).message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="mb-0">Registration</h2>
            </div>
            <div className="card-body">
            <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="btn btn-primary mt-4" onClick={handleRegistration}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
