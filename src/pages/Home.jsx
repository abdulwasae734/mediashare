import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <section className="hero">
      <h2>Share your media effortlessly</h2>
      <div className="hero-buttons">
        <Link to="/upload" className="hero-button">Upload File</Link>
        <Link to="/view-uploads" className="hero-button">View Uploads</Link>
        <Link to="/manage-downloads" className="hero-button">Manage Downloads</Link>
      </div>
    </section>
  );
}

export default Home;
