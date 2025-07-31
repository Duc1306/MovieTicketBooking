import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div class="flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30">
      <Link to="/" >
        <img alt="logo" className="w-36 h-auto" src={assets.logo} />
      </Link>
    </div>
  );
};

export default AdminNavbar;
