import React, { useState } from 'react';

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    setSuccessMessage(null);
    setError(null);

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setSuccessMessage(result.message);
    } catch (error) {
      setError(`Authentication failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Authenticate</h2>
      {loading && <p>Loading...</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleClick} disabled={loading}>
        Authenticate Token!
      </button>
    </div>
  );
}