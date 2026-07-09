import { FaUniversity } from "react-icons/fa";

function Header({ email }) {
  return (
    <header className="header">
      <div className="logo">
        <FaUniversity size={30} />
        <h1>XBank</h1>
      </div>

      <div className="user">
        <span>{email}</span>
      </div>
    </header>
  );
}

export default Header;