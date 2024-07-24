import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = ({ setShowNav }) => {
  const handleClick = () => {
    setShowNav((prevShowNav) => !prevShowNav);
  };

  return (
    <div className="bg-gray-800 pl-9 text-white p-4">
      <button
        className="text-2xl font-bold cursor-pointer"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  );
};

export default Header;
