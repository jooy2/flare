import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="App">
      <h1>Unknown Error</h1>
      <Link to="/">Go to Main Page</Link>
    </div>
  );
}
