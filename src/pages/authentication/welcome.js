// src/pages/welcome.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getAuthToken, getUserId, logout } from '../../../services/authService'; // Import the functions to get the token, user ID, and logout

const Welcome = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    const userId = getUserId();
    if (!token || !userId) {
      router.push('/');
    }
  }, []);

  const handleLogout = () => {
    logout(); // Call the logout function when the logout button is clicked
    router.push('/'); // Redirect the user to the home page after logout
  };

  return (
    <div>
      <h1 className="h1">Welcome to Gym Manager</h1>
      <p>Welcome to the application!</p>
      <p><Link href="/">Back to Home</Link></p>
      <button onClick={handleLogout}>Logout</button> {/* Add a logout button */}
    </div>
  );
};

export default Welcome;
