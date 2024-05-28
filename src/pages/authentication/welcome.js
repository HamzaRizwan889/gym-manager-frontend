// src/pages/welcome.js
import Link from 'next/link';

const Welcome = () => {
  return (
    <div>
      <h1 class="h1">Welcome to Gym Manager</h1>
      <p>Welcome to the application!</p>
      <p><Link href="/">Back to Home</Link></p>
    </div>
  );
};

export default Welcome;
