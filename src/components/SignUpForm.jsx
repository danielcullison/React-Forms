import React, { useState } from 'react';

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function validateUsername(username) {
    return username.length >= 8;
  }

  function validatePassword(password) {
    return password.length >= 8;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Validate username and password
    if (!validateUsername(username)) {
      setError("Username must be at least 8 characters long.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
      setSuccess(true);
      setUsername("");
      setPassword("");

      if (result.token) {
        setToken(result.token);
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Sign up successful!</p>}
      {loading && <p>Loading...</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-required="true"
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-required="true"
        />

        <button type="submit" disabled={loading}>Submit</button>
      </form>
    </div>
  );
}

