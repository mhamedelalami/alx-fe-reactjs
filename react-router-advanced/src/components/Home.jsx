import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/profile/details">Go to Profile Details</Link>
          </li>
          <li>
            <Link to="/profile/settings">Go to Profile Settings</Link>
          </li>
          <li>
            <Link to="/user/42">Go to User Profile (ID 42)</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
