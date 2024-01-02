import classes from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      <div className={classes.text}>
        <h1>MoviMint</h1>
        <p>
          A sleek and intuitive platform for cinema enthusiasts and
          professionals. Manage your movie collection, track viewings, and
          discover new favorites with ease.
        </p>
      </div>
      <div className={classes.version}>
        <p>Version 1.0</p>
      </div>
    </div>
  );
};

export default Sidebar;
