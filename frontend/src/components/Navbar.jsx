import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <Link to="/" className="text-lg font-semibold">
        Create Program
      </Link>
      <Link to="/saved-programs" className="text-lg font-semibold">
        View Saved Programs
      </Link>
    </nav>
  );
};

export default Navbar;
