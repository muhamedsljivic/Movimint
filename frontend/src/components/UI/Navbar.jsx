import React, { useState } from "react";
import classes from "./Navbar.module.css";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    props.onSearchChange(newSearch);
  };
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    navigate("/");
  };

  return (
    <nav className={classes["navbar"]}>
      <div>
        <CiSearch className={classes["search-icon"]} size={14} />
        <input
          id="input"
          name="search"
          type="text"
          placeholder="Search"
          className={classes["search-box"]}
          value={search}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={logoutHandler} type="button">
        Log out
      </button>
    </nav>
  );
};

export default Navbar;
